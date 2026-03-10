import { IExecuteFunctions, IDataObject } from "n8n-workflow";

export async function executeStatusOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject> {
  const credentials = await this.getCredentials("wsApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "getPrivacy":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/status/privacy",
          baseURL,
          json: true,
        },
      );

    case "postText": {
      const text = this.getNodeParameter("text", i) as string;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/status/text",
          baseURL,
          json: true,
          body: { text },
        },
      );
    }

    case "postImage": {
      const inputType = this.getNodeParameter(
        "mediaInputType",
        i,
        "url",
      ) as string;
      const mimeType =
        (this.getNodeParameter("mimeType", i, "") as string) || "image/jpeg";
      const caption = this.getNodeParameter("caption", i, "") as string;
      const body: IDataObject = { mimeType };
      if (inputType === "base64") {
        body.data = this.getNodeParameter("mediaBase64", i) as string;
      } else {
        body.url = this.getNodeParameter("mediaUrl", i) as string;
      }
      if (caption) body.caption = caption;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/status/image",
          baseURL,
          json: true,
          body,
        },
      );
    }

    case "postVideo": {
      const inputType = this.getNodeParameter(
        "mediaInputType",
        i,
        "url",
      ) as string;
      const mimeType =
        (this.getNodeParameter("mimeType", i, "") as string) || "video/mp4";
      const caption = this.getNodeParameter("caption", i, "") as string;
      const body: IDataObject = { mimeType };
      if (inputType === "base64") {
        body.data = this.getNodeParameter("mediaBase64", i) as string;
      } else {
        body.url = this.getNodeParameter("mediaUrl", i) as string;
      }
      if (caption) body.caption = caption;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/status/video",
          baseURL,
          json: true,
          body,
        },
      );
    }

    case "deleteStatus": {
      const messageId = this.getNodeParameter("messageId", i) as string;
      await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
        method: "POST",
        url: `/status/${encodeURIComponent(messageId)}/delete`,
        baseURL,
        json: true,
      });
      return { success: true, message: "Status deleted successfully" };
    }

    default:
      throw new Error(`Unknown status operation: ${operation}`);
  }
}
