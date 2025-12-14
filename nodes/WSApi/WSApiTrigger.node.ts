import {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeConnectionType,
} from 'n8n-workflow';

export class WSApiTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WSAPI Trigger',
		name: 'wsApiTrigger',
		icon: 'file:wsapi.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Trigger on WSAPI webhook events (messages, chats, calls, users, etc.)',
		defaults: {
			name: 'WSAPI Trigger',
		},
		inputs: [],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'WSApiApi',
				required: false
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'On Any Event',
						value: 'all',
						description: 'Trigger on all event types',
						action: 'Trigger on all events',
					},
					{
						name: 'On Call Event',
						value: 'call',
						description: 'Trigger on call events (offer, accept, terminate)',
						action: 'Trigger on call events',
					},
					{
						name: 'On Chat Event',
						value: 'chat',
						description: 'Trigger on chat events (settings, presence, picture, status)',
						action: 'Trigger on chat events',
					},
					{
						name: 'On Contact Event',
						value: 'contact',
						description: 'Trigger on contact events',
						action: 'Trigger on contact events',
					},
					{
						name: 'On Message Event',
						value: 'message',
						description: 'Trigger on message events (message, read, delete, star, etc.)',
						action: 'Trigger on message events',
					},
					{
						name: 'On Session Event',
						value: 'session',
						description: 'Trigger on session events (login, logout, authentication, sync)',
						action: 'Trigger on session events',
					},
					{
						name: 'On User Event',
						value: 'user',
						description: 'Trigger on user events (presence updates)',
						action: 'Trigger on user events',
					},
				],
				default: 'message',
			},
			{
				displayName: 'Event Types',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Call Accept',
						value: 'call_accept',
						description: 'Call was accepted',
					},
					{
						name: 'Call Offer',
						value: 'call_offer',
						description: 'Incoming call offer received',
					},
					{
						name: 'Call Terminate',
						value: 'call_terminate',
						description: 'Call was terminated',
					},
					{
						name: 'Chat Picture',
						value: 'chat_picture',
						description: 'Chat profile picture updated',
					},
					{
						name: 'Chat Presence',
						value: 'chat_presence',
						description: 'Chat presence updated (typing, recording, paused)',
					},
					{
						name: 'Chat Push Name',
						value: 'chat_push_name',
						description: 'Chat display name updated',
					},
					{
						name: 'Chat Setting',
						value: 'chat_setting',
						description: 'Chat settings changed (mute, pin, archive, ephemeral)',
					},
					{
						name: 'Chat Status',
						value: 'chat_status',
						description: 'Chat status message updated',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Contact information updated',
					},
					{
						name: 'Group',
						value: 'group',
						description: 'Group information updated',
					},
					{
						name: 'Initial Sync Finished',
						value: 'initial_sync_finished',
						description: 'Initial sync finished after login',
					},
					{
						name: 'Logged In',
						value: 'logged_in',
						description: 'User successfully logged in',
					},
					{
						name: 'Logged Out',
						value: 'logged_out',
						description: 'User logged out',
					},
					{
						name: 'Login Error',
						value: 'logged_error',
						description: 'Error during login process',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'New message received (text, media, reaction, contact, etc.)',
					},
					{
						name: 'Message Deleted',
						value: 'message_delete',
						description: 'Message was deleted',
					},
					{
						name: 'Message History Sync',
						value: 'message_history_sync',
						description: 'Initial message history sync during pairing',
					},
					{
						name: 'Message Read',
						value: 'message_read',
						description: 'Message read receipt received',
					},
					{
						name: 'Message Starred',
						value: 'message_star',
						description: 'Message was starred/unstarred',
					},
					{
						name: 'User Presence',
						value: 'user_presence',
						description: 'User online presence updated (available/unavailable)',
					},
				],
				default: ['message'],
				description: 'Select which event types to listen for',
				displayOptions: {
					show: {
						operation: ['all'],
					},
				},
			},
			{
				displayName: 'Session Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Initial Sync Finished',
						value: 'initial_sync_finished',
						description: 'Initial sync finished after login',
					},
					{
						name: 'Login Error',
						value: 'logged_error',
						description: 'Error during login process',
					},
					{
						name: 'Logged In',
						value: 'logged_in',
						description: 'User successfully logged in',
					},
					{
						name: 'Logged Out',
						value: 'logged_out',
						description: 'User logged out',
					},
				],
				default: ['logged_in'],
				description: 'Select which session events to listen for',
				displayOptions: {
					show: {
						operation: ['session'],
					},
				},
			},
			{
				displayName: 'Message Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Message',
						value: 'message',
						description: 'New message received (text, media, reaction, contact, etc.)',
					},
					{
						name: 'Message Deleted',
						value: 'message_delete',
						description: 'Message was deleted',
					},
					{
						name: 'Message History Sync',
						value: 'message_history_sync',
						description: 'Initial message history sync during pairing',
					},
					{
						name: 'Message Read',
						value: 'message_read',
						description: 'Message read receipt received',
					},
					{
						name: 'Message Starred',
						value: 'message_star',
						description: 'Message was starred/unstarred',
					},
				],
				default: ['message'],
				description: 'Select which message events to listen for',
				displayOptions: {
					show: {
						operation: ['message'],
					},
				},
			},
			{
				displayName: 'Chat Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Chat Picture',
						value: 'chat_picture',
						description: 'Chat profile picture updated',
					},
					{
						name: 'Chat Presence',
						value: 'chat_presence',
						description: 'Chat presence updated (typing, recording, paused)',
					},
					{
						name: 'Chat Push Name',
						value: 'chat_push_name',
						description: 'Chat display name updated',
					},
					{
						name: 'Chat Setting',
						value: 'chat_setting',
						description: 'Chat settings changed (mute, pin, archive, ephemeral)',
					},
					{
						name: 'Chat Status',
						value: 'chat_status',
						description: 'Chat status message updated',
					},
				],
				default: ['chat_setting'],
				description: 'Select which chat events to listen for',
				displayOptions: {
					show: {
						operation: ['chat'],
					},
				},
			},
			{
				displayName: 'Call Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Call Accept',
						value: 'call_accept',
						description: 'Call was accepted',
					},
					{
						name: 'Call Offer',
						value: 'call_offer',
						description: 'Incoming call offer received',
					},
					{
						name: 'Call Terminate',
						value: 'call_terminate',
						description: 'Call was terminated',
					},
				],
				default: ['call_offer'],
				description: 'Select which call events to listen for',
				displayOptions: {
					show: {
						operation: ['call'],
					},
				},
			},
			{
				displayName: 'User Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'User Presence',
						value: 'user_presence',
						description: 'User online presence updated (available/unavailable)',
					},
				],
				default: ['user_presence'],
				description: 'Select which user events to listen for',
				displayOptions: {
					show: {
						operation: ['user'],
					},
				},
			},
			{
				displayName: 'Contact & Group Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Contact',
						value: 'contact',
						description: 'Contact information updated',
					},
					{
						name: 'Group',
						value: 'group',
						description: 'Group information updated',
					},
				],
				default: ['contact'],
				description: 'Select which contact and group events to listen for',
				displayOptions: {
					show: {
						operation: ['contact'],
					},
				},
			},
			{
				displayName: 'Auto-Download Media',
				name: 'autoDownloadMedia',
				type: 'boolean',
				default: false,
				description: 'Whether to automatically download media files when message events contain media',
				displayOptions: {
					show: {
						operation: ['all', 'message'],
						events: ['message'],
					},
				},
			},
			{
				displayName: 'Parse Event Data',
				name: 'parseEventData',
				type: 'boolean',
				default: true,
				description: 'Whether to parse event data based on the event type for easier access to fields',
			},
			{
				displayName: 'Include Raw Event',
				name: 'includeRawEvent',
				type: 'boolean',
				default: false,
				description: 'Whether to include the original webhook payload in the output',
			},
			{
				displayName: 'Webhook Authentication',
				name: 'enableAuth',
				type: 'boolean',
				default: false,
				description: 'Whether to enable custom header authentication for incoming webhooks',
			},
			{
				displayName: 'Auth Header Name',
				name: 'authHeaderName',
				type: 'string',
				required: true,
				default: 'X-Webhook-Auth',
				description: 'Custom header name for webhook authentication',
				displayOptions: {
					show: {
						enableAuth: [true],
					},
				},
			},
			{
				displayName: 'Auth Header Value',
				name: 'authHeaderValue',
				type: 'string',
				required: true,
				default: '',
				description: 'Expected value for the authentication header',
				displayOptions: {
					show: {
						enableAuth: [true],
					},
				},
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];
		const autoDownloadMedia = this.getNodeParameter('autoDownloadMedia') as boolean;
		const parseEventData = this.getNodeParameter('parseEventData') as boolean;
		const includeRawEvent = this.getNodeParameter('includeRawEvent') as boolean;
		const enableAuth = this.getNodeParameter('enableAuth') as boolean;
		const responseMode = this.getNodeParameter('responseMode', 'lastNode') as string;

		// Validate webhook authentication if enabled
		if (enableAuth) {
			const authHeaderName = this.getNodeParameter('authHeaderName') as string;
			const authHeaderValue = this.getNodeParameter('authHeaderValue') as string;
			const headers = this.getHeaderData();

			// Check if the auth header exists and matches the expected value
			const receivedAuthValue = headers[authHeaderName.toLowerCase()] || headers[authHeaderName];

			if (!receivedAuthValue || receivedAuthValue !== authHeaderValue) {
				return {
					webhookResponse: {
						status: 401,
						body: {
							error: 'Unauthorized',
							message: 'Invalid or missing authentication header',
						},
					},
				};
			}
		}

		// Validate webhook structure
		if (!body.eventType || !body.eventData) {
			return {
				webhookResponse: {
					status: 400,
					body: {
						error: 'Bad Request',
						message: 'Invalid webhook payload. Expected format: { eventType: string, eventData: object }',
						received: body,
					},
				},
			};
		}

		const eventType = body.eventType as string;

		// Filter by selected event types
		if (!events.includes(eventType)) {
			return {
				webhookResponse: {
					status: 200,
					body: {
						message: 'Event type not subscribed',
						eventType,
						subscribedEvents: events,
					},
				},
			};
		}

		// Build output data
		let outputData: IDataObject = {
			instanceId: body.instanceId,
			receivedAt: body.receivedAt,
			eventType: body.eventType,
		};

		if (parseEventData) {
			// Parse eventData based on event type
			const eventData = body.eventData as IDataObject;
			outputData = { ...outputData, ...eventData };
		} else {
			outputData.eventData = body.eventData;
		}

		if (includeRawEvent) {
			outputData.rawEvent = body;
		}

		// Handle media auto-download - prepare binary data if enabled
		let binaryData: any = undefined;
		if (autoDownloadMedia && eventType === 'message') {
			const eventData = body.eventData as IDataObject;

			if (eventData.type === 'media' && eventData.media) {
				const media = eventData.media as IDataObject;
				const mediaId = media.id as string;

				if (mediaId) {
					try {
						// Get credentials for media download
						const credentials = await this.getCredentials('WSApiApi');
						const baseURL = credentials.baseUrl as string;
						const apiKey = credentials.apiKey as string;
						const instanceId = credentials.instanceId as string;

						// Download the media file with full response to get headers
						// Note: Using httpRequest here instead of requestWithAuthentication because we need returnFullResponse
						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: '/media/download',
							baseURL: baseURL,
							qs: { id: mediaId },
							encoding: 'arraybuffer',
							json: false,
							returnFullResponse: true,
							headers: {
								'X-Api-Key': apiKey,
								'X-Instance-Id': instanceId,
							},
						}) as { body: ArrayBuffer; headers: Record<string, string> };

						// Extract filename and content type from headers
						const headers = response.headers || {};
						const contentType = headers['content-type'] || 'application/octet-stream';

						let fileName = `media_${mediaId}`;
						const contentDisposition = headers['content-disposition'];
						if (contentDisposition) {
							const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
							if (filenameMatch && filenameMatch[1]) {
								fileName = filenameMatch[1];
							}
						}

						// Convert to buffer and prepare binary data
						const buffer = Buffer.from(response.body);
						const preparedBinaryData = await this.helpers.prepareBinaryData(
							buffer,
							fileName,
							contentType,
						);

						// Set binary data for output
						binaryData = { data: preparedBinaryData };

						// Add download metadata to the media object (not the binary data)
						if (parseEventData) {
							const outputMedia = outputData.media as IDataObject;
							if (outputMedia) {
								outputMedia.downloadedAt = new Date().toISOString();
								outputMedia.autoDownloaded = true;
							}
						} else {
							const eventDataMedia = (outputData.eventData as IDataObject).media as IDataObject;
							if (eventDataMedia) {
								eventDataMedia.downloadedAt = new Date().toISOString();
								eventDataMedia.autoDownloaded = true;
							}
						}

					} catch (error) {
						// If download fails, add error info to the media object
						if (parseEventData) {
							const outputMedia = outputData.media as IDataObject;
							if (outputMedia) {
								outputMedia.downloadError = `Failed to download media: ${(error as Error).message}`;
							}
						} else {
							const eventDataMedia = (outputData.eventData as IDataObject).media as IDataObject;
							if (eventDataMedia) {
								eventDataMedia.downloadError = `Failed to download media: ${(error as Error).message}`;
							}
						}
					}
				}
			}
		}

		return {
			workflowData: [
				[
					{
						json: outputData,
						...(binaryData && { binary: binaryData }),
					},
				],
			],
		};
	}

	// Required methods for webhook lifecycle management
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Since WSAPI webhooks are managed externally, we assume they exist
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// WSAPI webhooks are configured in the WSAPI dashboard
				// No programmatic creation needed
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// WSAPI webhooks are managed externally
				// No programmatic deletion needed
				return true;
			},
		},
	};
}
