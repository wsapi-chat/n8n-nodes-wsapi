import { IExecuteFunctions, IDataObject } from "n8n-workflow";

export async function executeNewsletterOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject> {
  const credentials = await this.getCredentials("wsApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "getAll":
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: "/newsletters",
          baseURL,
          json: true,
        },
      );

    case "get": {
      const newsletterId = this.getNodeParameter("newsletterId", i) as string;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: `/newsletters/${encodeURIComponent(newsletterId)}`,
          baseURL,
          json: true,
        },
      );
    }

    case "create": {
      const name = this.getNodeParameter("newsletterName", i) as string;
      const description = this.getNodeParameter("description", i, "") as string;
      const pictureBase64 = this.getNodeParameter(
        "pictureBase64",
        i,
        "",
      ) as string;
      const body: IDataObject = { name };
      if (description) body.description = description;
      if (pictureBase64) body.pictureBase64 = pictureBase64;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "POST",
          url: "/newsletters",
          baseURL,
          json: true,
          body,
        },
      );
    }

    case "getByInviteCode": {
      const inviteCode = this.getNodeParameter("inviteCode", i) as string;
      return await this.helpers.httpRequestWithAuthentication.call(
        this,
        "wsApiApi",
        {
          method: "GET",
          url: `/newsletters/invite/${encodeURIComponent(inviteCode)}`,
          baseURL,
          json: true,
        },
      );
    }

    case "setSubscription": {
      const newsletterId = this.getNodeParameter("newsletterId", i) as string;
      const subscribed = this.getNodeParameter("subscribed", i) as boolean;
      await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
        method: "PUT",
        url: `/newsletters/${encodeURIComponent(newsletterId)}/subscription`,
        baseURL,
        json: true,
        body: { subscribed },
      });
      return {
        success: true,
        message: subscribed
          ? "Subscribed to newsletter"
          : "Unsubscribed from newsletter",
      };
    }

    case "toggleMute": {
      const newsletterId = this.getNodeParameter("newsletterId", i) as string;
      const mute = this.getNodeParameter("mute", i) as boolean;
      await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
        method: "PUT",
        url: `/newsletters/${encodeURIComponent(newsletterId)}/mute`,
        baseURL,
        json: true,
        body: { mute },
      });
      return {
        success: true,
        message: mute ? "Newsletter muted" : "Newsletter unmuted",
      };
    }

    default:
      throw new Error(`Unknown newsletter operation: ${operation}`);
  }
}
