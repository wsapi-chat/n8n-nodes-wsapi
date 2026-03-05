import { INodeProperties } from "n8n-workflow";

export const usersOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["users"],
    },
  },
  options: [
    {
      name: "Bulk Check Users",
      value: "bulkCheckUsers",
      description: "Check multiple phone numbers on WhatsApp",
      action: "Bulk check users",
    },
    {
      name: "Check User",
      value: "checkUser",
      description: "Check if a phone number is on WhatsApp",
      action: "Check user",
    },
    {
      name: "Get My Profile",
      value: "getMyProfile",
      description: "Get own profile information",
      action: "Get my profile",
    },
    {
      name: "Get Privacy Settings",
      value: "getPrivacySettings",
      action: "Get privacy settings",
    },
    {
      name: "Get User Profile",
      value: "get",
      description: "Get user profile information",
      action: "Get user profile",
    },
    {
      name: "Set Presence",
      value: "setPresence",
      description: "Set presence state (available/unavailable)",
      action: "Set presence",
    },
    {
      name: "Set Privacy Setting",
      value: "setPrivacySetting",
      description: "Update a privacy setting",
      action: "Set privacy setting",
    },
    {
      name: "Update My Profile",
      value: "updateMyProfile",
      description: "Update own profile (name, status, picture)",
      action: "Update my profile",
    },
  ],
  default: "get",
};

export const usersFields: INodeProperties[] = [
  {
    displayName: "Phone Number",
    name: "phone",
    type: "string",
    required: true,
    default: "",
    description: "Phone number of the WhatsApp user",
    hint: "Include country code without + symbol (e.g., 1234567890)",
    placeholder: "1234567890",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["get", "checkUser"],
      },
    },
  },
  {
    displayName: "Cache Results",
    name: "cacheResults",
    type: "boolean",
    default: false,
    description:
      "Whether to cache the result for repeated requests with the same phone number",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["get"],
      },
    },
  },
  {
    displayName: "Cache TTL (Sec)",
    name: "cacheTtl",
    type: "number",
    default: 300,
    description: "Time-to-live for the cache entry in seconds",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["get"],
        cacheResults: [true],
      },
    },
  },
  {
    displayName: "Profile Fields",
    name: "profileFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    description: "Profile fields to update (all optional)",
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Display name",
      },
      {
        displayName: "Status",
        name: "status",
        type: "string",
        default: "",
        description: "Status message",
      },
      {
        displayName: "Picture Base64",
        name: "pictureBase64",
        type: "string",
        default: "",
        description: "Base64 encoded image data for profile picture",
      },
    ],
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["updateMyProfile"],
      },
    },
  },
  {
    displayName: "Presence",
    name: "presenceStatus",
    type: "options",
    required: true,
    options: [
      { name: "Available", value: "available" },
      { name: "Unavailable", value: "unavailable" },
    ],
    default: "available",
    description: "Presence state",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["setPresence"],
      },
    },
  },
  {
    displayName: "Setting",
    name: "privacySetting",
    type: "options",
    required: true,
    options: [
      { name: "Groups", value: "groupadd" },
      { name: "Last Seen", value: "last" },
      { name: "Online", value: "online" },
      { name: "Profile Picture", value: "profile" },
      { name: "Read Receipts", value: "readreceipts" },
      { name: "Status", value: "status" },
    ],
    default: "last",
    description: "Which privacy setting to update",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["setPrivacySetting"],
      },
    },
  },
  {
    displayName: "Value",
    name: "privacyValue",
    type: "options",
    required: true,
    options: [
      { name: "All", value: "all" },
      { name: "Contact Blacklist", value: "contact_blacklist" },
      { name: "Contacts", value: "contacts" },
      { name: "Known", value: "known" },
      { name: "Match Last Seen", value: "match_last_seen" },
      { name: "None", value: "none" },
    ],
    default: "contacts",
    description: "Privacy level for the setting",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["setPrivacySetting"],
      },
    },
  },
  {
    displayName: "Phone Numbers",
    name: "phones",
    type: "string",
    required: true,
    default: "",
    description: "Comma-separated phone numbers to check (with country codes)",
    placeholder: "1234567890,9876543210",
    displayOptions: {
      show: {
        resource: ["users"],
        operation: ["bulkCheckUsers"],
      },
    },
  },
];
