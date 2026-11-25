Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [3.2.0] - 2026-11-25

### Added

- **Session operations**: Get Passkey State (`GET /session/passkey`), Request Passkey Challenge (`POST /session/passkey/request`), Submit Passkey Assertion (`POST /session/passkey`, JSON input) and Confirm Passkey (`POST /session/passkey/confirm`, compatibility only — rarely needed since the server confirms automatically)
- **OpenAPI spec**: Passkey endpoints and `PasskeyState` / `PasskeyAssertion` schemas, `passkeyStatus` on `SessionStatus`, 409 `PasskeyPending` on QR and pair-code endpoints, `verifiedName` on `UserInfo`

### Changed

- **Groups operations**: Participants are optional when creating a group; an empty list is omitted from the request so the group contains only the paired account

### Fixed

- The bundled OpenAPI spec documented the `DeviceNotPaired` response with status 403; the API returns 409

## [3.0.0]

Corrected picture, group/community setting, presence and star payloads. Added unstar, subgroup participants, community approval mode, edit mentions/expiration and optional media fields. Unsigned triggers work without credentials; configured credential errors remain errors. Signatures require original bytes and invalid signatures return actual HTTP 401. Ad attribution survives trigger parsing and is included in the event spec. Replaced the placeholder test command with contract/trigger tests. These changes are unpublished; npm publication and n8n Cloud verification are distinct.

## [1.0.33] - 2025-12-14

### Fixed

- **Chat operations**: Fixed `clearChat` HTTP method (POST → PUT) and `setEphemeral` body property name
- **Groups operations**: Fixed `getInviteInfo` URL path, changed `delete` to `leave` operation
- **Groups operations**: Added required `action` parameter to `updateParticipants`
- **Message operations**: Fixed `isFromMe` property name in `deleteForMe` operation

### Added

- **Groups operations**: Added 8 new operations - `setAnnounce`, `setLocked`, `setJoinApproval`, `setMemberAddMode`, `joinWithLink`, `joinWithInvite`, `handleJoinRequests`
- **Groups operations**: Added `resetLink` query parameter to `getInviteLink`
- **Webhook trigger**: Added new events - `chat_picture`, `chat_push_name`, `chat_status`, `initial_sync_finished`

### Removed

- **Contacts operations**: Removed non-existent API endpoints - `getPicture`, `getBusiness`, `subscribePresence`, `updateFullName`
- **Webhook trigger**: Removed invalid events - `user_picture`, `user_push_name`, `user_status`

## [1.0.18] - 2025-09-04

- Clarify MIT licensing and add LICENSE file
- Add CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
- Add non‑affiliation and trademark notice to README
- Align paths for n8n node discovery (WSapi folder casing)
- Tidy badges and docs
