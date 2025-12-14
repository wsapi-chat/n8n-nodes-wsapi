import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';
import { cacheRead, cacheWrite, makeCacheKey } from '../helpers/utils';

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
			const cacheResults = this.getNodeParameter('cacheResults', i, false) as boolean;
			const cacheTtl = this.getNodeParameter('cacheTtl', i, 300) as number;

			if (cacheResults) {
				const credentials = await this.getCredentials('WSApiApi');
				const instanceId = credentials.instanceId as string;
				const baseURL = credentials.baseUrl as string;
				const key = makeCacheKey(['groups','get',groupId,instanceId,baseURL]);
				const cached = cacheRead(this, key);
				if (cached !== undefined) return cached as IDataObject;
			}

			const resGet = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/groups/${groupId}`,
					baseURL,
					json: true,
				},
			);

			if (cacheResults) {
				const credentials = await this.getCredentials('WSApiApi');
				const instanceId = credentials.instanceId as string;
				const baseURL = credentials.baseUrl as string;
				const key = makeCacheKey(['groups','get',groupId,instanceId,baseURL]);
				cacheWrite(this, key, resGet, cacheTtl);
			}
			return resGet;

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

		case 'leave':
			const leaveGroupId = this.getNodeParameter('groupId', i) as string;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${leaveGroupId}/leave`,
					baseURL,
					json: true,
				},
			);
			return { success: true, message: 'Left group successfully' };

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
			const resetLink = this.getNodeParameter('resetLink', i, false) as boolean;
			const inviteLinkQs: IDataObject = {};
			if (resetLink) {
				inviteLinkQs.reset = '1';
			}
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/groups/${linkGroupId}/invite-link`,
					qs: inviteLinkQs,
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
			const participantAction = this.getNodeParameter('participantAction', i) as string;
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
					body: { participants: updatePhoneNumbers, action: participantAction },
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
					url: `/groups/invite/${inviteCode}`,
					baseURL,
					json: true,
				},
			);

		case 'setAnnounce':
			const announceGroupId = this.getNodeParameter('groupId', i) as string;
			const announce = this.getNodeParameter('announce', i) as boolean;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${announceGroupId}/announce`,
					baseURL,
					json: true,
					body: { announce },
				},
			);
			return { success: true, message: 'Group announce mode updated successfully' };

		case 'setLocked':
			const lockedGroupId = this.getNodeParameter('groupId', i) as string;
			const locked = this.getNodeParameter('locked', i) as boolean;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${lockedGroupId}/locked`,
					baseURL,
					json: true,
					body: { locked },
				},
			);
			return { success: true, message: 'Group locked mode updated successfully' };

		case 'setJoinApproval':
			const joinApprovalGroupId = this.getNodeParameter('groupId', i) as string;
			const joinApproval = this.getNodeParameter('joinApproval', i) as boolean;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${joinApprovalGroupId}/join-approval`,
					baseURL,
					json: true,
					body: { joinApproval },
				},
			);
			return { success: true, message: 'Group join approval mode updated successfully' };

		case 'setMemberAddMode':
			const memberAddGroupId = this.getNodeParameter('groupId', i) as string;
			const onlyAdmins = this.getNodeParameter('onlyAdmins', i) as boolean;
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${memberAddGroupId}/member-add-mode`,
					baseURL,
					json: true,
					body: { onlyAdmins },
				},
			);
			return { success: true, message: 'Group member add mode updated successfully' };

		case 'joinWithLink':
			const joinLinkCode = this.getNodeParameter('inviteCode', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/groups/join/link',
					baseURL,
					json: true,
					body: { code: joinLinkCode },
				},
			);

		case 'joinWithInvite':
			const joinInviteGroupId = this.getNodeParameter('groupId', i) as string;
			const inviterId = this.getNodeParameter('inviterId', i) as string;
			const joinInviteCode = this.getNodeParameter('inviteCode', i) as string;
			const expiration = this.getNodeParameter('expiration', i, undefined) as number | undefined;
			const joinInviteBody: IDataObject = {
				groupId: joinInviteGroupId,
				inviterId,
				code: joinInviteCode,
			};
			if (expiration !== undefined) {
				joinInviteBody.expiration = expiration;
			}
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/groups/join/invite',
					baseURL,
					json: true,
					body: joinInviteBody,
				},
			);

		case 'handleJoinRequests':
			const handleRequestsGroupId = this.getNodeParameter('groupId', i) as string;
			const requestAction = this.getNodeParameter('requestAction', i) as string;
			const requestParticipantsData = this.getNodeParameter('participants', i) as IDataObject;
			const requestParticipants = (requestParticipantsData.phoneNumbers as string || '').split(',').map(p => p.trim()).filter(p => p);
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/groups/${handleRequestsGroupId}/requests`,
					baseURL,
					json: true,
					body: { participants: requestParticipants, action: requestAction },
				},
			);
			return { success: true, message: 'Join requests handled successfully' };

		default:
			throw new Error(`Unknown groups operation: ${operation}`);
	}
}
