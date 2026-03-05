import { INodeProperties } from "n8n-workflow";

export const statusOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["status"],
    },
  },
  options: [
    {
      name: "Delete Status",
      value: "deleteStatus",
      description: "Delete a posted status update",
      action: "Delete status update",
    },
    {
      name: "Get Privacy",
      value: "getPrivacy",
      description: "Get status privacy settings",
      action: "Get status privacy",
    },
    {
      name: "Post Image",
      value: "postImage",
      description: "Post an image status update",
      action: "Post image status",
    },
    {
      name: "Post Text",
      value: "postText",
      description: "Post a text status update",
      action: "Post text status",
    },
    {
      name: "Post Video",
      value: "postVideo",
      description: "Post a video status update",
      action: "Post video status",
    },
  ],
  default: "getPrivacy",
};

export const statusFields: INodeProperties[] = [
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: "",
    description: "Text content for the status update",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postText"],
      },
    },
  },
  {
    displayName: "Input Type",
    name: "mediaInputType",
    type: "options",
    options: [
      { name: "URL", value: "url" },
      { name: "Base64", value: "base64" },
    ],
    default: "url",
    description:
      "Choose whether to provide media as a URL or Base64 encoded string",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postImage", "postVideo"],
      },
    },
  },
  {
    displayName: "Media URL",
    name: "mediaUrl",
    type: "string",
    default: "",
    description: "URL of the media file",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postImage", "postVideo"],
        mediaInputType: ["url"],
      },
    },
  },
  {
    displayName: "Media Base64",
    name: "mediaBase64",
    type: "string",
    default: "",
    description: "Base64 encoded media content",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postImage", "postVideo"],
        mediaInputType: ["base64"],
      },
    },
  },
  {
    displayName: "MIME Type",
    name: "mimeType",
    type: "string",
    default: "",
    description: "MIME type of the media file (e.g., image/jpeg, video/mp4)",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postImage", "postVideo"],
      },
    },
  },
  {
    displayName: "Caption",
    name: "caption",
    type: "string",
    default: "",
    description: "Optional caption for the media status",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["postImage", "postVideo"],
      },
    },
  },
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the status message to delete",
    displayOptions: {
      show: {
        resource: ["status"],
        operation: ["deleteStatus"],
      },
    },
  },
];
