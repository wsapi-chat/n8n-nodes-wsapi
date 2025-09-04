import { INodeProperties } from 'n8n-workflow';

export const callsOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['calls'],
		},
	},
	options: [
		{
			name: 'Reject Call',
			value: 'reject',
			description: 'Reject an incoming call',
			action: 'Reject incoming call',
		},
	],
	default: 'reject',
};

export const callsFields: INodeProperties[] = [
	// Call ID field (tool-compatible)
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		default: '',
		description: 'Unique identifier of the WhatsApp call to reject',
		hint: 'Get call ID from WhatsApp call events or webhook notifications',
		placeholder: 'ABEiGUJDHF9HGI8K1L2M3N4O5P6Q7R8S',
		displayOptions: {
			show: {
				resource: ['calls'],
				operation: ['reject'],
			},
		},
	},
	// Caller ID field (tool-compatible)
	{
		displayName: 'Caller ID',
		name: 'callerId',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp ID (JID) of the person initiating the call',
		hint: 'Format: phone number + @s.whatsapp.net (e.g., 1234567890@s.whatsapp.net)',
		placeholder: '1234567890@s.whatsapp.net',
		displayOptions: {
			show: {
				resource: ['calls'],
				operation: ['reject'],
			},
		},
	},
];