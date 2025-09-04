import { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['account'],
		},
	},
	options: [
		{
			name: 'Get Info',
			value: 'getInfo',
			description: 'Get account information',
			action: 'Get account information',
		},
		{
			name: 'Set Name',
			value: 'setName',
			description: 'Set account name',
			action: 'Set account name',
		},
		{
			name: 'Set Picture',
			value: 'setPicture',
			description: 'Set account profile picture',
			action: 'Set account profile picture',
		},
		{
			name: 'Set Presence',
			value: 'setPresence',
			description: 'Set account presence',
			action: 'Set account presence',
		},
		{
			name: 'Set Status',
			value: 'setStatus',
			description: 'Set account status',
			action: 'Set account status',
		},
	],
	default: 'getInfo',
};

export const accountFields: INodeProperties[] = [
	// Set Name fields (tool-compatible)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'The new display name for your WhatsApp account',
		hint: 'Enter the name that will be visible to your WhatsApp contacts',
		placeholder: 'My name',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setName'],
			},
		},
	},
	// Set Picture fields (tool-compatible)
	{
		displayName: 'Picture Base64',
		name: 'pictureBase64',
		type: 'string',
		required: true,
		default: '',
		description: 'Base64 encoded image data for the profile picture',
		hint: 'Provide image data in base64 format. Supported formats: JPEG, PNG. Recommended size: 640x640 pixels',
		placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setPicture'],
			},
		},
	},
	// Set Presence fields (tool-compatible)
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Available',
				value: 'available',
			},
			{
				name: 'Unavailable',
				value: 'unavailable',
			},
		],
		default: 'available',
		description: 'Set your WhatsApp presence status visibility',
		hint: 'Available = show online status to contacts, Unavailable = appear offline',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setPresence'],
			},
		},
	},
	// Set Status fields (tool-compatible)
	{
		displayName: 'Status Message',
		name: 'statusMessage',
		type: 'string',
		required: true,
		default: '',
		description: 'Status message that appears in your WhatsApp profile',
		hint: 'Enter a status message that will be visible to your contacts. Keep it concise and professional.',
		placeholder: 'Available for business inquiries',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setStatus'],
			},
		},
	},
];