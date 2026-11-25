import {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  NodeOperationError,
  jsonParse,
} from "n8n-workflow";

export async function executeSessionOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | INodeExecutionData[]> {
  const credentials = await this.getCredentials("wsApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "getQrImage": {
      const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/session/qr",
          baseURL,
          encoding: "arraybuffer",
          json: false,
        },
      );

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
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/session/qr/text",
          baseURL,
          json: true,
        },
      );

    case "getPairCode": {
      const phone = this.getNodeParameter("phone", i) as string;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: `/session/pair-code/${phone}`,
          baseURL,
          json: true,
        },
      );
    }

    case "getStatus":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/session/status",
          baseURL,
          json: true,
        },
      );

    case "logout":
      await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
        method: "POST",
        url: "/session/logout",
        baseURL,
        json: true,
      });
      return { success: true, message: "Logged out successfully" };

    case "flushHistory":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/session/flush-history",
          baseURL,
          json: true,
        },
      );

    case "getPasskeyState":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/session/passkey",
          baseURL,
          json: true,
        },
      );

    case "requestPasskey":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/session/passkey/request",
          baseURL,
          json: true,
        },
      );

    case "submitPasskey": {
      const raw = this.getNodeParameter("passkeyAssertion", i) as
        | string
        | IDataObject;
      let assertion: IDataObject;
      try {
        assertion = typeof raw === "string" ? jsonParse<IDataObject>(raw) : raw;
      } catch {
        throw new NodeOperationError(
          this.getNode(),
          "Passkey Assertion must be valid JSON",
          { itemIndex: i },
        );
      }
      if (
        !assertion ||
        typeof assertion !== "object" ||
        Array.isArray(assertion) ||
        !assertion.rawId ||
        !assertion.response
      ) {
        throw new NodeOperationError(
          this.getNode(),
          'Passkey Assertion must be the PublicKeyCredential.toJSON() object, including "rawId" and "response"',
          { itemIndex: i },
        );
      }
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/session/passkey",
          baseURL,
          json: true,
          body: assertion,
        },
      );
    }

    case "confirmPasskey":
      await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
        method: "POST",
        url: "/session/passkey/confirm",
        baseURL,
        json: true,
      });
      return { success: true, message: "Passkey confirmation sent" };

    default:
      throw new Error(`Unknown session operation: ${operation}`);
  }
}
