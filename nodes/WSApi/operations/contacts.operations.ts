import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

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
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/contacts/${contactId}`,
					baseURL,
					json: true,
				},
			);

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
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/contacts/${pictureContactId}/picture`,
					baseURL,
					json: true,
				},
			);

		case 'getBusiness':
			const businessContactId = this.getNodeParameter('contactId', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/contacts/${businessContactId}/business`,
					baseURL,
					json: true,
				},
			);

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