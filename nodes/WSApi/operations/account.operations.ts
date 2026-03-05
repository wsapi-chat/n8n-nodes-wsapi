import { IExecuteFunctions } from "n8n-workflow";
import { IDataObject } from "n8n-workflow";

export async function executeAccountOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject> {
  const credentials = await this.getCredentials("WSApiApi");
  const baseURL = credentials.baseUrl as string;
  const customerApiKey = credentials.customerApiKey as string;

  if (!customerApiKey) {
    throw new Error(
      "Customer API Key is required for Account operations. Please configure it in the WSAPI credentials.",
    );
  }

  const headers = {
    "X-Api-Key": customerApiKey,
    "Content-Type": "application/json",
  };

  switch (operation) {
    case "listInstances":
      return await this.helpers.httpRequest({
        method: "GET",
        url: "/account/instances",
        baseURL,
        headers,
        json: true,
      });

    case "getInstance": {
      const id = this.getNodeParameter("accountInstanceId", i) as string;
      return await this.helpers.httpRequest({
        method: "GET",
        url: `/account/instances/${encodeURIComponent(id)}`,
        baseURL,
        headers,
        json: true,
      });
    }

    case "updateInstanceName": {
      const id = this.getNodeParameter("accountInstanceId", i) as string;
      const name = this.getNodeParameter("name", i) as string;
      await this.helpers.httpRequest({
        method: "PUT",
        url: `/account/instances/${encodeURIComponent(id)}/name`,
        baseURL,
        headers,
        body: { name },
        json: true,
      });
      return { success: true, message: "Instance name updated successfully" };
    }

    case "updateInstanceSettings": {
      const id = this.getNodeParameter("accountInstanceId", i) as string;
      const settings = this.getNodeParameter("settings", i) as IDataObject;
      if (settings.eventFilters !== undefined) {
        const filters = settings.eventFilters as string[];
        settings.eventFilters = filters.length > 0 ? filters : null;
      }
      await this.helpers.httpRequest({
        method: "PUT",
        url: `/account/instances/${encodeURIComponent(id)}/settings`,
        baseURL,
        headers,
        body: settings,
        json: true,
      });
      return {
        success: true,
        message: "Instance settings updated successfully",
      };
    }

    case "regenerateApiKey": {
      const id = this.getNodeParameter("accountInstanceId", i) as string;
      return await this.helpers.httpRequest({
        method: "PUT",
        url: `/account/instances/${encodeURIComponent(id)}/apikey`,
        baseURL,
        headers,
        json: true,
      });
    }

    case "restartInstance": {
      const id = this.getNodeParameter("accountInstanceId", i) as string;
      await this.helpers.httpRequest({
        method: "PUT",
        url: `/account/instances/${encodeURIComponent(id)}/restart`,
        baseURL,
        headers,
        json: true,
      });
      return { success: true, message: "Instance restarted successfully" };
    }

    case "listSubscriptions":
      return await this.helpers.httpRequest({
        method: "GET",
        url: "/account/subscriptions",
        baseURL,
        headers,
        json: true,
      });

    case "listSubscriptionInstances": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i,
      ) as string;
      return await this.helpers.httpRequest({
        method: "GET",
        url: `/account/subscriptions/${encodeURIComponent(subscriptionId)}/instances`,
        baseURL,
        headers,
        json: true,
      });
    }

    case "createInstance": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i,
      ) as string;
      return await this.helpers.httpRequest({
        method: "POST",
        url: `/account/subscriptions/${encodeURIComponent(subscriptionId)}/instances`,
        baseURL,
        headers,
        json: true,
      });
    }

    case "deleteInstance": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i,
      ) as string;
      const instanceId = this.getNodeParameter("deleteInstanceId", i) as string;
      await this.helpers.httpRequest({
        method: "DELETE",
        url: `/account/subscriptions/${encodeURIComponent(subscriptionId)}/instances/${encodeURIComponent(instanceId)}`,
        baseURL,
        headers,
        json: true,
      });
      return { success: true, message: "Instance deleted successfully" };
    }

    case "getSubscriptionChanges": {
      const subscriptionId = this.getNodeParameter(
        "subscriptionId",
        i,
      ) as string;
      return await this.helpers.httpRequest({
        method: "GET",
        url: `/account/subscriptions/${encodeURIComponent(subscriptionId)}/changes`,
        baseURL,
        headers,
        json: true,
      });
    }

    case "getInstanceDefaults":
      return await this.helpers.httpRequest({
        method: "GET",
        url: "/account/instances/defaults",
        baseURL,
        headers,
        json: true,
      });

    case "updateInstanceDefaults": {
      const defaults = this.getNodeParameter("defaults", i) as IDataObject;
      if (defaults.eventFilters !== undefined) {
        const filters = defaults.eventFilters as string[];
        defaults.eventFilters = filters.length > 0 ? filters : null;
      }
      await this.helpers.httpRequest({
        method: "PUT",
        url: "/account/instances/defaults",
        baseURL,
        headers,
        body: defaults,
        json: true,
      });
      return {
        success: true,
        message: "Instance defaults updated successfully",
      };
    }

    default:
      throw new Error(`Unknown account operation: ${operation}`);
  }
}
