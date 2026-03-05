import { INodeProperties } from "n8n-workflow";

export const newsletterOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["newsletter"],
    },
  },
  options: [
    {
      name: "Create Newsletter",
      value: "create",
      description: "Create a new newsletter/channel",
      action: "Create newsletter",
    },
    {
      name: "Get by Invite Code",
      value: "getByInviteCode",
      description: "Get newsletter info by invite code",
      action: "Get newsletter by invite code",
    },
    {
      name: "Get Many",
      value: "getAll",
      description: "List subscribed newsletters",
      action: "List all newsletters",
    },
    {
      name: "Get Newsletter",
      value: "get",
      description: "Get newsletter information",
      action: "Get newsletter information",
    },
    {
      name: "Set Subscription",
      value: "setSubscription",
      description: "Subscribe or unsubscribe from a newsletter",
      action: "Set newsletter subscription",
    },
    {
      name: "Toggle Mute",
      value: "toggleMute",
      description: "Mute or unmute a newsletter",
      action: "Toggle newsletter mute",
    },
  ],
  default: "getAll",
};

export const newsletterFields: INodeProperties[] = [
  {
    displayName: "Newsletter ID",
    name: "newsletterId",
    type: "string",
    required: true,
    default: "",
    description: "WhatsApp newsletter/channel identifier",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["get", "setSubscription", "toggleMute"],
      },
    },
  },
  {
    displayName: "Newsletter Name",
    name: "newsletterName",
    type: "string",
    required: true,
    default: "",
    description: "Name for the newsletter",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    default: "",
    description: "Optional description for the newsletter",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Picture Base64",
    name: "pictureBase64",
    type: "string",
    default: "",
    description: "Optional base64 encoded image for the newsletter picture",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Invite Code",
    name: "inviteCode",
    type: "string",
    required: true,
    default: "",
    description: "Newsletter invite code",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["getByInviteCode"],
      },
    },
  },
  {
    displayName: "Subscribed",
    name: "subscribed",
    type: "boolean",
    required: true,
    default: true,
    description: "Whether to subscribe (true) or unsubscribe (false)",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["setSubscription"],
      },
    },
  },
  {
    displayName: "Mute",
    name: "mute",
    type: "boolean",
    required: true,
    default: true,
    description: "Whether to mute (true) or unmute (false) the newsletter",
    displayOptions: {
      show: {
        resource: ["newsletter"],
        operation: ["toggleMute"],
      },
    },
  },
];
