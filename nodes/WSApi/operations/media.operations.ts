import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeMediaOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
	baseURL?: string,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'downloadMedia':
			const mediaId = this.getNodeParameter('mediaId', i) as string;
			
			// Get credentials for manual authentication
			const credentials = await this.getCredentials('WSApiApi');
			const apiKey = credentials.apiKey as string;
			const instanceId = credentials.instanceId as string;

			// 1) Request raw bytes using httpRequest with manual auth to get full response
			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: '/media/download',
				baseURL: baseURL,
				qs: { id: mediaId },
				encoding: 'arraybuffer',
				json: false,
				returnFullResponse: true,
				headers: {
					'X-Api-Key': apiKey,
					'X-Instance-Id': instanceId,
				},
			}) as { body: ArrayBuffer; headers: Record<string, string> };

			// 2) Extract filename and content type from headers (as sent by Go server)
			const headers = response.headers || {};
			const contentType = headers['content-type'] || 'application/octet-stream';
			
			let fileName = `media_${mediaId}`;
			const contentDisposition = headers['content-disposition'];
			if (contentDisposition) {
				// Parse filename from Content-Disposition header: attachment; filename="filename.ext"
				const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
				if (filenameMatch && filenameMatch[1]) {
					fileName = filenameMatch[1];
				}
			}

			// 3) Convert arraybuffer to buffer and wrap as n8n binary data
			const buffer = Buffer.from(response.body);
			const binaryData = await this.helpers.prepareBinaryData(
				buffer,
				fileName,
				contentType,
			);

			// 4) Return an item that has a binary property with 'data' as the key
			return [{
				json: { success: true, mediaId, fileName, contentType, message: 'Media downloaded successfully' },
				binary: { data: binaryData },
			}];

		default:
			throw new Error(`Unknown media operation: ${operation}`);
	}
}