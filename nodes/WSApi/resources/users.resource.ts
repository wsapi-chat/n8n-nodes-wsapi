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
];