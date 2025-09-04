import { INodeProperties } from 'n8n-workflow';

export const sessionOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['session'],
		},
	},
	options: [
		{
			name: 'Get QR Code Image',
			value: 'getQrImage',
			description: 'Get QR code image for WhatsApp login',
			action: 'Get QR code image for login',
		},
		{
			name: 'Get QR Code String',
			value: 'getQrCode',
			description: 'Get QR code string for WhatsApp login',
			action: 'Get QR code string for login',
		},
		{
			name: 'Get Login Code',
			value: 'getLoginCode',
			description: 'Get login code for WhatsApp',
			action: 'Get login code for phone',
		},
		{
			name: 'Get Status',
			value: 'getStatus',
			description: 'Get WhatsApp session status',
			action: 'Get session status',
		},
		{
			name: 'Logout',
			value: 'logout',
			description: 'Logout from WhatsApp',
			action: 'Logout from WhatsApp',
		},
	],
	default: 'getStatus',
};

export const sessionFields: INodeProperties[] = [
	// Phone Number field (tool-compatible)
	{
		displayName: 'Phone Number',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number to receive WhatsApp login verification code',
		hint: 'Include country code without + symbol (e.g., 1234567890 for a US number)',
		placeholder: '1234567890',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['getLoginCode'],
			},
		},
	},
];