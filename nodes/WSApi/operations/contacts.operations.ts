import { IExecuteFunctions } from "n8n-workflow";
import { IDataObject } from "n8n-workflow";
import { cacheRead, cacheWrite, makeCacheKey } from "../helpers/utils";

export async function executeContactsOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject> {
  const credentials = await this.getCredentials("WSApiApi");
  const baseURL = credentials.baseUrl as string;

  switch (operation) {
    case "getAll":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/contacts",
          baseURL,
          json: true,
        },
      );

    case "get": {
      const contactId = this.getNodeParameter("contactId", i) as string;
      const cacheResults = this.getNodeParameter(
        "cacheResults",
        i,
        false,
      ) as boolean;
      const cacheTtl = this.getNodeParameter("cacheTtl", i, 300) as number;

      if (cacheResults) {
        const instanceId = credentials.instanceId as string;
        const key = makeCacheKey([
          "contacts",
          "get",
          contactId,
          instanceId,
          baseURL,
        ]);
        const cached = cacheRead(this, key);
        if (cached !== undefined) return cached as IDataObject;
      }

      const resGet = await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/contacts/${contactId}`,
          baseURL,
          json: true,
        },
      );

      if (cacheResults) {
        const instanceId = credentials.instanceId as string;
        const key = makeCacheKey([
          "contacts",
          "get",
          contactId,
          instanceId,
          baseURL,
        ]);
        cacheWrite(this, key, resGet, cacheTtl);
      }
      return resGet;
    }

    case "create": {
      const newContactId = this.getNodeParameter("newContactId", i) as string;
      const createFullName = this.getNodeParameter("fullName", i) as string;
      const createFirstName = this.getNodeParameter("firstName", i) as string;

      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "POST",
        url: "/contacts",
        baseURL,
        body: {
          id: newContactId,
          fullName: createFullName,
          firstName: createFirstName,
        },
        json: true,
      });
      return { success: true, message: "Contact created/updated successfully" };
    }

    case "syncContacts":
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "POST",
        url: "/contacts/sync",
        baseURL,
        json: true,
      });
      return { success: true, message: "Contact sync triggered" };

    case "getBlocklist":
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: "/contacts/blocklist",
          baseURL,
          json: true,
        },
      );

    case "blockContact": {
      const contactId = this.getNodeParameter("contactId", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/contacts/${encodeURIComponent(contactId)}/block`,
        baseURL,
        json: true,
      });
      return { success: true, message: "Contact blocked successfully" };
    }

    case "unblockContact": {
      const contactId = this.getNodeParameter("contactId", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/contacts/${encodeURIComponent(contactId)}/unblock`,
        baseURL,
        json: true,
      });
      return { success: true, message: "Contact unblocked successfully" };
    }

    default:
      throw new Error(`Unknown contacts operation: ${operation}`);
  }
}
