import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WSApiApi implements ICredentialType {
	name = 'WSApiApi';
	displayName = 'WSAPI API';
	documentationUrl = 'https://docs.wsapi.chat';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your WSAPI API key. You can find this in your WSAPI dashboard.',
		},
		{
			displayName: 'Instance ID',
			name: 'instanceId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your WhatsApp instance ID. This identifies which WhatsApp account to use.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.wsapi.chat',
			required: true,
			description: 'The base URL for the WSAPI service. Use default unless you have a custom deployment.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
				'X-Instance-Id': '={{$credentials.instanceId}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/session/status',
			method: 'GET',
		},
	};
}