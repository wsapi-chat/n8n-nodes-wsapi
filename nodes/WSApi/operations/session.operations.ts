import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

export async function executeSessionOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | INodeExecutionData[]> {
	const credentials = await this.getCredentials('WSApiApi');
	const baseURL = credentials.baseUrl as string;

	switch (operation) {
		case 'getQrImage':
			// For getQrImage, we still need to get credentials for headers since it uses httpRequest
			const apiKey = credentials.apiKey as string;
			const instanceId = credentials.instanceId as string;
			const headers = {
				'X-Api-Key': apiKey,
				'X-Instance-Id': instanceId,
				'Content-Type': 'application/json',
			};
			
			// 1) Request raw bytes using arraybuffer
			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: '/session/login/qr/image',
				baseURL,
				headers,
				encoding: 'arraybuffer',
				json: false,
			});

			// 2) Set filename & mime for QR image (PNG format)
			const fileName = 'qr.png';
			const contentType = 'image/png';

			// 3) Convert arraybuffer to buffer and wrap as n8n binary data
			const buffer = Buffer.from(response as ArrayBuffer);
			const binaryData = await this.helpers.prepareBinaryData(
				buffer,
				fileName,
				contentType,
			);

			// 4) Return an item that has a binary property with 'data' as the key
			return [{
				json: { success: true, message: 'QR code image generated successfully' },
				binary: { data: binaryData },
			}];

		case 'getQrCode':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/session/login/qr/code',
					baseURL,
					json: true,
				},
			);

		case 'getLoginCode':
			const phone = this.getNodeParameter('phone', i) as string;
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: `/session/login/code/${phone}`,
					baseURL,
					json: true,
				},
			);

		case 'getStatus':
			return await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'GET',
					url: '/session/status',
					baseURL,
					json: true,
				},
			);

		case 'logout':
			await this.helpers.requestWithAuthentication.call(
				this,
				'WSApiApi',
				{
					method: 'POST',
					url: '/session/logout',
					baseURL,
					json: true,
				},
			);
			return { success: true, message: 'Logged out successfully' };

		default:
			throw new Error(`Unknown session operation: ${operation}`);
	}
}