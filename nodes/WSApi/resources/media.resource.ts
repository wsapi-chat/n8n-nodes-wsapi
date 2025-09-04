import { INodeProperties } from 'n8n-workflow';

export const mediaOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['media'],
		},
	},
	options: [
		{
			name: 'Download Media',
			value: 'downloadMedia',
			description: 'Download a media file that was received via webhooks',
			action: 'Download media file',
		},
	],
	default: 'downloadMedia',
};

export const mediaFields: INodeProperties[] = [
	// Media ID field (tool-compatible)
	{
		displayName: 'Media ID',
		name: 'mediaId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['media'],
				operation: ['downloadMedia'],
			},
		},
		default: '',
		placeholder: 'ABEiGUJJACsAAgk...',
		description: 'Unique identifier of the media file received via WhatsApp webhooks',
		hint: 'Get this ID from the media.id field in webhook events when media files are received',
	},
];