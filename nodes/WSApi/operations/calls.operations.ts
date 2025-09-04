import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

export async function executeCallsOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

	switch (operation) {
		case 'reject':
			const callId = this.getNodeParameter('callId', i) as string;
			const callerId = this.getNodeParameter('callerId', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/calls/${callId}/reject`,
					baseURL,
					body: { callerId },
					json: true,
				},
			);
			return { success: true, message: 'Call rejected successfully' };

		default:
			throw new Error(`Unknown calls operation: ${operation}`);
	}
}