import { INodeProperties } from 'n8n-workflow';
import { createAdvancedOptions } from '../helpers/utils';

export const messageResource: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Message',
			value: 'message',
		},
	],
	default: 'message',
};

export const messageOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['message'],
		},
	},
	options: [
		{
			name: 'Delete for Me',
			value: 'deleteForMe',
			description: 'Delete a message in a WhatsApp chat for yourself only',
			action: 'Delete a message for yourself only',
		},
		{
			name: 'Delete Message',
			value: 'deleteMessage',
			description: 'Delete a message in a WhatsApp chat',
			action: 'Delete a message',
		},
		{
			name: 'Edit Message',
			value: 'editMessage',
			description: 'Edit an existing message in a WhatsApp chat',
			action: 'Edit a message',
		},
		{
			name: 'Mark as Read',
			value: 'markAsRead',
			description: 'Mark a message as read in a WhatsApp chat',
			action: 'Mark a message as read',
		},
		{
			name: 'Send Audio',
			value: 'sendAudio',
			description: 'Send an audio message to a WhatsApp contact or group',
			action: 'Send an audio message',
		},
		{
			name: 'Send Contact',
			value: 'sendContact',
			description: 'Send a contact message to a WhatsApp contact or group',
			action: 'Send a contact message',
		},
		{
			name: 'Send Document',
			value: 'sendDocument',
			description: 'Send a document message to a WhatsApp contact or group',
			action: 'Send a document message',
		},
		{
			name: 'Send Image',
			value: 'sendImage',
			description: 'Send an image message to a WhatsApp contact or group',
			action: 'Send an image message',
		},
		{
			name: 'Send Link',
			value: 'sendLink',
			description: 'Send a link preview message to a WhatsApp contact or group',
			action: 'Send a link message',
		},
		{
			name: 'Send Location',
			value: 'sendLocation',
			description: 'Send a location message to a WhatsApp contact or group',
			action: 'Send a location message',
		},
		{
			name: 'Send Reaction',
			value: 'sendReaction',
			description: 'Send a reaction to a message in a WhatsApp chat',
			action: 'Send a reaction to a message',
		},
		{
			name: 'Send Sticker',
			value: 'sendSticker',
			description: 'Send a sticker message to a WhatsApp contact or group',
			action: 'Send a sticker message',
		},
		{
			name: 'Send Text',
			value: 'sendText',
			description: 'Send a text message to a WhatsApp contact or group',
			action: 'Send a text message',
		},
		{
			name: 'Send Video',
			value: 'sendVideo',
			description: 'Send a video message to a WhatsApp contact or group',
			action: 'Send a video message',
		},
		{
			name: 'Send Voice',
			value: 'sendVoice',
			description: 'Send a voice message to a WhatsApp contact or group',
			action: 'Send a voice message',
		},
		{
			name: 'Star Message',
			value: 'starMessage',
			description: 'Star or unstar a message in a WhatsApp chat',
			action: 'Star a message',
		},
	],
	default: 'sendText',
};

export const messageFields: INodeProperties[] = [
	// Consolidated "To" field for all message operations (tool-compatible)
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendText', 'sendLink', 'sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendContact', 'sendLocation', 'sendSticker', 'sendReaction', 'editMessage', 'deleteMessage', 'deleteForMe', 'starMessage', 'markAsRead'],
			},
		},
		default: '',
		placeholder: '1234567890@s.whatsapp.net',
		description: 'WhatsApp contact ID or group ID. For contacts: phone number + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net). For groups: group ID + @g.us (e.g., 120363123456789@g.us)',
		hint: 'Phone number must include country code without +. Example: 1234567890@s.whatsapp.net',
	},
	// Text message fields (tool-compatible)
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendText', 'sendLink'],
			},
		},
		default: '',
		description: 'The text message to send to the WhatsApp contact or group',
		hint: 'Enter the text message content. Supports emojis and formatting.',
	},
	// Link message fields (tool-compatible)
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLink'],
			},
		},
		default: '',
		description: 'The URL to send as a link preview message',
		hint: 'Enter a valid HTTP or HTTPS URL. WhatsApp will automatically generate a preview.',
		placeholder: 'https://example.com',
	},
	// Media fields (tool-compatible)
	{
		displayName: 'Media URL',
		name: 'mediaUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendSticker'],
			},
		},
		default: '',
		description: 'URL of the media file to send. Must be a publicly accessible HTTP or HTTPS URL.',
		hint: 'Provide a direct link to the media file. Supported formats vary by operation (images: JPG, PNG; videos: MP4; audio: MP3, etc.)',
		placeholder: 'https://example.com/media/file.jpg',
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendImage', 'sendVideo', 'sendDocument'],
			},
		},
		default: '',
		description: 'Optional caption text to accompany the media file',
		hint: 'Add descriptive text for the media. Supports emojis and formatting.',
	},
	// Contact fields (tool-compatible)
	{
		displayName: 'Contact Name',
		name: 'contactName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendContact'],
			},
		},
		default: '',
		description: 'Full name of the contact to share',
		hint: 'Enter the contact\'s display name as you want it to appear in WhatsApp',
		placeholder: 'John Doe',
	},
	{
		displayName: 'Contact Phone',
		name: 'contactPhone',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendContact'],
			},
		},
		default: '',
		description: 'Phone number of the contact to share',
		hint: 'Include country code without + symbol. Example: 1234567890',
		placeholder: '1234567890',
	},
	// Location fields (tool-compatible)
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: 0,
		description: 'Geographic latitude coordinate for the location',
		hint: 'Enter decimal degrees (e.g., 40.7128 for New York City). Range: -90 to 90',
		placeholder: '40.7128',
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: 0,
		description: 'Geographic longitude coordinate for the location',
		hint: 'Enter decimal degrees (e.g., -74.0060 for New York City). Range: -180 to 180',
		placeholder: '-74.0060',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendLocation'],
			},
		},
		default: '',
		description: 'Optional human-readable address for the location',
		hint: 'Provide a descriptive address or place name to help identify the location',
		placeholder: 'Times Square, New York, NY',
	},
	// Message management fields (tool-compatible)
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendReaction', 'editMessage', 'deleteMessage', 'deleteForMe', 'starMessage', 'markAsRead'],
			},
		},
		default: '',
		description: 'Unique identifier of the WhatsApp message to interact with',
		hint: 'Get message ID from previous WhatsApp operations or webhook events',
		placeholder: 'BAE5F2C9A4B1E3D2F7G8H9I0',
	},
	{
		displayName: 'Sender ID',
		name: 'senderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendReaction', 'deleteMessage', 'deleteForMe', 'starMessage', 'markAsRead'],
			},
		},
		default: '',
		description: 'WhatsApp JID of the user that originally sent the message',
		hint: 'Format: phone number with suffix (e.g., 1234567890@s.whatsapp.net).',
	},
	{
		displayName: 'Emoji',
		name: 'emoji',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendReaction'],
			},
		},
		default: '',
		placeholder: '👍',
		description: 'Single emoji character to use as reaction',
		hint: 'Use any standard emoji. Examples: 👍, ❤️, 😂, 😮, 😢, 🙏',
	},
	{
		displayName: 'Receipt Type',
		name: 'receiptType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['markAsRead'],
			},
		},
		options: [
			{ name: 'Delivered', value: 'delivered' },
			{ name: 'Sender', value: 'sender' },
			{ name: 'Read', value: 'read' },
			{ name: 'Played', value: 'played' },
		],
		default: 'read',
		description: 'Receipt status to mark for the message',
		hint: 'Matches API enum delivered | sender | read | played.',
	},
	{
		displayName: 'New Message',
		name: 'newMessage',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['editMessage'],
			},
		},
		default: '',
		description: 'Updated text content for the message',
		hint: 'Provide the new message text. Only text messages can be edited in WhatsApp.',
	},
	{
		displayName: 'If From Me',
		name: 'ifFromMe',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['deleteForMe'],
			},
		},
		default: true,
		description: 'Whether the message being deleted was sent by the current account',
	},
	{
		displayName: 'Deletion Timestamp',
		name: 'deleteTimestamp',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['deleteForMe'],
			},
		},
		default: '',
		description: 'ISO 8601 timestamp representing the original message time',
		hint: 'Matches the API "Time" field (e.g., 2024-06-02T18:30:00Z).',
	},
	// Advanced options
	{
		...createAdvancedOptions(),
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendText', 'sendLink', 'sendImage', 'sendVideo', 'sendAudio', 'sendVoice', 'sendDocument', 'sendContact', 'sendLocation', 'sendSticker'],
			},
		},
	},
];
