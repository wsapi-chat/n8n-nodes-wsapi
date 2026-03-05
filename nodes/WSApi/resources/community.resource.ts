import { INodeProperties } from "n8n-workflow";

export const communityOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["community"],
    },
  },
  options: [
    {
      name: "Create Community",
      value: "create",
      description: "Create a new WhatsApp community",
      action: "Create new community",
    },
    {
      name: "Create Sub-Group",
      value: "createSubGroup",
      description: "Create a new sub-group inside a community",
      action: "Create sub group",
    },
    {
      name: "Get Community",
      value: "get",
      description: "Get community information",
      action: "Get community information",
    },
    {
      name: "Get Invite Link",
      value: "getInviteLink",
      description: "Get community invite link",
      action: "Get community invite link",
    },
    {
      name: "Get Many",
      value: "getAll",
      description: "List many joined communities",
      action: "List all communities",
    },
    {
      name: "Get Participants",
      value: "getParticipants",
      description: "Get community participants",
      action: "Get community participants",
    },
    {
      name: "Get Sub-Groups",
      value: "getSubGroups",
      description: "Get community sub-groups",
      action: "Get community sub groups",
    },
    {
      name: "Leave Community",
      value: "leave",
      description: "Leave a WhatsApp community",
      action: "Leave community",
    },
    {
      name: "Link Group",
      value: "linkGroup",
      description: "Link an existing group to a community",
      action: "Link group to community",
    },
    {
      name: "Reset Invite Link",
      value: "resetInviteLink",
      description: "Reset community invite link",
      action: "Reset community invite link",
    },
    {
      name: "Set Description",
      value: "setDescription",
      description: "Update community description",
      action: "Set community description",
    },
    {
      name: "Set Locked Mode",
      value: "setLocked",
      description: "Set whether only admins can edit community info",
      action: "Set locked mode",
    },
    {
      name: "Set Name",
      value: "setName",
      description: "Update community name",
      action: "Set community name",
    },
    {
      name: "Set Picture",
      value: "setPicture",
      description: "Set community picture",
      action: "Set community picture",
    },
    {
      name: "Unlink Group",
      value: "unlinkGroup",
      description: "Unlink a group from a community",
      action: "Unlink group from community",
    },
    {
      name: "Update Participants",
      value: "updateParticipants",
      description: "Add, remove, promote or demote community participants",
      action: "Update community participants",
    },
  ],
  default: "getAll",
};

export const communityFields: INodeProperties[] = [
  {
    displayName: "Community ID",
    name: "communityId",
    type: "string",
    required: true,
    default: "",
    description: "WhatsApp community identifier",
    placeholder: "120363123456789@g.us",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: [
          "get",
          "leave",
          "setName",
          "setDescription",
          "setPicture",
          "setLocked",
          "getParticipants",
          "updateParticipants",
          "getInviteLink",
          "resetInviteLink",
          "getSubGroups",
          "createSubGroup",
          "linkGroup",
          "unlinkGroup",
        ],
      },
    },
  },
  {
    displayName: "Community Name",
    name: "communityName",
    type: "string",
    required: true,
    default: "",
    description: "Name for the community",
    placeholder: "My Community",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["create", "setName"],
      },
    },
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    required: true,
    default: "",
    description: "Description text for the community",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["setDescription"],
      },
    },
  },
  {
    displayName: "Picture Base64",
    name: "pictureBase64",
    type: "string",
    required: true,
    default: "",
    description: "Base64 encoded image data for the community picture",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["setPicture"],
      },
    },
  },
  {
    displayName: "Locked",
    name: "locked",
    type: "boolean",
    required: true,
    default: false,
    description: "Whether only admins can edit community info",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["setLocked"],
      },
    },
  },
  {
    displayName: "Participants",
    name: "participants",
    type: "collection",
    placeholder: "Add Participant",
    default: {},
    options: [
      {
        displayName: "Participant Phone Numbers",
        name: "phoneNumbers",
        type: "string",
        default: "",
        description:
          "Phone numbers of participants (comma-separated, with country codes)",
        placeholder: "1234567890,0987654321",
      },
    ],
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["create", "updateParticipants"],
      },
    },
  },
  {
    displayName: "Action",
    name: "participantAction",
    type: "options",
    required: true,
    default: "add",
    options: [
      { name: "Add", value: "add" },
      { name: "Remove", value: "remove" },
      { name: "Promote", value: "promote" },
      { name: "Demote", value: "demote" },
    ],
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["updateParticipants"],
      },
    },
  },
  {
    displayName: "Sub-Group Name",
    name: "subGroupName",
    type: "string",
    required: true,
    default: "",
    description: "Name for the new sub-group",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["createSubGroup"],
      },
    },
  },
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    default: "",
    description: "WhatsApp group ID to link or unlink",
    placeholder: "120363123456789@g.us",
    displayOptions: {
      show: {
        resource: ["community"],
        operation: ["linkGroup", "unlinkGroup"],
      },
    },
  },
];
