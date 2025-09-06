import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';
import { cacheRead, cacheWrite, makeCacheKey } from '../helpers/utils';

export async function executeContactsOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

		switch (operation) {
			case 'getAll':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/contacts',
					baseURL,
					json: true,
				},
			);

			case 'get':
				const contactId = this.getNodeParameter('contactId', i) as string;
				const cacheResults = this.getNodeParameter('cacheResults', i, false) as boolean;
				const cacheTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

				if (cacheResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','get',contactId,instanceId,baseURL]);
					const cached = cacheRead(this, key);
					if (cached !== undefined) return cached as IDataObject;
				}

				const resGet = await this.helpers.requestWithAuthentication.call(
					this,
					'WSApiApi',
					{
						method: 'GET',
						url: `/contacts/${contactId}`,
						baseURL,
						json: true,
					},
				);

				if (cacheResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','get',contactId,instanceId,baseURL]);
					cacheWrite(this, key, resGet, cacheTtl);
				}
				return resGet;

		case 'create':
			const newContactId = this.getNodeParameter('newContactId', i) as string;
			const createFullName = this.getNodeParameter('fullName', i) as string;
			const createFirstName = this.getNodeParameter('firstName', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/contacts',
					baseURL,
					body: {
						id: newContactId,
						fullName: createFullName,
						firstName: createFirstName,
					},
					json: true,
				},
			);
			return { success: true, message: 'Contact created successfully' };

		case 'update':
			const updateContactId = this.getNodeParameter('contactId', i) as string;
			const updateFullName = this.getNodeParameter('fullName', i) as string;
			const updateFirstName = this.getNodeParameter('firstName', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/contacts/${updateContactId}`,
					baseURL,
					body: {
						fullName: updateFullName,
						firstName: updateFirstName,
					},
					json: true,
				},
			);
			return { success: true, message: 'Contact updated successfully' };

			case 'getPicture':
				const pictureContactId = this.getNodeParameter('contactId', i) as string;
				const cachePicResults = this.getNodeParameter('cacheResults', i, false) as boolean;
				const cachePicTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

				if (cachePicResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','getPicture',pictureContactId,instanceId,baseURL]);
					const cached = cacheRead(this, key);
					if (cached !== undefined) return cached as IDataObject;
				}

				const resPic = await this.helpers.requestWithAuthentication.call(
					this,
					'WSApiApi',
					{
						method: 'GET',
						url: `/contacts/${pictureContactId}/picture`,
						baseURL,
						json: true,
					},
				);

				if (cachePicResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','getPicture',pictureContactId,instanceId,baseURL]);
					cacheWrite(this, key, resPic, cachePicTtl);
				}
				return resPic;

			case 'getBusiness':
				const businessContactId = this.getNodeParameter('contactId', i) as string;
				const cacheBizResults = this.getNodeParameter('cacheResults', i, false) as boolean;
				const cacheBizTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

				if (cacheBizResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','getBusiness',businessContactId,instanceId,baseURL]);
					const cached = cacheRead(this, key);
					if (cached !== undefined) return cached as IDataObject;
				}

				const resBiz = await this.helpers.requestWithAuthentication.call(
					this,
					'WSApiApi',
					{
						method: 'GET',
						url: `/contacts/${businessContactId}/business`,
						baseURL,
						json: true,
					},
				);

				if (cacheBizResults) {
					const instanceId = credentials.instanceId as string;
					const key = makeCacheKey(['contacts','getBusiness',businessContactId,instanceId,baseURL]);
					cacheWrite(this, key, resBiz, cacheBizTtl);
				}
				return resBiz;

		case 'updateFullName':
			const nameContactId = this.getNodeParameter('contactId', i) as string;
			const newFullName = this.getNodeParameter('fullName', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/contacts/${nameContactId}/fullName`,
					baseURL,
					body: { fullName: newFullName },
					json: true,
				},
			);
			return { success: true, message: 'Contact name updated successfully' };

		case 'subscribePresence':
			const presenceContactId = this.getNodeParameter('contactId', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: `/contacts/${presenceContactId}/presence`,
					baseURL,
					json: true,
				},
			);
			return { success: true, message: 'Successfully subscribed to presence updates' };

		default:
			throw new Error(`Unknown contacts operation: ${operation}`);
	}
}
