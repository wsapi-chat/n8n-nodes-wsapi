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
			name: 'Archive Chat',
			value: 'archiveChat',
			description: 'Archive or unarchive a chat',
			action: 'Archive chat',
		},
		{
			name: 'Delete Chat',
			value: 'deleteChat',
			description: 'Delete a WhatsApp chat',
			action: 'Delete a chat',
		},
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
			name: 'Mark as Read',
			value: 'markChatAsRead',
			description: 'Mark a chat as read',
			action: 'Mark chat as read',
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
			name: 'Set Ephemeral',
			value: 'setEphemeral',
			description: 'Set ephemeral message expiration time',
			action: 'Set ephemeral messages',
		},
		{
			name: 'Set Presence',
			value: 'setPresence',
			description: 'Update chat presence (typing, recording, online)',
			action: 'Set chat presence',
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
	// Cache options for Get Chat
	{
		displayName: 'Cache Results',
		name: 'cacheResults',
		type: 'boolean',
		default: false,
		description: 'Whether to cache the result for repeated requests with the same chat ID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['getChat'],
			},
		},
	},
	{
		displayName: 'Cache TTL (Sec)',
		name: 'cacheTtl',
		type: 'number',
		default: 300,
		description: 'Time-to-live for the cache entry in seconds',
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['getChat'],
				cacheResults: [true],
			},
		},
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
	// Mute duration field aligned with API contract
	{
		displayName: 'Mute Duration',
		name: 'muteDuration',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['muteChat'],
			},
		},
		options: [
			{ name: 'Unmute', value: 'unmute' },
			{ name: '8 Hours', value: '8h' },
			{ name: '1 Week', value: '1w' },
			{ name: 'Always', value: 'always' },
		],
		default: '8h',
		description: 'Duration preset for muting the chat. Choose Unmute to disable muting.',
		hint: 'Matches API presets: 8h, 1w, always. Selecting Unmute sends duration=null.',
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
		description: 'Whether to pin the chat to the top of the chat list',
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
		description: 'Whether to move the chat to or from the archived folder',
		hint: 'true = move chat to archive, false = restore from archive to main chat list',
	},
	// Ephemeral expiration field (tool-compatible)
	{
		displayName: 'Ephemeral Expiration',
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
			{ name: 'Off', value: 'off' },
			{ name: '24 Hours', value: '24h' },
			{ name: '7 Days', value: '7d' },
			{ name: '90 Days', value: '90d' },
		],
		default: 'off',
		description: 'Set automatic message deletion timer for the chat',
		hint: 'Values map directly to the API string presets (off, 24h, 7d, 90d).',
	},
	// Mark chat as read body requirements
	{
		displayName: 'Mark Read',
		name: 'read',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['markChatAsRead'],
			},
		},
		default: true,
		description: 'Whether to mark the chat as read',
		hint: 'API expects { "read": true } to mark as read; set false to leave unread.',
	},
];
