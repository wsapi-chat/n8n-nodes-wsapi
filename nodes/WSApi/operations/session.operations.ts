import {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
} from "n8n-workflow";

export async function executeSessionOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | INodeExecutionData[]> {
  const credentials = await this.getCredentials("WSApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "getQrImage": {
      const apiKey = credentials.apiKey as string;
      const instanceId = credentials.instanceId as string;
      const headers = {
        "X-Api-Key": apiKey,
        "X-Instance-Id": instanceId,
        "Content-Type": "application/json",
      };

      const response = await this.helpers.httpRequest({
        method: "GET",
        url: "/session/qr",
        baseURL,
        headers,
        encoding: "arraybuffer",
        json: false,
      });

      const fileName = "qr.png";
      const contentType = "image/png";

      const buffer = Buffer.from(response as ArrayBuffer);
      const binaryData = await this.helpers.prepareBinaryData(
        buffer,
        fileName,
        contentType,
      );

      return [
        {
          json: {
            success: true,
            message: "QR code image generated successfully",
          },
          binary: { data: binaryData },
        },
      ];
    }

    case "getQrCode":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/session/qr/text",
          baseURL,
          json: true,
        },
      );

    case "getPairCode": {
      const phone = this.getNodeParameter("phone", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/session/pair-code/${phone}`,
          baseURL,
          json: true,
        },
      );
    }

    case "getStatus":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/session/status",
          baseURL,
          json: true,
        },
      );

    case "logout":
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "POST",
        url: "/session/logout",
        baseURL,
        json: true,
      });
      return { success: true, message: "Logged out successfully" };

    case "flushHistory":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: "/session/flush-history",
          baseURL,
          json: true,
        },
      );

    default:
      throw new Error(`Unknown session operation: ${operation}`);
  }
}
