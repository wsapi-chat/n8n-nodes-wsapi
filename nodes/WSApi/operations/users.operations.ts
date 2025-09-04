import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

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
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/users/${phone}`,
					baseURL,
					json: true,
				},
			);

		default:
			throw new Error(`Unknown users operation: ${operation}`);
	}
}