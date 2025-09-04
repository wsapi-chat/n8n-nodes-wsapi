import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

export async function executeInstanceOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

	switch (operation) {
		case 'getSettings':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/instance/settings',
					baseURL,
					json: true,
				},
			);

		case 'updateSettings':
			const settings = this.getNodeParameter('settings', i) as IDataObject;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/instance/settings',
					baseURL,
					json: true,
					body: settings,
				},
			);

		case 'updateApiKey':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/instance/apikey',
					baseURL,
					json: true,
				},
			);

		case 'restart':
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: '/instance/restart',
					baseURL,
					json: true,
				},
			);
			return { success: true, message: 'Instance restarted successfully' };

		default:
			throw new Error(`Unknown instance operation: ${operation}`);
	}
}