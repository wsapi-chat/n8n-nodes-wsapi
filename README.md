# n8n Nodes - WSAPI API Integration

![npm version](https://img.shields.io/npm/v/%40wsapichat%2Fn8n-nodes-wsapi.svg?style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/%40wsapichat%2Fn8n-nodes-wsapi.svg?style=flat-square)
![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

A comprehensive n8n community node for [WSAPI](https://wsapi.chat) - the powerful WhatsApp API Gateway. Easily integrate WhatsApp messaging, contact management, group operations, and more into your n8n workflows.

[Installation](#installation) • [Credentials](#credentials) • [Operations](#operations) • [Examples](#examples) • [Development](#development) • [License](#license)

Note on affiliation: This is a community-maintained package for use with n8n. It is not affiliated with, endorsed by, or sponsored by n8n GmbH, Meta Platforms, Inc., or WhatsApp LLC. The package name uses the required `n8n-nodes-…` prefix for discoverability, which is nominative fair use of the n8n trademark. Please follow n8n's brand guidelines and Sustainable Use License.

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Click **Install Community Node**
3. Enter: `@wsapichat/n8n-nodes-wsapi`
4. Click **Install**

### Manual Installation

```bash
# Install in your n8n root directory
npm install @wsapichat/n8n-nodes-wsapi
```

## Prerequisites

- **n8n** version 0.195.0 or later
- **WSAPI Account**: Sign up at [wsapi.chat](https://wsapi.chat) to get your API credentials
- **WhatsApp Account**: Connected to your WSAPI instance

## Credentials

Before using the node, you'll need to set up your WSAPI credentials:

1. In n8n, go to **Credentials** and create a new **WSAPI API** credential
2. Enter your WSAPI details:
   - **API Key**: Your WSAPI API key
   - **Instance ID**: Your WhatsApp instance ID
   - **Base URL**: The WSAPI service URL (defaults to `https://wsapi.chat`)

You can obtain these credentials from your [WSAPI dashboard](https://wsapi.chat).

## Operations

### Messages
- **Send Text** - Send plain text messages with mentions and replies
- **Send Link** - Send rich link previews with thumbnails
- **Send Image** - Send images with captions and view-once options
- **Send Video** - Send videos with captions and view-once options
- **Send Audio** - Send audio files
- **Send Voice** - Send voice messages
- **Send Document** - Send PDF, Excel, and other document files
- **Send Sticker** - Send static and animated stickers
- **Send Contact** - Share contact information via vCard
- **Send Location** - Share GPS coordinates with place details
- **Send Reaction** - React to messages with emojis
- **Edit Message** - Edit previously sent text messages
- **Pin Message** - Pin messages in chats
- **Mark as Read** - Mark messages as read
- **Star Message** - Star/unstar messages
- **Delete Message** - Delete messages for everyone
- **Delete for Me** - Delete messages only for yourself

### Chat Management
- **Get All Chats** - Get all active chats
- **Get Chat** - Get specific chat information
- **Get Picture** - Get chat profile picture
- **Get Business Profile** - Retrieve business profile details
- **Delete Chat** - Remove chat conversations
- **Clear Chat** - Clear chat message history
- **Set Presence** - Set typing, recording, or paused status
- **Set Ephemeral** - Configure disappearing messages (24h, 7d, 90d)
- **Mute Chat** - Mute notifications for specified duration
- **Pin Chat** - Pin important conversations
- **Archive Chat** - Archive old conversations
- **Mark as Read** - Mark entire chats as read
- **Subscribe to Presence** - Get real-time presence updates
- **Request Messages** - Request message history

### Account Management
- **List Instances** - List all instances
- **Get Instance** - Retrieve instance details
- **Create Instance** - Create a new instance
- **Delete Instance** - Delete an instance
- **Update Instance Name** - Update instance display name
- **Update Instance Settings** - Modify instance settings (webhooks, event filters, etc.)
- **Get Instance Defaults** - Get default instance configuration
- **Update Instance Defaults** - Update default instance configuration
- **Regenerate API Key** - Generate new API keys
- **Restart Instance** - Restart WhatsApp instance
- **List Subscriptions** - List available subscriptions
- **List Subscription Instances** - List instances for a subscription
- **Get Subscription Changes** - Get subscription change history

### Session Control
- **Get QR Code Image** - Generate QR code image for login
- **Get QR Code String** - Get QR code as string
- **Get Pair Code** - Generate pairing code for phone linking
- **Get Status** - Check connection and login status
- **Flush History** - Clear session history
- **Logout** - Disconnect from WhatsApp

### Contact Management
- **Get Many** - Get all WhatsApp contacts
- **Get Contact** - Retrieve specific contact information
- **Create or Update Contact** - Add or update contacts
- **Get Blocklist** - Get list of blocked contacts
- **Block Contact** - Block a contact
- **Unblock Contact** - Unblock a contact
- **Sync Contacts** - Synchronize contacts

### Group Management
- **Get Many** - Get all group chats
- **Get Group** - Retrieve group details and participants
- **Create Group** - Create new groups with participants
- **Leave Group** - Leave a group
- **Get Participants** - Get group participant list
- **Update Participants** - Add, remove, promote, or demote group members
- **Set Description** - Update group descriptions
- **Set Name** - Change group names
- **Set Picture** - Upload group profile pictures
- **Set Announce Mode** - Toggle announcement-only mode
- **Set Join Approval** - Toggle join approval requirement
- **Set Locked Mode** - Toggle locked mode
- **Set Member Add Mode** - Configure who can add members
- **Get Invite Link** - Generate group invitation links
- **Reset Invite Link** - Reset group invitation links
- **Get Invite Info** - Get details about invitation codes
- **Get Invite Requests** - List pending join requests
- **Handle Join Requests** - Approve or reject join requests
- **Join with Invite** - Join a group using an invite code
- **Join with Link** - Join a group using an invite link

### Community Management
- **Get Many** - List all communities
- **Get Community** - Retrieve community details
- **Create Community** - Create a new community with participants
- **Leave Community** - Leave a community
- **Set Name** - Update community name
- **Set Description** - Update community description
- **Set Picture** - Upload community profile picture
- **Set Locked Mode** - Toggle locked mode
- **Get Participants** - Get community participant list
- **Update Participants** - Add or remove community members
- **Get Invite Link** - Generate community invitation link
- **Reset Invite Link** - Reset community invitation link
- **Get Sub-Groups** - List community sub-groups
- **Create Sub-Group** - Create a new sub-group in the community
- **Link Group** - Link an existing group to the community
- **Unlink Group** - Unlink a group from the community

### Newsletter Management
- **Get Many** - List all newsletters
- **Get Newsletter** - Retrieve newsletter details
- **Create Newsletter** - Create a new newsletter
- **Get by Invite Code** - Get newsletter info from an invite code
- **Set Subscription** - Subscribe or unsubscribe from a newsletter
- **Toggle Mute** - Mute or unmute a newsletter

### Status (Stories)
- **Get Privacy** - Get status privacy settings
- **Post Text** - Post a text status update
- **Post Image** - Post an image status update
- **Post Video** - Post a video status update
- **Delete Status** - Delete a status update

### User Operations
- **Get User Profile** - Retrieve user profile by phone number
- **Get My Profile** - Get your own profile information
- **Update My Profile** - Update your profile information
- **Check User** - Check if a phone number is on WhatsApp
- **Bulk Check Users** - Check multiple phone numbers at once
- **Get Privacy Settings** - Retrieve privacy settings
- **Set Privacy Setting** - Update a privacy setting
- **Set Presence** - Set availability status

### Call Management
- **Reject Call** - Automatically reject incoming calls

### Media Operations
- **Download Media** - Download images, videos, audio, and documents from messages

### Webhook Triggers
- **On Any Event** - Trigger on all event types
- **On Message Event** - Trigger on message, read, delete, star, and history sync events
- **On Chat Event** - Trigger on chat picture, presence, push name, setting, and status events
- **On Call Event** - Trigger on call offer, accept, and terminate events
- **On User Event** - Trigger on user presence events
- **On Contact, Group & Newsletter Event** - Trigger on contact, group, and newsletter events
- **On Newsletter Event** - Trigger on newsletter events
- **On Session Event** - Trigger on login, logout, authentication, and sync events

## Examples

### Send a Text Message
```
Resource: Message
Operation: Send Text
To: 1234567890@s.whatsapp.net
Text: Hello from n8n!
```

### Send an Image with Caption
```
Resource: Message
Operation: Send Image
To: 1234567890@s.whatsapp.net
Image URL: https://example.com/image.jpg
Caption: Check out this awesome image!
```

### Create a WhatsApp Group
```
Resource: Group
Operation: Create Group
Group Name: n8n Automation Team
Participants: 1234567890,9876543210,5555555555
```

### Post a Text Status Update
```
Resource: Status
Operation: Post Text
Text: Hello from n8n automation!
```

### Set Up Message Webhook Trigger
```
Trigger: WSAPI
Operation: On Message Event
Events: Message, Message Read
Auto-Download Media: enabled
Webhook Authentication: optional
```

## Webhook Configuration

The WSAPI Trigger node supports advanced webhook features:

- **Event Filtering**: Choose specific events (messages, chats, calls, newsletters, etc.)
- **Auto-Download Media**: Automatically download media files from messages
- **Custom Authentication**: Secure webhooks with custom headers
- **Event Parsing**: Automatic parsing of webhook payloads
- **Raw Event Data**: Optionally include raw event data in output

## AI Agent Integration

The WSAPI node has `usableAsTool` enabled, making it directly usable as a tool within n8n's AI Agent nodes. AI agents can leverage any WSAPI operation — send messages, manage groups, check users, and more — as part of their workflows.

## Development

### Prerequisites
- Node.js 16 or later
- npm 7 or later

### Setup
```bash
git clone https://github.com/wsapi-chat/n8n-nodes-wsapi
cd n8n-nodes-wsapi
npm install
```

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

### Linting & Formatting
```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

### Local Development
```bash
# Link the package locally
npm link

# In your n8n directory
npm link n8n-nodes-wsapi
```

## Support

- **Documentation**: [WSAPI Docs](https://wsapi.chat/documentation)
- **WSAPI Support**: [WSAPI Support](https://wsapi.chat/contact)

## Contributing and Conduct

Contributions are welcome. By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## License

This project is licensed under the MIT License — see `LICENSE` for details.

Trademark notice: "n8n" is a trademark of n8n GmbH. "WhatsApp" is a trademark of WhatsApp LLC. Any use here is for identification and compatibility purposes only and does not imply endorsement or affiliation with n8n GmbH, Meta Platforms, Inc., or WhatsApp LLC.
