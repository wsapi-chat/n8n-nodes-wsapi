const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");
const {
  executeGroupsOperation,
} = require("../dist/nodes/WSApi/operations/groups.operations.js");
const {
  executeCommunityOperation,
} = require("../dist/nodes/WSApi/operations/community.operations.js");
const {
  executeMessageOperation,
} = require("../dist/nodes/WSApi/operations/message.operations.js");
const {
  executeUsersOperation,
} = require("../dist/nodes/WSApi/operations/users.operations.js");
const { WsApiTrigger } = require("../dist/nodes/WSApi/WsApiTrigger.node.js");

const cases = [
  [
    executeGroupsOperation,
    "setPicture",
    { pictureBase64: "image" },
    { data: "image" },
  ],
  [
    executeGroupsOperation,
    "setAnnounce",
    { announce: false },
    { enabled: false },
  ],
  [executeGroupsOperation, "setLocked", { locked: false }, { enabled: false }],
  [
    executeGroupsOperation,
    "setJoinApproval",
    { joinApproval: false },
    { enabled: false },
  ],
  [
    executeGroupsOperation,
    "setMemberAddMode",
    { onlyAdmins: false },
    { onlyAdminAdd: false },
  ],
  [
    executeCommunityOperation,
    "setPicture",
    { pictureBase64: "image" },
    { data: "image" },
  ],
  [
    executeCommunityOperation,
    "setLocked",
    { locked: false },
    { enabled: false },
  ],
  [
    executeUsersOperation,
    "setPresence",
    { presenceStatus: "available" },
    { presence: "available" },
  ],
  [
    executeMessageOperation,
    "starMessage",
    { starred: false },
    { chatId: "sample", senderId: "sample", starred: false },
  ],
  [
    executeMessageOperation,
    "editMessage",
    {
      newMessage: "edited",
      advancedOptions: { mentions: "u,v", ephemeralExpiration: "off" },
    },
    {
      to: "sample",
      text: "edited",
      mentions: ["u", "v"],
      ephemeralExpiration: "off",
    },
  ],
  [
    executeCommunityOperation,
    "createSubGroup",
    { subGroupName: "group", participants: { phoneNumbers: "u,v" } },
    { name: "group", participants: ["u", "v"] },
  ],
];
for (const [execute, operation, params, expected] of cases) {
  test(
    operation + " " + execute.name + " uses canonical request fields",
    async () => {
      const calls = [];
      const ctx = {
        getNodeParameter(name, i, fallback) {
          return name in params ? params[name] : (fallback ?? "sample");
        },
        async getCredentials() {
          return { baseUrl: "https://unused.invalid" };
        },
        helpers: {
          async httpRequestWithAuthentication(auth, options) {
            calls.push(options);
            return {};
          },
        },
      };
      await execute.call(ctx, operation, 0, "https://unused.invalid");
      assert.deepEqual(calls[0].body, expected);
    },
  );
}

function triggerContext({ secret, signature, raw, credentialsError } = {}) {
  const body = {
    eventType: "message",
    eventData: { text: "hi", adReferral: { ctwaClid: "click" } },
  };
  const response = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
  };
  return {
    response,
    getBodyData: () => body,
    getNodeParameter: (name) =>
      ({
        events: ["message"],
        parseEventData: true,
        autoDownloadMedia: false,
        includeRawEvent: false,
      })[name],
    getNode: () => ({
      credentials: secret ? { wsApiApi: { id: "test" } } : undefined,
    }),
    async getCredentials() {
      if (credentialsError) throw new Error("Credentials unavailable");
      return { signingSecret: secret };
    },
    getHeaderData: () => ({ "x-webhook-signature": signature }),
    getRequestObject: () => ({ rawBody: raw }),
    getResponseObject: () => response,
    logger: { warn() {} },
  };
}
test("trigger accepts unsigned events without optional credentials and preserves ad referral", async () => {
  const result = await WsApiTrigger.prototype.webhook.call(
    triggerContext({ credentialsError: true }),
  );
  assert.equal(result.workflowData[0][0].json.adReferral.ctwaClid, "click");
});
test("trigger verifies original bytes, including whitespace", async () => {
  const raw = Buffer.from(
    '{ "eventType": "message", "eventData": {"text":"hi","adReferral":{"ctwaClid":"click"}} }',
  );
  const signature =
    "sha256=" + createHmac("sha256", "secret").update(raw).digest("hex");
  const result = await WsApiTrigger.prototype.webhook.call(
    triggerContext({ secret: "secret", signature, raw }),
  );
  assert.ok(result.workflowData);
});
for (const signature of [undefined, "sha256=x", "sha256=" + "0".repeat(64)]) {
  test(
    "trigger rejects invalid signature with HTTP 401: " + signature,
    async () => {
      const ctx = triggerContext({
        secret: "secret",
        signature,
        raw: Buffer.from("{}"),
      });
      const result = await WsApiTrigger.prototype.webhook.call(ctx);
      assert.equal(ctx.response.statusCode, 401);
      assert.equal(result.noWebhookResponse, true);
      assert.equal(result.workflowData, undefined);
    },
  );
}
test("trigger never reconstructs bytes for signature verification", async () => {
  await assert.rejects(
    WsApiTrigger.prototype.webhook.call(
      triggerContext({ secret: "secret", signature: "sha256=x" }),
    ),
    /original raw/,
  );
});
test("configured credential failures are not silently ignored", async () => {
  await assert.rejects(
    WsApiTrigger.prototype.webhook.call(
      triggerContext({ secret: "secret", credentialsError: true }),
    ),
    /Credentials unavailable/,
  );
});

const {
  executeSessionOperation,
} = require("../dist/nodes/WSApi/operations/session.operations.js");

function requestContext(params) {
  const calls = [];
  return {
    calls,
    getNodeParameter(name, i, fallback) {
      return name in params ? params[name] : (fallback ?? "sample");
    },
    getNode: () => ({ name: "WSAPI" }),
    async getCredentials() {
      return { baseUrl: "https://unused.invalid" };
    },
    helpers: {
      async httpRequestWithAuthentication(auth, options) {
        calls.push(options);
        return { status: "required" };
      },
    },
  };
}

test("group create omits participants when none are given", async () => {
  const ctx = requestContext({ groupName: "solo", participants: {} });
  await executeGroupsOperation.call(ctx, "create", 0, "https://unused.invalid");
  assert.equal(ctx.calls[0].url, "/groups");
  assert.deepEqual(ctx.calls[0].body, { name: "solo" });
});

test("group create sends participants when given", async () => {
  const ctx = requestContext({
    groupName: "team",
    participants: { phoneNumbers: "u, v" },
  });
  await executeGroupsOperation.call(ctx, "create", 0, "https://unused.invalid");
  assert.deepEqual(ctx.calls[0].body, {
    name: "team",
    participants: ["u", "v"],
  });
});

for (const [operation, method, url] of [
  ["getPasskeyState", "GET", "/session/passkey"],
  ["requestPasskey", "POST", "/session/passkey/request"],
  ["confirmPasskey", "POST", "/session/passkey/confirm"],
]) {
  test("session " + operation + " calls " + method + " " + url, async () => {
    const ctx = requestContext({});
    await executeSessionOperation.call(ctx, operation, 0);
    assert.equal(ctx.calls[0].method, method);
    assert.equal(ctx.calls[0].url, url);
    assert.equal(ctx.calls[0].body, undefined);
  });
}

const assertion = {
  id: "cred",
  rawId: "cred",
  type: "public-key",
  response: { clientDataJSON: "cdj", signature: "sig", userHandle: null },
};
for (const input of [JSON.stringify(assertion), assertion]) {
  test(
    "session submitPasskey posts the assertion (" + typeof input + ")",
    async () => {
      const ctx = requestContext({ passkeyAssertion: input });
      const result = await executeSessionOperation.call(
        ctx,
        "submitPasskey",
        0,
      );
      assert.equal(ctx.calls[0].method, "POST");
      assert.equal(ctx.calls[0].url, "/session/passkey");
      assert.deepEqual(ctx.calls[0].body, assertion);
      assert.deepEqual(result, { status: "required" });
    },
  );
}

for (const input of ["not json", "{}", "[]"]) {
  test(
    "session submitPasskey rejects invalid assertion: " + input,
    async () => {
      const ctx = requestContext({ passkeyAssertion: input });
      await assert.rejects(
        executeSessionOperation.call(ctx, "submitPasskey", 0),
        /Passkey Assertion/,
      );
      assert.equal(ctx.calls.length, 0);
    },
  );
}
