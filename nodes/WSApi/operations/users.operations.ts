import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';
import { cacheRead, cacheWrite, makeCacheKey } from '../helpers/utils';

export async function executeUsersOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

		switch (operation) {
			case 'get':
				const phone = this.getNodeParameter('phone', i) as string;
				const cacheResults = this.getNodeParameter('cacheResults', i, false) as boolean;
				const cacheTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

				if (cacheResults) {
					const credentials = await this.getCredentials('WSApiApi');
					const instanceId = credentials.instanceId as string;
					const baseURL = credentials.baseUrl as string;
					const key = makeCacheKey(['users','get',phone,instanceId,baseURL]);
					const cached = cacheRead(this, key);
					if (cached !== undefined) return cached as IDataObject;
				}

				const resGet = await this.helpers.requestWithAuthentication.call(
					this,
					'WSApiApi',
					{
						method: 'GET',
						url: `/users/${phone}`,
						baseURL,
						json: true,
					},
				);

				if (cacheResults) {
					const credentials = await this.getCredentials('WSApiApi');
					const instanceId = credentials.instanceId as string;
					const baseURL = credentials.baseUrl as string;
					const key = makeCacheKey(['users','get',phone,instanceId,baseURL]);
					cacheWrite(this, key, resGet, cacheTtl);
				}
				return resGet;

		default:
			throw new Error(`Unknown users operation: ${operation}`);
	}
}
