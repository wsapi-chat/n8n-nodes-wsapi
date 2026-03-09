import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
  NodeOperationError,
} from "n8n-workflow";

import { messageOperations, messageFields } from "./resources/message.resource";
import { chatOperations, chatFields } from "./resources/chat.resource";
import { mediaOperations, mediaFields } from "./resources/media.resource";
import { sessionOperations, sessionFields } from "./resources/session.resource";
import {
  contactsOperations,
  contactsFields,
} from "./resources/contacts.resource";
import { groupsOperations, groupsFields } from "./resources/groups.resource";
import { usersOperations, usersFields } from "./resources/users.resource";
import { callsOperations, callsFields } from "./resources/calls.resource";
import {
  communityOperations,
  communityFields,
} from "./resources/community.resource";
import {
  newsletterOperations,
  newsletterFields,
} from "./resources/newsletter.resource";
import { statusOperations, statusFields } from "./resources/status.resource";
import { executeMessageOperation } from "./operations/message.operations";
import { executeChatOperation } from "./operations/chat.operations";
import { executeMediaOperation } from "./operations/media.operations";
import { executeSessionOperation } from "./operations/session.operations";
import { executeContactsOperation } from "./operations/contacts.operations";
import { executeGroupsOperation } from "./operations/groups.operations";
import { executeUsersOperation } from "./operations/users.operations";
import { executeCallsOperation } from "./operations/calls.operations";
import { executeCommunityOperation } from "./operations/community.operations";
import { executeNewsletterOperation } from "./operations/newsletter.operations";
import { executeStatusOperation } from "./operations/status.operations";

export class WsApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "WSAPI",
    name: "wsApi",
    icon: "file:wsapi.svg",
    group: ["output"],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: "Interact with WSAPI WhatsApp API",
    defaults: {
      name: "WSAPI",
    },
    usableAsTool: true,
    inputs: ["main"] as NodeConnectionType[],
    outputs: ["main"] as NodeConnectionType[],
    credentials: [
      {
        name: "WSApiApi",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "={{$credentials.baseUrl}}",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      // Main resource selector
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Call",
            value: "calls",
          },
          {
            name: "Chat",
            value: "chat",
          },
          {
            name: "Community",
            value: "community",
          },
          {
            name: "Contact",
            value: "contacts",
          },
          {
            name: "Group",
            value: "groups",
          },
          {
            name: "Media",
            value: "media",
          },
          {
            name: "Message",
            value: "message",
          },
          {
            name: "Newsletter",
            value: "newsletter",
          },
          {
            name: "Session",
            value: "session",
          },
          {
            name: "Status",
            value: "status",
          },
          {
            name: "User",
            value: "users",
          },
        ],
        default: "message",
      },
      // Operations for each resource
      callsOperations,
      chatOperations,
      communityOperations,
      contactsOperations,
      groupsOperations,
      mediaOperations,
      messageOperations,
      newsletterOperations,
      sessionOperations,
      statusOperations,
      usersOperations,
      // Fields for all resources
      ...callsFields,
      ...chatFields,
      ...communityFields,
      ...contactsFields,
      ...groupsFields,
      ...mediaFields,
      ...messageFields,
      ...newsletterFields,
      ...sessionFields,
      ...statusFields,
      ...usersFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);

    // Get the baseURL from credentials
    const credentials = await this.getCredentials("WSApiApi");
    const baseURL = credentials.baseUrl as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: any;

        // Route to appropriate resource operation handler
        if (resource === "calls") {
          responseData = await executeCallsOperation.call(this, operation, i);
        } else if (resource === "chat") {
          responseData = await executeChatOperation.call(
            this,
            operation,
            i,
            baseURL,
          );
        } else if (resource === "community") {
          responseData = await executeCommunityOperation.call(
            this,
            operation,
            i,
          );
        } else if (resource === "contacts") {
          responseData = await executeContactsOperation.call(
            this,
            operation,
            i,
          );
        } else if (resource === "groups") {
          responseData = await executeGroupsOperation.call(this, operation, i);
        } else if (resource === "media") {
          responseData = await executeMediaOperation.call(
            this,
            operation,
            i,
            baseURL,
          );
        } else if (resource === "message") {
          responseData = await executeMessageOperation.call(
            this,
            operation,
            i,
            baseURL,
          );
        } else if (resource === "newsletter") {
          responseData = await executeNewsletterOperation.call(
            this,
            operation,
            i,
          );
        } else if (resource === "session") {
          responseData = await executeSessionOperation.call(this, operation, i);
        } else if (resource === "status") {
          responseData = await executeStatusOperation.call(this, operation, i);
        } else if (resource === "users") {
          responseData = await executeUsersOperation.call(this, operation, i);
        } else {
          throw new NodeOperationError(
            this.getNode(),
            `The resource "${resource}" is not known!`,
          );
        }

        if (!responseData) {
          throw new NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not implemented yet!`,
          );
        }

        // Handle different response types
        let executionData;
        if (
          Array.isArray(responseData) &&
          responseData.length > 0 &&
          responseData[0].binary
        ) {
          // Binary operations return INodeExecutionData[] directly
          executionData = this.helpers.constructExecutionMetaData(
            responseData,
            { itemData: { item: i } },
          );
        } else {
          // Regular JSON responses
          executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } },
          );
        }

        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
