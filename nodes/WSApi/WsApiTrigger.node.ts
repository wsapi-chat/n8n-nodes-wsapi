import { createHmac, timingSafeEqual } from "crypto";
import {
  IBinaryKeyData,
  IHookFunctions,
  IWebhookFunctions,
  IDataObject,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  NodeConnectionType,
} from "n8n-workflow";

export class WsApiTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "WSAPI Trigger",
    name: "wsApiTrigger",
    icon: "file:wsapi.svg",
    group: ["trigger"],
    version: 1,
    subtitle: '={{$parameter["events"].length + " event type(s)"}}',
    description:
      "Trigger on WSAPI webhook events (messages, chats, calls, users, etc.)",
    defaults: {
      name: "WSAPI Trigger",
    },
    usableAsTool: true,
    inputs: [],
    outputs: ["main"] as NodeConnectionType[],
    credentials: [
      {
        name: "wsApiApi",
        required: false,
      },
    ],
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "webhook",
      },
    ],
    properties: [
      {
        displayName: "Event Types",
        name: "events",
        type: "multiOptions",
        options: [
          {
            name: "Call Accept",
            value: "call_accept",
            description: "Call was accepted",
          },
          {
            name: "Call Offer",
            value: "call_offer",
            description: "Incoming call offer received",
          },
          {
            name: "Call Terminate",
            value: "call_terminate",
            description: "Call was terminated",
          },
          {
            name: "Chat Picture",
            value: "chat_picture",
            description: "Chat profile picture updated",
          },
          {
            name: "Chat Presence",
            value: "chat_presence",
            description: "Chat presence updated (typing, recording, paused)",
          },
          {
            name: "Chat Push Name",
            value: "chat_push_name",
            description: "Chat display name updated",
          },
          {
            name: "Chat Setting",
            value: "chat_setting",
            description:
              "Chat settings changed (mute, pin, archive, ephemeral)",
          },
          {
            name: "Chat Status",
            value: "chat_status",
            description: "Chat status message updated",
          },
          {
            name: "Contact",
            value: "contact",
            description: "Contact information updated",
          },
          {
            name: "Group",
            value: "group",
            description: "Group information updated",
          },
          {
            name: "Initial Sync Finished",
            value: "initial_sync_finished",
            description: "Initial sync finished after login",
          },
          {
            name: "Logged In",
            value: "logged_in",
            description: "User successfully logged in",
          },
          {
            name: "Logged Out",
            value: "logged_out",
            description: "User logged out",
          },
          {
            name: "Login Error",
            value: "login_error",
            description: "Error during login process",
          },
          {
            name: "Message",
            value: "message",
            description:
              "New message received (text, media, reaction, contact, etc.)",
          },
          {
            name: "Message Deleted",
            value: "message_delete",
            description: "Message was deleted",
          },
          {
            name: "Message History Sync",
            value: "message_history_sync",
            description: "Initial message history sync during pairing",
          },
          {
            name: "Message Read",
            value: "message_read",
            description: "Message read receipt received",
          },
          {
            name: "Message Starred",
            value: "message_star",
            description: "Message was starred/unstarred",
          },
          {
            name: "Newsletter",
            value: "newsletter",
            description: "Newsletter event",
          },
          {
            name: "User Presence",
            value: "user_presence",
            description: "User online presence updated (available/unavailable)",
          },
        ],
        default: ["message"],
        description: "Select which event types to listen for",
      },
      {
        displayName: "Auto-Download Media",
        name: "autoDownloadMedia",
        type: "boolean",
        default: false,
        description:
          "Whether to automatically download media files when message events contain media",
      },
      {
        displayName: "Parse Event Data",
        name: "parseEventData",
        type: "boolean",
        default: true,
        description:
          "Whether to parse event data based on the event type for easier access to fields",
      },
      {
        displayName: "Include Raw Event",
        name: "includeRawEvent",
        type: "boolean",
        default: false,
        description:
          "Whether to include the original webhook payload in the output",
      },
      {
        displayName: "Verify Webhook Signature",
        name: "verifySignature",
        type: "boolean",
        default: true,
        description:
          "Whether to verify the HMAC-SHA256 signature of incoming webhooks using the signing secret from credentials",
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData() as IDataObject;
    const events = this.getNodeParameter("events") as string[];
    const autoDownloadMedia = this.getNodeParameter(
      "autoDownloadMedia",
    ) as boolean;
    const parseEventData = this.getNodeParameter("parseEventData") as boolean;
    const includeRawEvent = this.getNodeParameter("includeRawEvent") as boolean;
    const verifySignature = this.getNodeParameter("verifySignature") as boolean;

    // Verify HMAC-SHA256 webhook signature if enabled
    if (verifySignature) {
      const credentials = await this.getCredentials("wsApiApi");
      const signingSecret = credentials.signingSecret as string;

      if (!signingSecret) {
        return {
          webhookResponse: {
            status: 500,
            body: {
              error: "Configuration Error",
              message:
                "Signature verification is enabled but no signing secret is configured in credentials",
            },
          },
        };
      }

      const headers = this.getHeaderData();
      const signatureHeader = (headers["x-webhook-signature"] || "") as string;

      if (!signatureHeader) {
        return {
          webhookResponse: {
            status: 401,
            body: {
              error: "Unauthorized",
              message: "Missing X-Webhook-Signature header",
            },
          },
        };
      }

      const req = this.getRequestObject();
      const rawBody = (req as unknown as { rawBody?: Buffer }).rawBody;
      const bodyBytes = rawBody || Buffer.from(JSON.stringify(body), "utf-8");

      const expected =
        "sha256=" +
        createHmac("sha256", signingSecret).update(bodyBytes).digest("hex");

      const expectedBuf = Buffer.from(expected, "utf-8");
      const receivedBuf = Buffer.from(signatureHeader, "utf-8");

      if (
        expectedBuf.length !== receivedBuf.length ||
        !timingSafeEqual(expectedBuf, receivedBuf)
      ) {
        return {
          webhookResponse: {
            status: 401,
            body: {
              error: "Unauthorized",
              message: "Invalid webhook signature",
            },
          },
        };
      }
    }

    // Validate webhook structure
    if (!body.eventType || !body.eventData) {
      return {
        webhookResponse: {
          status: 400,
          body: {
            error: "Bad Request",
            message:
              "Invalid webhook payload. Expected format: { eventType: string, eventData: object }",
            received: body,
          },
        },
      };
    }

    const eventType = body.eventType as string;

    // Filter by selected event types
    if (!events.includes(eventType)) {
      return {
        webhookResponse: {
          status: 200,
          body: {
            message: "Event type not subscribed",
            eventType,
            subscribedEvents: events,
          },
        },
      };
    }

    // Build output data
    let outputData: IDataObject = {
      eventId: body.eventId,
      instanceId: body.instanceId,
      receivedAt: body.receivedAt,
      eventType: body.eventType,
    };

    if (parseEventData) {
      // Parse eventData based on event type
      const eventData = body.eventData as IDataObject;
      outputData = { ...outputData, ...eventData };
    } else {
      outputData.eventData = body.eventData;
    }

    if (includeRawEvent) {
      outputData.rawEvent = body;
    }

    // Handle media auto-download - prepare binary data if enabled
    let binaryData: IBinaryKeyData | undefined = undefined;
    if (autoDownloadMedia && eventType === "message") {
      const eventData = body.eventData as IDataObject;

      if (eventData.type === "media" && eventData.media) {
        const media = eventData.media as IDataObject;
        const mediaId = media.id as string;

        if (mediaId) {
          try {
            // Get credentials for media download
            const credentials = await this.getCredentials("wsApiApi");
            const baseURL = credentials.baseUrl as string;

            // Download the media file with full response to get headers
            const response = (await this.helpers.httpRequestWithAuthentication.call(this, "wsApiApi", {
              method: "GET",
              url: "/media/download",
              baseURL: baseURL,
              qs: { id: mediaId },
              encoding: "arraybuffer",
              json: false,
              returnFullResponse: true,
            })) as { body: ArrayBuffer; headers: Record<string, string> };

            // Extract filename and content type from headers
            const headers = response.headers || {};
            const contentType =
              headers["content-type"] || "application/octet-stream";

            let fileName = `media_${mediaId}`;
            const contentDisposition = headers["content-disposition"];
            if (contentDisposition) {
              const filenameMatch =
                contentDisposition.match(/filename="([^"]+)"/);
              if (filenameMatch && filenameMatch[1]) {
                fileName = filenameMatch[1];
              }
            }

            // Convert to buffer and prepare binary data
            const buffer = Buffer.from(response.body);
            const preparedBinaryData = await this.helpers.prepareBinaryData(
              buffer,
              fileName,
              contentType,
            );

            // Set binary data for output
            binaryData = { data: preparedBinaryData };

            // Add download metadata to the media object (not the binary data)
            if (parseEventData) {
              const outputMedia = outputData.media as IDataObject;
              if (outputMedia) {
                outputMedia.downloadedAt = new Date().toISOString();
                outputMedia.autoDownloaded = true;
              }
            } else {
              const eventDataMedia = (outputData.eventData as IDataObject)
                .media as IDataObject;
              if (eventDataMedia) {
                eventDataMedia.downloadedAt = new Date().toISOString();
                eventDataMedia.autoDownloaded = true;
              }
            }
          } catch (error) {
            // If download fails, add error info to the media object
            if (parseEventData) {
              const outputMedia = outputData.media as IDataObject;
              if (outputMedia) {
                outputMedia.downloadError = `Failed to download media: ${(error as Error).message}`;
              }
            } else {
              const eventDataMedia = (outputData.eventData as IDataObject)
                .media as IDataObject;
              if (eventDataMedia) {
                eventDataMedia.downloadError = `Failed to download media: ${(error as Error).message}`;
              }
            }
          }
        }
      }
    }

    return {
      workflowData: [
        [
          {
            json: outputData,
            ...(binaryData && { binary: binaryData }),
          },
        ],
      ],
    };
  }

  // Required methods for webhook lifecycle management
  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        // Since WSAPI webhooks are managed externally, we assume they exist
        return true;
      },
      async create(this: IHookFunctions): Promise<boolean> {
        // WSAPI webhooks are configured in the WSAPI dashboard
        // No programmatic creation needed
        return true;
      },
      async delete(this: IHookFunctions): Promise<boolean> {
        // WSAPI webhooks are managed externally
        // No programmatic deletion needed
        return true;
      },
    },
  };
}
