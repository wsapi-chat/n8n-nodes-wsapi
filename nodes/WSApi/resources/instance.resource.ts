import { INodeProperties } from 'n8n-workflow';

export const instanceOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['instance'],
		},
	},
	options: [
		{
			name: 'Get Settings',
			value: 'getSettings',
			description: 'Get instance settings',
			action: 'Get instance settings',
		},
		{
			name: 'Update Settings',
			value: 'updateSettings',
			description: 'Update instance settings',
			action: 'Update instance settings',
		},
		{
			name: 'Update API Key',
			value: 'updateApiKey',
			description: 'Update instance API key',
			action: 'Update instance API key',
		},
		{
			name: 'Restart',
			value: 'restart',
			description: 'Restart instance',
			action: 'Restart instance',
		},
	],
	default: 'getSettings',
};

export const instanceFields: INodeProperties[] = [
	// Update Settings fields (tool-compatible)
	{
		displayName: 'Settings',
		name: 'settings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		description: 'Instance configuration settings to update',
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descriptive text about the instance purpose',
				placeholder: 'Customer support WhatsApp instance',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Display name for the WhatsApp instance',
				placeholder: 'My WhatsApp',
			},
			{
				displayName: 'Pull Mode',
				name: 'pullMode',
				type: 'boolean',
				default: false,
				description: 'Whether to enable pull mode to fetch events instead of receiving webhooks',
			},
			{
				displayName: 'Webhook Auth Header',
				name: 'webhookAuthHeader',
				type: 'string',
				default: '',
				description: 'HTTP header name for webhook authentication',
				placeholder: 'Authorization',
			},
			{
				displayName: 'Webhook Auth Value',
				name: 'webhookAuthValue',
				type: 'string',
				default: '',
				description: 'Authentication value to send with webhook requests',
				placeholder: 'Bearer your-secret-token',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				description: 'HTTPS endpoint to receive WhatsApp events and messages',
				placeholder: 'https://your-domain.com/webhook/whatsapp',
			},
		],
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['updateSettings'],
			},
		},
	},
];
