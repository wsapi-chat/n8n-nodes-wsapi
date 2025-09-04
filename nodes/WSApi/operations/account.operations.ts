import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

export async function executeAccountOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

	switch (operation) {
		case 'getInfo':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/account/info',
					baseURL,
					json: true,
				},
			);

		case 'setName':
			const name = this.getNodeParameter('name', i) as string;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/account/name',
					baseURL,
					body: { name },
					json: true,
				},
			);
			return { success: true, message: 'Account name updated successfully' };

		case 'setPicture':
			const pictureBase64 = this.getNodeParameter('pictureBase64', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/account/picture',
					baseURL,
					body: { pictureBase64 },
					json: true,
				},
			);

		case 'setPresence':
			const status = this.getNodeParameter('status', i) as string;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/account/presence',
					baseURL,
					body: { status },
					json: true,
				},
			);
			return { success: true, message: 'Account presence updated successfully' };

		case 'setStatus':
			const statusMessage = this.getNodeParameter('statusMessage', i) as string;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/account/status',
					baseURL,
					body: { status: statusMessage },
					json: true,
				},
			);
			return { success: true, message: 'Account status updated successfully' };

		default:
			throw new Error(`Unknown account operation: ${operation}`);
	}
}