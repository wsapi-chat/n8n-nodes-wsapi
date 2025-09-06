import { INodeProperties } from 'n8n-workflow';

export const usersOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['users'],
		},
	},
	options: [
		{
			name: 'Get User',
			value: 'get',
			description: 'Get user information',
			action: 'Get user information',
		},
	],
	default: 'get',
};

export const usersFields: INodeProperties[] = [
	// Phone Number field (tool-compatible)
	{
		displayName: 'Phone Number',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number of the WhatsApp user to get information about',
		hint: 'Include country code without + symbol (e.g., 1234567890 for a US number)',
		placeholder: '1234567890',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['get'],
			},
		},
	},
	// Cache options for Get User
	{
		displayName: 'Cache Results',
		name: 'cacheResults',
		type: 'boolean',
		default: false,
		description: 'Cache the result for repeated requests with the same Phone Number',
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Cache TTL (sec)',
		name: 'cacheTtl',
		type: 'number',
		default: 300,
		description: 'Time-to-live for the cache entry in seconds',
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['get'],
				cacheResults: [true],
			},
		},
	},
];
