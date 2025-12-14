import { INodeProperties } from 'n8n-workflow';

export const contactsOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['contacts'],
		},
	},
	options: [
		{
			name: 'Create Contact',
			value: 'create',
			description: 'Create a new WhatsApp contact',
			action: 'Create new contact',
		},
		{
			name: 'Get Contact',
			value: 'get',
			description: 'Get contact information',
			action: 'Get contact information',
		},
		{
			name: 'Get Many',
			value: 'getAll',
			description: 'List many WhatsApp contacts',
			action: 'List all contacts',
		},
		{
			name: 'Update Contact',
			value: 'update',
			description: 'Update contact information',
			action: 'Update contact information',
		},
	],
	default: 'getAll',
};

export const contactsFields: INodeProperties[] = [
	// Contact ID field (tool-compatible, used by multiple operations)
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp contact identifier (phone number + @s.whatsapp.net)',
		hint: 'Format: phone number with country code + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net)',
		placeholder: '1234567890@s.whatsapp.net',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['get', 'update'],
			},
		},
	},
	// Cache options for GET-like operations
	{
		displayName: 'Cache Results',
		name: 'cacheResults',
		type: 'boolean',
		default: false,
		description: 'Whether to cache the result for repeated requests with the same contact ID',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['get'],
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
				resource: ['contacts'],
				operation: ['get'],
				cacheResults: [true],
			},
		},
	},
	// Create Contact fields (tool-compatible)
	{
		displayName: 'Contact ID',
		name: 'newContactId',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp ID for the new contact being created',
		hint: 'Format: phone number with country code + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net)',
		placeholder: '1234567890@s.whatsapp.net',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['create'],
			},
		},
	},
	// Full Name field (tool-compatible)
	{
		displayName: 'Full Name',
		name: 'fullName',
		type: 'string',
		required: true,
		default: '',
		description: 'Complete name for the contact as it should appear in your contacts',
		hint: 'Enter the full display name (e.g., "John Smith" or "ABC Company")',
		placeholder: 'John Smith',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['create', 'update'],
			},
		},
	},
	// First Name field (tool-compatible)
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		description: 'First name of the contact',
		hint: 'Enter the contact\'s given name or first name',
		placeholder: 'John',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['create', 'update'],
			},
		},
	},
];
