import { INodeProperties } from 'n8n-workflow';

export function createAdvancedOptions(): INodeProperties {
	return {
		displayName: 'Advanced Options',
		name: 'advancedOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Mentions',
				name: 'mentions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of phone numbers to mention (without @)',
			},
			{
				displayName: 'Reply To Message ID',
				name: 'replyTo',
				type: 'string',
				default: '',
				description: 'ID of the message to reply to',
			},
			{
				displayName: 'Is Forwarded',
				name: 'isForwarded',
				type: 'boolean',
				default: false,
				description: 'Whether this message is forwarded',
			},
			{
				displayName: 'View Once',
				name: 'viewOnce',
				type: 'boolean',
				default: false,
				description: 'Whether the message should disappear after being viewed (media only)',
				displayOptions: {
					show: {
						'/resource': ['message'],
						'/operation': ['sendImage', 'sendVideo'],
					},
				},
			},
		],
	};
}

export function parseAdvancedOptions(advancedOptions: any, body: any): void {
	if (advancedOptions.mentions) {
		body.mentions = advancedOptions.mentions.split(',').map((m: string) => m.trim());
	}
	if (advancedOptions.replyTo) body.replyTo = advancedOptions.replyTo;
	if (advancedOptions.isForwarded) body.isForwarded = advancedOptions.isForwarded;
	if (advancedOptions.viewOnce) body.viewOnce = advancedOptions.viewOnce;
}