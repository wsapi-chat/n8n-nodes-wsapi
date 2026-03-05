import { INodeProperties } from "n8n-workflow";

export const contactsOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["contacts"],
    },
  },
  options: [
    {
      name: "Block Contact",
      value: "blockContact",
      description: "Block a contact",
      action: "Block contact",
    },
    {
      name: "Create or Update Contact",
      value: "create",
      description: "Create or update a WhatsApp contact",
      action: "Create or update contact",
    },
    {
      name: "Get Blocklist",
      value: "getBlocklist",
      description: "Get list of blocked contacts",
      action: "Get blocklist",
    },
    {
      name: "Get Contact",
      value: "get",
      description: "Get contact information",
      action: "Get contact information",
    },
    {
      name: "Get Many",
      value: "getAll",
      description: "List many WhatsApp contacts",
      action: "List all contacts",
    },
    {
      name: "Sync Contacts",
      value: "syncContacts",
      description: "Trigger a full contact sync from WhatsApp server",
      action: "Sync contacts",
    },
    {
      name: "Unblock Contact",
      value: "unblockContact",
      description: "Unblock a contact",
      action: "Unblock contact",
    },
  ],
  default: "getAll",
};

export const contactsFields: INodeProperties[] = [
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    default: "",
    description: "WhatsApp contact identifier (phone number + @s.whatsapp.net)",
    hint: "Format: phone number with country code + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net)",
    placeholder: "1234567890@s.whatsapp.net",
    displayOptions: {
      show: {
        resource: ["contacts"],
        operation: ["get", "blockContact", "unblockContact"],
      },
    },
  },
  {
    displayName: "Cache Results",
    name: "cacheResults",
    type: "boolean",
    default: false,
    description:
      "Whether to cache the result for repeated requests with the same contact ID",
    displayOptions: {
      show: {
        resource: ["contacts"],
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
        resource: ["contacts"],
        operation: ["get"],
        cacheResults: [true],
      },
    },
  },
  {
    displayName: "Contact ID",
    name: "newContactId",
    type: "string",
    required: true,
    default: "",
    description: "WhatsApp ID for the contact",
    hint: "Format: phone number with country code + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net)",
    placeholder: "1234567890@s.whatsapp.net",
    displayOptions: {
      show: {
        resource: ["contacts"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Full Name",
    name: "fullName",
    type: "string",
    required: true,
    default: "",
    description:
      "Complete name for the contact as it should appear in your contacts",
    hint: 'Enter the full display name (e.g., "John Smith" or "ABC Company")',
    placeholder: "John Smith",
    displayOptions: {
      show: {
        resource: ["contacts"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    required: true,
    default: "",
    description: "First name of the contact",
    hint: "Enter the contact's given name or first name",
    placeholder: "John",
    displayOptions: {
      show: {
        resource: ["contacts"],
        operation: ["create"],
      },
    },
  },
];
