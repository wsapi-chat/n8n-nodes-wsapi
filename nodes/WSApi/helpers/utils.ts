import { IDataObject, IExecuteFunctions, INodeProperties } from "n8n-workflow";

export function createAdvancedOptions(): INodeProperties {
  return {
    displayName: "Advanced Options",
    name: "advancedOptions",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Ephemeral Expiration",
        name: "ephemeralExpiration",
        type: "options",
        default: "",
        description:
          "Custom expiration time for this message, overriding the chat's ephemeral settings",
        options: [
          { name: "Use Chat Default", value: "" },
          { name: "24 Hours", value: "24h" },
          { name: "7 Days", value: "7d" },
          { name: "90 Days", value: "90d" },
        ],
      },
      {
        displayName: "Is Forwarded",
        name: "isForwarded",
        type: "boolean",
        default: false,
        description: "Whether this message is forwarded",
      },
      {
        displayName: "Mentions",
        name: "mentions",
        type: "string",
        default: "",
        description:
          "Comma-separated list of phone numbers to mention (without @)",
      },
      {
        displayName: "Reply To Message ID",
        name: "replyTo",
        type: "string",
        default: "",
        description: "ID of the message to reply to",
      },
      {
        displayName: "Reply To Sender ID",
        name: "replyToSenderId",
        type: "string",
        default: "",
        description:
          "The ID of the sender of the message being replied to. Should be set when replyTo is specified.",
        placeholder: "1234567890@s.whatsapp.net",
      },
      {
        displayName: "View Once",
        name: "viewOnce",
        type: "boolean",
        default: false,
        description:
          "Whether the message should disappear after being viewed (media only)",
        displayOptions: {
          show: {
            "/resource": ["message"],
            "/operation": ["sendImage", "sendVideo", "sendAudio", "sendVoice"],
          },
        },
      },
    ],
  };
}

export function parseAdvancedOptions(advancedOptions: IDataObject, body: IDataObject): void {
  if (advancedOptions.mentions) {
    body.mentions = (advancedOptions.mentions as string)
      .split(",")
      .map((m: string) => m.trim());
  }
  if (advancedOptions.replyTo) body.replyTo = advancedOptions.replyTo;
  if (advancedOptions.replyToSenderId)
    body.replyToSenderId = advancedOptions.replyToSenderId;
  if (advancedOptions.isForwarded)
    body.isForwarded = advancedOptions.isForwarded;
  if (advancedOptions.viewOnce) body.viewOnce = advancedOptions.viewOnce;
  if (advancedOptions.ephemeralExpiration)
    body.ephemeralExpiration = advancedOptions.ephemeralExpiration;
}

// Simple per-node static-data cache helpers
type CacheEntry = { value: unknown; expiresAt: number };

export function cacheRead(
  ctx: IExecuteFunctions,
  key: string,
): unknown | undefined {
  const sd = ctx.getWorkflowStaticData("node") as IDataObject;
  sd.wsapiCache = (sd.wsapiCache as IDataObject) || {};
  const entry = (sd.wsapiCache as IDataObject)[key] as CacheEntry | undefined;
  if (!entry) return undefined;
  if (typeof entry.expiresAt !== "number" || entry.expiresAt <= Date.now())
    return undefined;
  return entry.value;
}

export function cacheWrite(
  ctx: IExecuteFunctions,
  key: string,
  value: unknown,
  ttlSeconds: number,
): void {
  const sd = ctx.getWorkflowStaticData("node") as IDataObject;
  sd.wsapiCache = (sd.wsapiCache as IDataObject) || {};
  const ttlMs = Math.max(1, Math.floor(ttlSeconds)) * 1000;
  (sd.wsapiCache as IDataObject)[key] = { value, expiresAt: Date.now() + ttlMs } as unknown as IDataObject;
}

export function makeCacheKey(
  parts: Array<string | number | boolean | undefined | null>,
): string {
  return parts.map((v) => encodeURIComponent(String(v ?? ""))).join("|");
}
