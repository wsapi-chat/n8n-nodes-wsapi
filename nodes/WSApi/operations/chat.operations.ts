import { IExecuteFunctions } from 'n8n-workflow';
import { WSApiResponse } from '../types';
import { cacheRead, cacheWrite, makeCacheKey } from '../helpers/utils';

export async function executeChatOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	baseURL?: string,
): Promise<WSApiResponse> {
	let responseData: WSApiResponse;

	switch (operation) {
		case 'getChats':
			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/chats',
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'getChat':
			const getChatId = this.getNodeParameter('chatId', i) as string;
			const cacheResults = this.getNodeParameter('cacheResults', i, false) as boolean;
			const cacheTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

			if (cacheResults) {
				const credentials = await this.getCredentials('WSApiApi');
				const instanceId = credentials.instanceId as string;
				const key = makeCacheKey(['chat','getChat',getChatId,instanceId,baseURL]);
				const cached = cacheRead(this, key);
				if (cached !== undefined) {
					responseData = cached as WSApiResponse;
					break;
				}
			}

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/chats/${encodeURIComponent(getChatId)}`,
					baseURL: baseURL,
					json: true,
				},
			);

			if (cacheResults) {
				const credentials = await this.getCredentials('WSApiApi');
				const instanceId = credentials.instanceId as string;
				const key = makeCacheKey(['chat','getChat',getChatId,instanceId,baseURL]);
				cacheWrite(this, key, responseData, cacheTtl);
			}
			break;

		case 'deleteChat':
			const deleteChatId = this.getNodeParameter('chatId', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'DELETE',
					url: `/chats/${encodeURIComponent(deleteChatId)}`,
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: deleteChatId };
			break;

		case 'markChatAsRead':
			const readChatId = this.getNodeParameter('chatId', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(readChatId)}/read`,
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: readChatId };
			break;

		case 'setPresence':
			const presenceChatId = this.getNodeParameter('chatId', i) as string;
			const presence = this.getNodeParameter('presence', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(presenceChatId)}/presence`,
					body: { state: presence },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: presenceChatId, presence };
			break;

		case 'muteChat':
			const muteChatId = this.getNodeParameter('chatId', i) as string;
			const muted = this.getNodeParameter('muted', i) as boolean;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(muteChatId)}/mute`,
					body: { muted },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: muteChatId, muted };
			break;

		case 'pinChat':
			const pinChatId = this.getNodeParameter('chatId', i) as string;
			const pinned = this.getNodeParameter('pinned', i) as boolean;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(pinChatId)}/pin`,
					body: { pinned },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: pinChatId, pinned };
			break;

		case 'archiveChat':
			const archiveChatId = this.getNodeParameter('chatId', i) as string;
			const archived = this.getNodeParameter('archived', i) as boolean;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(archiveChatId)}/archive`,
					body: { archived },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: archiveChatId, archived };
			break;

		case 'setEphemeral':
			const ephemeralChatId = this.getNodeParameter('chatId', i) as string;
			const ephemeralExpiration = this.getNodeParameter('ephemeralExpiration', i) as number;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/chats/${encodeURIComponent(ephemeralChatId)}/ephemeral`,
					body: { ephemeralExpiration },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: ephemeralChatId, ephemeralExpiration };
			break;

		default:
			throw new Error(`Unknown chat operation: ${operation}`);
	}

	return responseData;
}
