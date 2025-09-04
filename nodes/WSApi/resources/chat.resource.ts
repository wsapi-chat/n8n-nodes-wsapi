import { INodeProperties } from 'n8n-workflow';

export const chatOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['chat'],
		},
	},
	options: [
		{
			name: 'Get All Chats',
			value: 'getChats',
			description: 'List all WhatsApp chats',
			action: 'Get all chats',
		},
		{
			name: 'Get Chat',
			value: 'getChat',
			description: 'Get information about a specific chat',
			action: 'Get a chat',
		},
		{
			name: 'Delete Chat',
			value: 'deleteChat',
			description: 'Delete a WhatsApp chat',
			action: 'Delete a chat',
		},
		{
			name: 'Mark as Read',
			value: 'markChatAsRead',
			description: 'Mark a chat as read',
			action: 'Mark chat as read',
		},
		{
			name: 'Set Presence',
			value: 'setPresence',
			description: 'Update chat presence (typing, recording, online)',
			action: 'Set chat presence',
		},
		{
			name: 'Mute Chat',
			value: 'muteChat',
			description: 'Mute or unmute a chat',
			action: 'Mute chat',
		},
		{
			name: 'Pin Chat',
			value: 'pinChat',
			description: 'Pin or unpin a chat',
			action: 'Pin chat',
		},
		{
			name: 'Archive Chat',
			value: 'archiveChat',
			description: 'Archive or unarchive a chat',
			action: 'Archive chat',
		},
		{
			name: 'Set Ephemeral',
			value: 'setEphemeral',
			description: 'Set ephemeral message expiration time',
			action: 'Set ephemeral messages',
		},
	],
	default: 'getChats',
};

export const chatFields: INodeProperties[] = [
	// Chat ID field (tool-compatible)
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['getChat', 'deleteChat', 'markChatAsRead', 'setPresence', 'muteChat', 'pinChat', 'archiveChat', 'setEphemeral'],
			},
		},
		default: '',
		placeholder: '1234567890@s.whatsapp.net',
		description: 'WhatsApp chat identifier. For contacts: phone + @s.whatsapp.net. For groups: group ID + @g.us',
		hint: 'Individual chat: 1234567890@s.whatsapp.net | Group chat: 120363123456789@g.us',
	},
	// Presence field (tool-compatible)
	{
		displayName: 'Presence',
		name: 'presence',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['setPresence'],
			},
		},
		options: [
			{
				name: 'Typing',
				value: 'typing',
			},
			{
				name: 'Recording',
				value: 'recording',
			},
			{
				name: 'Paused',
				value: 'paused',
			},
		],
		default: 'typing',
		description: 'Activity indicator to show in the chat',
		hint: 'Typing = show typing indicator, Recording = show voice recording, Paused = stop all indicators',
	},
	// Muted field (tool-compatible)
	{
		displayName: 'Muted',
		name: 'muted',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['muteChat'],
			},
		},
		default: true,
		description: 'Enable or disable chat notifications',
		hint: 'true = mute notifications for this chat, false = enable notifications',
	},
	// Pinned field (tool-compatible)
	{
		displayName: 'Pinned',
		name: 'pinned',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['pinChat'],
			},
		},
		default: true,
		description: 'Pin or unpin chat to the top of the chat list',
		hint: 'true = pin chat to top, false = remove from pinned chats',
	},
	// Archived field (tool-compatible)
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['archiveChat'],
			},
		},
		default: true,
		description: 'Move chat to or from the archived folder',
		hint: 'true = move chat to archive, false = restore from archive to main chat list',
	},
	// Ephemeral expiration field (tool-compatible)
	{
		displayName: 'Ephemeral Expiration (Seconds)',
		name: 'ephemeralExpiration',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['setEphemeral'],
			},
		},
		options: [
			{
				name: 'Off',
				value: 0,
			},
			{
				name: '24 Hours',
				value: 86400,
			},
			{
				name: '7 Days',
				value: 604800,
			},
			{
				name: '90 Days',
				value: 7776000,
			},
		],
		default: 0,
		description: 'Set automatic message deletion timer for the chat',
		hint: 'Choose how long messages remain visible. Off = messages never disappear automatically',
	},
];