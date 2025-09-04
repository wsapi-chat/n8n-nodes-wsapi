# n8n-nodes-wsapi

![npm version](https://img.shields.io/npm/v/n8n-nodes-wsapi.svg?style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/n8n-nodes-wsapi.svg?style=flat-square)
![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

A comprehensive n8n community node for [WSAPI](https://wsapi.chat) - the powerful WhatsApp API Gateway. Easily integrate WhatsApp messaging, contact management, group operations, and more into your n8n workflows.

[Installation](#installation) • [Credentials](#credentials) • [Operations](#operations) • [Examples](#examples) • [Development](#development) • [License](#license)

Note on affiliation: This is a community-maintained package for use with n8n. It is not affiliated with, endorsed by, or sponsored by n8n GmbH, Meta Platforms, Inc., or WhatsApp LLC. The package name uses the required `n8n-nodes-…` prefix for discoverability, which is nominative fair use of the n8n trademark. Please follow n8n’s brand guidelines and Sustainable Use License.

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Click **Install Community Node**
3. Enter: `n8n-nodes-wsapi`
4. Click **Install**

### Manual Installation

```bash
# Install in your n8n root directory
npm install n8n-nodes-wsapi
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

You can obtain these credentials from your [WSAPI dashboard](https://wsapi.chat).

## Operations

### 📧 Messages
- **Send Text Message** - Send plain text messages with mentions and replies
- **Send Link Message** - Send rich link previews with thumbnails
- **Send Image Message** - Send images with captions and view-once options
- **Send Video Message** - Send videos with captions and view-once options
- **Send Audio Message** - Send audio files and voice messages
- **Send Document Message** - Send PDF, Excel, and other document files
- **Send Sticker Message** - Send static and animated stickers
- **Send Contact Message** - Share contact information via vCard
- **Send Location Message** - Share GPS coordinates with place details
- **Send Reaction** - React to messages with emojis
- **Edit Message** - Edit previously sent text messages
- **Mark as Read** - Mark messages as read
- **Star Message** - Star/unstar messages
- **Delete Message** - Delete messages for everyone or yourself

### 💬 Chat Management
- **List Chats** - Get all active chats
- **Get Chat** - Get specific chat information
- **Delete Chat** - Remove chat conversations
- **Set Presence** - Set typing, recording, or paused status
- **Set Ephemeral** - Configure disappearing messages (24h, 7d, 90d)
- **Mute Chat** - Mute notifications for specified duration
- **Pin/Unpin Chat** - Pin important conversations
- **Archive/Unarchive** - Archive old conversations
- **Mark as Read** - Mark entire chats as read

### 📱 Account Management
- **Get Account Info** - Retrieve account details (JID, name, status)
- **Set Name** - Update your WhatsApp display name
- **Set Profile Picture** - Upload new profile picture
- **Set Presence** - Set availability status
- **Set Status Message** - Update your status message

### 🔐 Session Control
- **Get QR Code** - Generate QR code for login (image or string)
- **Get Login Code** - Generate pairing code for phone linking
- **Get Session Status** - Check connection and login status
- **Logout** - Disconnect from WhatsApp

### 👥 Contact Management
- **List Contacts** - Get all WhatsApp contacts
- **Get Contact** - Retrieve specific contact information
- **Create Contact** - Add new contacts to address book
- **Update Contact** - Modify contact information
- **Get Profile Picture** - Download contact profile pictures
- **Get Business Profile** - Retrieve business contact details
- **Update Full Name** - Change contact display names
- **Subscribe to Presence** - Get real-time presence updates

### 👨‍👩‍👧‍👦 Group Management
- **List Groups** - Get all group chats
- **Get Group Info** - Retrieve group details and participants
- **Create Group** - Create new groups with participants
- **Delete Group** - Remove groups (admin only)
- **Set Description** - Update group descriptions
- **Set Name** - Change group names
- **Set Picture** - Upload group profile pictures
- **Get Invite Link** - Generate group invitation links
- **Get Invite Requests** - List pending join requests
- **Update Participants** - Add or remove group members
- **Get Invite Info** - Get details about invitation codes

### 👤 User Operations
- **Get User Info** - Retrieve user details by phone number

### ⚙️ Instance Management
- **Get Settings** - Retrieve instance configuration
- **Update Settings** - Modify webhook URLs, authentication, and pull mode
- **Update API Key** - Generate new API keys
- **Restart Instance** - Restart WhatsApp instance

### 📞 Call Management
- **Reject Call** - Automatically reject incoming calls

### 📎 Media Operations
- **Download Media** - Download images, videos, audio, and documents from messages

### 🔔 Webhook Triggers
- **Message Events** - Trigger on new messages, reads, deletes, stars
- **Chat Events** - Trigger on presence changes, settings updates
- **Session Events** - Trigger on login, logout, and authentication events
- **Call Events** - Trigger on incoming calls and call status changes
- **User Events** - Trigger on profile updates and presence changes
- **Contact Events** - Trigger on contact information changes

### 🤖 AI Agent Tools
- **WSAPI Tool** - AI Agent tool for sending WhatsApp messages through WSAPI
  - Exposes `send_whatsapp_message` function to AI agents
  - Supports both individual contacts and group messaging
  - Configurable tool name and description for AI context
  - Seamless integration with n8n's AI Agent nodes

## Examples

### Send a Text Message
```
Resource: Message
Operation: Send Text Message
To: 1234567890@s.whatsapp.net
Text: Hello from n8n! 👋
```

### Send an Image with Caption
```
Resource: Message
Operation: Send Image Message
To: 1234567890@s.whatsapp.net
Image URL: https://example.com/image.jpg
Caption: Check out this awesome image!
```

### Create a WhatsApp Group
```
Resource: Groups
Operation: Create Group
Group Name: n8n Automation Team
Participants: 1234567890,9876543210,5555555555
```

### Set Up Message Webhook Trigger
```
Trigger: WSAPI
Operation: On Message Event
Events: Message, Message Read
Auto-Download Media: ✓ (enabled)
Webhook Authentication: ✓ (optional)
```

### Use WSAPI Tool with AI Agent
```
Node: WSAPI Tool
Tool Name: send_whatsapp_message
Tool Description: Send WhatsApp messages to contacts or groups

Connect to: AI Agent node
- AI agents can now call send_whatsapp_message(to, message)
- Supports both individual contacts (1234567890@s.whatsapp.net)
- Supports group messaging (1234567890@g.us)
```

## Webhook Configuration

The WSAPI Trigger node supports advanced webhook features:

- **Event Filtering**: Choose specific events (messages, chats, calls, etc.)
- **Auto-Download Media**: Automatically download media files from messages
- **Custom Authentication**: Secure webhooks with custom headers
- **Immediate Response**: Control webhook response timing
- **Event Parsing**: Automatic parsing of webhook payloads


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

### Linting
```bash
npm run lint
npm run lint:fix
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

[⬆ Back to top](#n8n-nodes-wsapi)

[⬆ Back to top](#n8n-nodes-wsapi)
