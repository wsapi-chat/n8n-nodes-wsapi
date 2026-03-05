import { IExecuteFunctions } from "n8n-workflow";
import { IDataObject } from "n8n-workflow";
import { cacheRead, cacheWrite, makeCacheKey } from "../helpers/utils";

export async function executeUsersOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject> {
  const credentials = await this.getCredentials("WSApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "get": {
      const phone = this.getNodeParameter("phone", i) as string;
      const cacheResults = this.getNodeParameter(
        "cacheResults",
        i,
        false,
      ) as boolean;
      const cacheTtl = this.getNodeParameter("cacheTtl", i, 300) as number;

      if (cacheResults) {
        const instanceId = credentials.instanceId as string;
        const key = makeCacheKey(["users", "get", phone, instanceId, baseURL]);
        const cached = cacheRead(this, key);
        if (cached !== undefined) return cached as IDataObject;
      }

      const resGet = await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/users/${phone}/profile`,
          baseURL,
          json: true,
        },
      );

      if (cacheResults) {
        const instanceId = credentials.instanceId as string;
        const key = makeCacheKey(["users", "get", phone, instanceId, baseURL]);
        cacheWrite(this, key, resGet, cacheTtl);
      }
      return resGet;
    }

    case "getMyProfile":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/users/me/profile",
          baseURL,
          json: true,
        },
      );

    case "updateMyProfile": {
      const profileFields = this.getNodeParameter(
        "profileFields",
        i,
      ) as IDataObject;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: "/users/me/profile",
        baseURL,
        json: true,
        body: profileFields,
      });
      return { success: true, message: "Profile updated successfully" };
    }

    case "setPresence": {
      const status = this.getNodeParameter("presenceStatus", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: "/users/me/presence",
        baseURL,
        json: true,
        body: { status },
      });
      return { success: true, message: "Presence updated successfully" };
    }

    case "getPrivacySettings":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/users/me/privacy",
          baseURL,
          json: true,
        },
      );

    case "setPrivacySetting": {
      const setting = this.getNodeParameter("privacySetting", i) as string;
      const value = this.getNodeParameter("privacyValue", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "PUT",
          url: "/users/me/privacy",
          baseURL,
          json: true,
          body: { setting, value },
        },
      );
    }

    case "checkUser": {
      const phone = this.getNodeParameter("phone", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/users/${phone}/check`,
          baseURL,
          json: true,
        },
      );
    }

    case "bulkCheckUsers": {
      const phonesStr = this.getNodeParameter("phones", i) as string;
      const phones = phonesStr
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: "/users/check",
          baseURL,
          json: true,
          body: { phones },
        },
      );
    }

    default:
      throw new Error(`Unknown users operation: ${operation}`);
  }
}
