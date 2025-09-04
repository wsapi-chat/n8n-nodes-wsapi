import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

export async function executeGroupsOperation(
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
					url: '/groups',
					baseURL,
					json: true,
				},
			);

		case 'get':
			const groupId = this.getNodeParameter('groupId', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/groups/${groupId}`,
					baseURL,
					json: true,
				},
			);

		case 'create':
			const groupName = this.getNodeParameter('groupName', i) as string;
			const participantsData = this.getNodeParameter('participants', i) as IDataObject;
			const phoneNumbers = (participantsData.phoneNumbers as string || '').split(',').map(p => p.trim()).filter(p => p);
			
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/groups',
					baseURL,
					json: true,
					body: {
						name: groupName,
						participants: phoneNumbers,
					},
				},
			);

		case 'delete':
			const deleteGroupId = this.getNodeParameter('groupId', i) as string;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'DELETE',
					url: `/groups/${deleteGroupId}`,
					baseURL,
					json: true,
				},
			);
			return { success: true, message: 'Group deleted successfully' };

		case 'setDescription':
			const descGroupId = this.getNodeParameter('groupId', i) as string;
			const description = this.getNodeParameter('description', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${descGroupId}/description`,
					baseURL,
					json: true,
					body: { description },
				},
			);
			return { success: true, message: 'Group description updated successfully' };

		case 'setName':
			const nameGroupId = this.getNodeParameter('groupId', i) as string;
			const newName = this.getNodeParameter('groupName', i) as string;
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${nameGroupId}/name`,
					baseURL,
					json: true,
					body: { name: newName },
				},
			);
			return { success: true, message: 'Group name updated successfully' };

		case 'setPicture':
			const pictureGroupId = this.getNodeParameter('groupId', i) as string;
			const pictureBase64 = this.getNodeParameter('pictureBase64', i) as string;
			
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: `/groups/${pictureGroupId}/picture`,
					baseURL,
					json: true,
					body: { pictureBase64 },
				},
			);

		case 'getInviteLink':
			const linkGroupId = this.getNodeParameter('groupId', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/groups/${linkGroupId}/invite-link`,
					baseURL,
					json: true,
				},
			);

		case 'getInviteRequests':
			const requestsGroupId = this.getNodeParameter('groupId', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/groups/${requestsGroupId}/requests`,
					baseURL,
					json: true,
				},
			);

		case 'updateParticipants':
			const participantsGroupId = this.getNodeParameter('groupId', i) as string;
			const updateParticipantsData = this.getNodeParameter('participants', i) as IDataObject;
			const updatePhoneNumbers = (updateParticipantsData.phoneNumbers as string || '').split(',').map(p => p.trim()).filter(p => p);
			
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${participantsGroupId}/participants`,
					baseURL,
					json: true,
					body: { participants: updatePhoneNumbers },
				},
			);
			return { success: true, message: 'Group participants updated successfully' };

		case 'getInviteInfo':
			const inviteCode = this.getNodeParameter('inviteCode', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/group-invites/${inviteCode}`,
					baseURL,
					json: true,
				},
			);

		default:
			throw new Error(`Unknown groups operation: ${operation}`);
	}
}