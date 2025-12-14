Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

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

