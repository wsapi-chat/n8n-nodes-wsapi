import { INodeProperties } from "n8n-workflow";

export const sessionOperations: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["session"],
    },
  },
  options: [
    {
      name: "Confirm Passkey (Rarely Needed)",
      value: "confirmPasskey",
      description:
        "Compatibility fallback: send the passkey pairing confirmation. The server now sends it automatically, so this is rarely needed.",
      action: "Confirm passkey pairing",
    },
    {
      name: "Flush History",
      value: "flushHistory",
      description: "Flush cached history sync messages",
      action: "Flush cached history",
    },
    {
      name: "Get Pair Code",
      value: "getPairCode",
      description: "Get pair code for phone number",
      action: "Get pair code for phone",
    },
    {
      name: "Get Passkey State",
      value: "getPasskeyState",
      description:
        "Get the passkey verification state (and WebAuthn challenge while status is required)",
      action: "Get passkey state",
    },
    {
      name: "Get QR Code Image",
      value: "getQrImage",
      description: "Get QR code image for WhatsApp login",
      action: "Get QR code image for login",
    },
    {
      name: "Get QR Code String",
      value: "getQrCode",
      description: "Get QR code string for WhatsApp login",
      action: "Get QR code string for login",
    },
    {
      name: "Get Status",
      value: "getStatus",
      description: "Get WhatsApp session status",
      action: "Get session status",
    },
    {
      name: "Logout",
      value: "logout",
      description: "Logout from WhatsApp",
      action: "Log out from whats app",
    },
    {
      name: "Request Passkey Challenge",
      value: "requestPasskey",
      description:
        "Ask WhatsApp for a passkey challenge for an unpaired device (idempotent while one is pending)",
      action: "Request passkey challenge",
    },
    {
      name: "Submit Passkey Assertion",
      value: "submitPasskey",
      description:
        "Submit the WebAuthn assertion signed by the account owner's passkey on web.whatsapp.com",
      action: "Submit passkey assertion",
    },
  ],
  default: "getStatus",
};

export const sessionFields: INodeProperties[] = [
  {
    displayName: "Phone Number",
    name: "phone",
    type: "string",
    required: true,
    default: "",
    description: "Phone number to receive WhatsApp login verification code",
    hint: "Include country code without + symbol (e.g., 1234567890 for a US number)",
    placeholder: "1234567890",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["getPairCode"],
      },
    },
  },
  {
    displayName: "Passkey Assertion (JSON)",
    name: "passkeyAssertion",
    type: "json",
    required: true,
    default: "{}",
    description:
      "WebAuthn assertion as produced by PublicKeyCredential.toJSON() after calling navigator.credentials.get() on https://web.whatsapp.com with the challenge from Get Passkey State",
    hint: 'Must include "rawId" and "response" (with "clientDataJSON" and "signature"); binary fields are base64url-encoded',
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["submitPasskey"],
      },
    },
  },
];
