export interface WSApiMessageBody {
	to: string;
	text?: string;
	message?: string;
	url?: string;
	image?: string;
	video?: string;
	audio?: string;
	document?: string;
	caption?: string;
	contactName?: string;
	contactPhone?: string;
	latitude?: number;
	longitude?: number;
	address?: string;
	messageId?: string;
	emoji?: string;
	newMessage?: string;
	starred?: boolean;
	mentions?: string[];
	replyTo?: string;
	isForwarded?: boolean;
	viewOnce?: boolean;
	senderId?: string;
	reaction?: string;
	receiptType?: string;
	isFromMe?: boolean;
	Time?: string;
}

export interface WSApiChatBody {
	chatId?: string;
	presence?: string;
	muted?: boolean;
	pinned?: boolean;
	archived?: boolean;
	ephemeralExpiration?: number;
}

export interface WSApiMediaBody {
	id: string;
}

export interface WSApiResponse {
	success: boolean;
	[key: string]: any;
}
