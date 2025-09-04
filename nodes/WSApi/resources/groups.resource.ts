import { INodeProperties } from 'n8n-workflow';

export const groupsOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['groups'],
		},
	},
	options: [
		{
			name: 'List All',
			value: 'getAll',
			description: 'List all WhatsApp groups',
			action: 'List all groups',
		},
		{
			name: 'Get Group',
			value: 'get',
			description: 'Get group information',
			action: 'Get group information',
		},
		{
			name: 'Create Group',
			value: 'create',
			description: 'Create a new WhatsApp group',
			action: 'Create new group',
		},
		{
			name: 'Delete Group',
			value: 'delete',
			description: 'Delete group',
			action: 'Delete group',
		},
		{
			name: 'Set Description',
			value: 'setDescription',
			description: 'Update group description',
			action: 'Set group description',
		},
		{
			name: 'Set Name',
			value: 'setName',
			description: 'Update group name',
			action: 'Set group name',
		},
		{
			name: 'Set Picture',
			value: 'setPicture',
			description: 'Set group picture',
			action: 'Set group picture',
		},
		{
			name: 'Get Invite Link',
			value: 'getInviteLink',
			description: 'Get group invite link',
			action: 'Get group invite link',
		},
		{
			name: 'Get Invite Requests',
			value: 'getInviteRequests',
			description: 'List group invite requests',
			action: 'Get group invite requests',
		},
		{
			name: 'Update Participants',
			value: 'updateParticipants',
			description: 'Update group participants',
			action: 'Update group participants',
		},
		{
			name: 'Get Invite Info',
			value: 'getInviteInfo',
			description: 'Get group invite information',
			action: 'Get group invite information',
		},
	],
	default: 'getAll',
};

export const groupsFields: INodeProperties[] = [
	// Group ID field (tool-compatible, used by multiple operations)
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp group identifier (group ID + @g.us)',
		hint: 'Format: group ID + @g.us (e.g., 120363123456789@g.us)',
		placeholder: '120363123456789@g.us',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['get', 'delete', 'setDescription', 'setName', 'setPicture', 'getInviteLink', 'getInviteRequests', 'updateParticipants'],
			},
		},
	},
	// Group Name field (tool-compatible)
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name for the WhatsApp group',
		hint: 'Enter a descriptive name that will be visible to all group members',
		placeholder: 'Project Team Chat',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['create', 'setName'],
			},
		},
	},
	// Participants field (tool-compatible)
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'collection',
		placeholder: 'Add Participant',
		default: {},
		options: [
			{
				displayName: 'Participant Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Phone numbers of group participants (comma-separated, with country codes)',
				hint: 'Format: country code + phone number, separated by commas (e.g., 1234567890,0987654321)',
				placeholder: '1234567890,0987654321,1122334455',
			},
		],
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['create', 'updateParticipants'],
			},
		},
	},
	// Description field (tool-compatible)
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		description: 'Description text for the WhatsApp group',
		hint: 'Enter a description that explains the group\'s purpose. Visible to all members.',
		placeholder: 'This group is for project discussions and updates.',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setDescription'],
			},
		},
	},
	// Picture field (tool-compatible)
	{
		displayName: 'Picture Base64',
		name: 'pictureBase64',
		type: 'string',
		required: true,
		default: '',
		description: 'Base64 encoded image data for the group picture',
		hint: 'Provide image data in base64 format. Supported formats: JPEG, PNG. Recommended size: 640x640 pixels',
		placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setPicture'],
			},
		},
	},
	// Invite Code field (tool-compatible)
	{
		displayName: 'Invite Code',
		name: 'inviteCode',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp group invite code to get information about',
		hint: 'Extract the code from a WhatsApp group invite link (the part after "https://chat.whatsapp.com/")',
		placeholder: 'AbCdEfGhIjKlMnOpQrStUvWxYz',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['getInviteInfo'],
			},
		},
	},
];