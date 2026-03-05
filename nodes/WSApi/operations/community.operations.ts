import { IExecuteFunctions } from "n8n-workflow";
import { IDataObject } from "n8n-workflow";

export async function executeCommunityOperation(
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
          url: "/communities",
          baseURL,
          json: true,
        },
      );

    case "get": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/communities/${encodeURIComponent(communityId)}`,
          baseURL,
          json: true,
        },
      );
    }

    case "create": {
      const name = this.getNodeParameter("communityName", i) as string;
      const participantsData = this.getNodeParameter(
        "participants",
        i,
      ) as IDataObject;
      const phoneNumbers = ((participantsData.phoneNumbers as string) || "")
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: "/communities",
          baseURL,
          json: true,
          body: { name, participants: phoneNumbers },
        },
      );
    }

    case "leave": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "POST",
        url: `/communities/${encodeURIComponent(communityId)}/leave`,
        baseURL,
        json: true,
      });
      return { success: true, message: "Left community successfully" };
    }

    case "setName": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const name = this.getNodeParameter("communityName", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/communities/${encodeURIComponent(communityId)}/name`,
        baseURL,
        json: true,
        body: { name },
      });
      return { success: true, message: "Community name updated successfully" };
    }

    case "setDescription": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const description = this.getNodeParameter("description", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/communities/${encodeURIComponent(communityId)}/description`,
        baseURL,
        json: true,
        body: { description },
      });
      return {
        success: true,
        message: "Community description updated successfully",
      };
    }

    case "setPicture": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const pictureBase64 = this.getNodeParameter("pictureBase64", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: `/communities/${encodeURIComponent(communityId)}/picture`,
          baseURL,
          json: true,
          body: { pictureBase64 },
        },
      );
    }

    case "setLocked": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const locked = this.getNodeParameter("locked", i) as boolean;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/communities/${encodeURIComponent(communityId)}/settings/locked`,
        baseURL,
        json: true,
        body: { locked },
      });
      return {
        success: true,
        message: "Community locked mode updated successfully",
      };
    }

    case "getParticipants": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/communities/${encodeURIComponent(communityId)}/participants`,
          baseURL,
          json: true,
        },
      );
    }

    case "updateParticipants": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const participantAction = this.getNodeParameter(
        "participantAction",
        i,
      ) as string;
      const participantsData = this.getNodeParameter(
        "participants",
        i,
      ) as IDataObject;
      const phoneNumbers = ((participantsData.phoneNumbers as string) || "")
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "PUT",
        url: `/communities/${encodeURIComponent(communityId)}/participants`,
        baseURL,
        json: true,
        body: { participants: phoneNumbers, action: participantAction },
      });
      return {
        success: true,
        message: "Community participants updated successfully",
      };
    }

    case "getInviteLink": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/communities/${encodeURIComponent(communityId)}/invite-link`,
          baseURL,
          json: true,
        },
      );
    }

    case "resetInviteLink": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: `/communities/${encodeURIComponent(communityId)}/invite-link/reset`,
          baseURL,
          json: true,
        },
      );
    }

    case "getSubGroups": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "GET",
          url: `/communities/${encodeURIComponent(communityId)}/groups`,
          baseURL,
          json: true,
        },
      );
    }

    case "createSubGroup": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const name = this.getNodeParameter("subGroupName", i) as string;
      return await this.helpers.requestWithAuthentication.call(
        this,
        "WSApiApi",
        {
          method: "POST",
          url: `/communities/${encodeURIComponent(communityId)}/groups`,
          baseURL,
          json: true,
          body: { name },
        },
      );
    }

    case "linkGroup": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const groupId = this.getNodeParameter("groupId", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "POST",
        url: `/communities/${encodeURIComponent(communityId)}/groups/link`,
        baseURL,
        json: true,
        body: { groupId },
      });
      return {
        success: true,
        message: "Group linked to community successfully",
      };
    }

    case "unlinkGroup": {
      const communityId = this.getNodeParameter("communityId", i) as string;
      const groupId = this.getNodeParameter("groupId", i) as string;
      await this.helpers.requestWithAuthentication.call(this, "WSApiApi", {
        method: "DELETE",
        url: `/communities/${encodeURIComponent(communityId)}/groups/${encodeURIComponent(groupId)}`,
        baseURL,
        json: true,
      });
      return {
        success: true,
        message: "Group unlinked from community successfully",
      };
    }

    default:
      throw new Error(`Unknown community operation: ${operation}`);
  }
}
