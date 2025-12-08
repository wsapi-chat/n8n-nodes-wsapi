import { IExecuteFunctions } from 'n8n-workflow';
import { WSApiMessageBody, WSApiResponse } from '../types';
import { parseAdvancedOptions } from '../helpers/utils';

export async function executeMessageOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	baseURL?: string,
): Promise<WSApiResponse> {
	const to = this.getNodeParameter('to', i) as string;
	const advancedOptions = this.getNodeParameter('advancedOptions', i, {}) as any;

	let responseData: WSApiResponse;

		switch (operation) {
			case 'sendText':
				const message = this.getNodeParameter('message', i) as string;
				const textBody: any = { to, text: message };
				parseAdvancedOptions(advancedOptions, textBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/text',
					body: textBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendLink':
			const linkUrl = this.getNodeParameter('url', i) as string;
			const linkText = this.getNodeParameter('message', i) as string;
			const linkTitle = this.getNodeParameter('linkTitle', i, '') as string;
			const linkDescription = this.getNodeParameter('linkDescription', i, '') as string;
			const jpegThumbnail = this.getNodeParameter('jpegThumbnail', i, '') as string;
			const linkBody: any = { to, url: linkUrl, text: linkText };
			if (linkTitle) linkBody.title = linkTitle;
			if (linkDescription) linkBody.description = linkDescription;
			if (jpegThumbnail) linkBody.jpegThumbnail = jpegThumbnail;
			parseAdvancedOptions(advancedOptions, linkBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/link',
					body: linkBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendImage':
			const imageInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const imageCaption = this.getNodeParameter('caption', i, '') as string;
			const imageMimeType = this.getNodeParameter('mimeType', i, '') as string || 'image/jpeg';
			const imageBody: any = { to, mimeType: imageMimeType };
			if (imageInputType === 'base64') {
				imageBody.imageBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				imageBody.imageURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			if (imageCaption) imageBody.caption = imageCaption;
			parseAdvancedOptions(advancedOptions, imageBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/image',
					body: imageBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendVideo':
			const videoInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const videoCaption = this.getNodeParameter('caption', i, '') as string;
			const videoMimeType = this.getNodeParameter('mimeType', i, '') as string || 'video/mp4';
			const videoBody: any = { to, mimeType: videoMimeType };
			if (videoInputType === 'base64') {
				videoBody.videoBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				videoBody.videoURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			if (videoCaption) videoBody.caption = videoCaption;
			parseAdvancedOptions(advancedOptions, videoBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/video',
					body: videoBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendAudio':
			const audioInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const audioMimeType = this.getNodeParameter('mimeType', i, '') as string || 'audio/mpeg';
			const audioBody: any = { to, mimeType: audioMimeType };
			if (audioInputType === 'base64') {
				audioBody.audioBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				audioBody.audioURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			parseAdvancedOptions(advancedOptions, audioBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/audio',
					body: audioBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendVoice':
			const voiceInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const voiceBody: any = { to };
			if (voiceInputType === 'base64') {
				voiceBody.voiceBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				voiceBody.voiceURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			parseAdvancedOptions(advancedOptions, voiceBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/voice',
					body: voiceBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendDocument':
			const documentInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const documentCaption = this.getNodeParameter('caption', i, '') as string;
			const documentFileName = this.getNodeParameter('fileName', i) as string;
			const documentBody: any = { to, fileName: documentFileName };
			if (documentInputType === 'base64') {
				documentBody.documentBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				documentBody.documentURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			if (documentCaption) documentBody.caption = documentCaption;
			parseAdvancedOptions(advancedOptions, documentBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/document',
					body: documentBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendContact':
			const contactName = this.getNodeParameter('contactName', i) as string;
			const contactPhone = this.getNodeParameter('contactPhone', i) as string;
			const contactBody: any = { to, displayName: contactName, vCard: `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${contactPhone}\nEND:VCARD` };
			parseAdvancedOptions(advancedOptions, contactBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/contact',
					body: contactBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendLocation':
			const latitude = this.getNodeParameter('latitude', i) as number;
			const longitude = this.getNodeParameter('longitude', i) as number;
			const address = this.getNodeParameter('address', i, '') as string;
			const locationUrl = this.getNodeParameter('locationUrl', i, '') as string;
			const locationBody: any = { to, latitude, longitude };
			if (address) {
				locationBody.name = address;
				locationBody.address = address;
			}
			if (locationUrl) locationBody.url = locationUrl;
			parseAdvancedOptions(advancedOptions, locationBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/location',
					body: locationBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendSticker':
			const stickerInputType = this.getNodeParameter('mediaInputType', i, 'url') as string;
			const stickerMimeType = this.getNodeParameter('mimeType', i, '') as string || 'image/webp';
			const stickerIsAnimated = this.getNodeParameter('isAnimated', i, false) as boolean;
			const stickerBody: any = { to, mimeType: stickerMimeType, isAnimated: stickerIsAnimated };
			if (stickerInputType === 'base64') {
				stickerBody.stickerBase64 = this.getNodeParameter('mediaBase64', i) as string;
			} else {
				stickerBody.stickerURL = this.getNodeParameter('mediaUrl', i) as string;
			}
			parseAdvancedOptions(advancedOptions, stickerBody);

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/messages/sticker',
					body: stickerBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'sendReaction':
			const messageId = this.getNodeParameter('messageId', i) as string;
			const emoji = this.getNodeParameter('emoji', i) as string;
			const senderId = this.getNodeParameter('senderId', i) as string;
			const reactionBody: any = { to, senderId, reaction: emoji };
			// Add ephemeral expiration if set in advanced options
			if (advancedOptions.ephemeralExpiration) {
				reactionBody.ephemeralExpiration = advancedOptions.ephemeralExpiration;
			}

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: `/messages/${encodeURIComponent(messageId)}/reaction`,
					body: reactionBody,
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'editMessage':
			const editMessageId = this.getNodeParameter('messageId', i) as string;
			const newMessage = this.getNodeParameter('newMessage', i) as string;

			responseData = await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/messages/${editMessageId}/text`,
					body: { to, text: newMessage },
					baseURL: baseURL,
					json: true,
				},
			);
			break;

		case 'deleteMessage':
			const deleteMessageId = this.getNodeParameter('messageId', i) as string;
			const deleteSenderId = this.getNodeParameter('senderId', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/messages/${encodeURIComponent(deleteMessageId)}/delete`,
					body: { chatId: to, senderId: deleteSenderId },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, messageId: deleteMessageId };
			break;

		case 'deleteForMe':
			const deleteForMeMessageId = this.getNodeParameter('messageId', i) as string;
			const deleteForMeSenderId = this.getNodeParameter('senderId', i) as string;
			const ifFromMe = this.getNodeParameter('ifFromMe', i) as boolean;
			const deleteTimestamp = this.getNodeParameter('deleteTimestamp', i) as string;
			if (!deleteTimestamp) {
				throw new Error('Deletion timestamp is required to delete message for me.');
			}

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/messages/${encodeURIComponent(deleteForMeMessageId)}/delete/forme`,
					body: { chatId: to, senderId: deleteForMeSenderId, ifFromMe, Time: deleteTimestamp },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, messageId: deleteForMeMessageId };
			break;

		case 'starMessage':
			const starMessageId = this.getNodeParameter('messageId', i) as string;
			const starSenderId = this.getNodeParameter('senderId', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/messages/${encodeURIComponent(starMessageId)}/star`,
					body: { chatId: to, senderId: starSenderId },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, messageId: starMessageId };
			break;

		case 'markAsRead':
			const readMessageId = this.getNodeParameter('messageId', i) as string;
			const readSenderId = this.getNodeParameter('senderId', i) as string;
			const receiptType = this.getNodeParameter('receiptType', i) as string;

			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'PUT',
					url: `/messages/${encodeURIComponent(readMessageId)}/read`,
					body: { chatId: to, senderId: readSenderId, receiptType },
					baseURL: baseURL,
					json: true,
				},
			);
			responseData = { success: true, chatId: to, messageId: readMessageId, receiptType };
			break;

		default:
			throw new Error(`Unknown message operation: ${operation}`);
	}

	return responseData;
}
