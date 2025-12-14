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
			name: 'Create Group',
			value: 'create',
			description: 'Create a new WhatsApp group',
			action: 'Create new group',
		},
		{
			name: 'Get Group',
			value: 'get',
			description: 'Get group information',
			action: 'Get group information',
		},
		{
			name: 'Get Invite Info',
			value: 'getInviteInfo',
			description: 'Get group information from invite code',
			action: 'Get group invite information',
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
			description: 'List pending join requests',
			action: 'Get group invite requests',
		},
		{
			name: 'Get Many',
			value: 'getAll',
			description: 'List many WhatsApp groups',
			action: 'List all groups',
		},
		{
			name: 'Handle Join Requests',
			value: 'handleJoinRequests',
			description: 'Approve or reject pending join requests',
			action: 'Handle join requests',
		},
		{
			name: 'Join with Invite',
			value: 'joinWithInvite',
			description: 'Join group using invite message details',
			action: 'Join group with invite',
		},
		{
			name: 'Join with Link',
			value: 'joinWithLink',
			description: 'Join group using invite link code',
			action: 'Join group with link',
		},
		{
			name: 'Leave Group',
			value: 'leave',
			description: 'Leave a WhatsApp group',
			action: 'Leave group',
		},
		{
			name: 'Set Announce Mode',
			value: 'setAnnounce',
			description: 'Set whether only admins can send messages',
			action: 'Set announce mode',
		},
		{
			name: 'Set Description',
			value: 'setDescription',
			description: 'Update group description',
			action: 'Set group description',
		},
		{
			name: 'Set Join Approval',
			value: 'setJoinApproval',
			description: 'Set whether join requests require admin approval',
			action: 'Set join approval',
		},
		{
			name: 'Set Locked Mode',
			value: 'setLocked',
			description: 'Set whether only admins can edit group info',
			action: 'Set locked mode',
		},
		{
			name: 'Set Member Add Mode',
			value: 'setMemberAddMode',
			description: 'Set who can add new members',
			action: 'Set member add mode',
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
			name: 'Update Participants',
			value: 'updateParticipants',
			description: 'Add, remove, promote or demote group participants',
			action: 'Update group participants',
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
				operation: ['get', 'leave', 'setDescription', 'setName', 'setPicture', 'getInviteLink', 'getInviteRequests', 'updateParticipants', 'setAnnounce', 'setLocked', 'setJoinApproval', 'setMemberAddMode', 'joinWithInvite', 'handleJoinRequests'],
			},
		},
	},
	// Cache options for Get Group (exclude invite endpoints)
	{
		displayName: 'Cache Results',
		name: 'cacheResults',
		type: 'boolean',
		default: false,
		description: 'Whether to cache the result for repeated requests with the same group ID',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Cache TTL (Sec)',
		name: 'cacheTtl',
		type: 'number',
		default: 300,
		description: 'Time-to-live for the cache entry in seconds',
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['get'],
				cacheResults: [true],
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
				operation: ['create', 'updateParticipants', 'handleJoinRequests'],
			},
		},
	},
	// Participant Action field
	{
		displayName: 'Action',
		name: 'participantAction',
		type: 'options',
		required: true,
		default: 'add',
		description: 'Action to perform on the participants',
		options: [
			{ name: 'Add', value: 'add', description: 'Add participants to the group' },
			{ name: 'Remove', value: 'remove', description: 'Remove participants from the group' },
			{ name: 'Promote', value: 'promote', description: 'Promote participants to admin' },
			{ name: 'Demote', value: 'demote', description: 'Demote admins to regular members' },
		],
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['updateParticipants'],
			},
		},
	},
	// Request Action field
	{
		displayName: 'Action',
		name: 'requestAction',
		type: 'options',
		required: true,
		default: 'approve',
		description: 'Action to perform on the join requests',
		options: [
			{ name: 'Approve', value: 'approve', description: 'Approve join requests' },
			{ name: 'Reject', value: 'reject', description: 'Reject join requests' },
		],
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['handleJoinRequests'],
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
		description: 'WhatsApp group invite code',
		hint: 'Extract the code from a WhatsApp group invite link (the part after "https://chat.whatsapp.com/")',
		placeholder: 'AbCdEfGhIjKlMnOpQrStUvWxYz',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['getInviteInfo', 'joinWithLink', 'joinWithInvite'],
			},
		},
	},
	// Reset Link field
	{
		displayName: 'Reset Link',
		name: 'resetLink',
		type: 'boolean',
		default: false,
		description: 'Whether to revoke the current invite link and generate a new one',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['getInviteLink'],
			},
		},
	},
	// Announce Mode field
	{
		displayName: 'Announce Mode',
		name: 'announce',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether only admins can send messages to the group',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setAnnounce'],
			},
		},
	},
	// Locked Mode field
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether only admins can edit group info (name, description, picture)',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setLocked'],
			},
		},
	},
	// Join Approval field
	{
		displayName: 'Require Approval',
		name: 'joinApproval',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether join requests require admin approval',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setJoinApproval'],
			},
		},
	},
	// Only Admins Can Add Members field
	{
		displayName: 'Only Admins Can Add',
		name: 'onlyAdmins',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether only admins can add new members (false = all members can add)',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['setMemberAddMode'],
			},
		},
	},
	// Inviter ID field (for joinWithInvite)
	{
		displayName: 'Inviter ID',
		name: 'inviterId',
		type: 'string',
		required: true,
		default: '',
		description: 'The JID of the user who sent the invite',
		placeholder: '1234567890@s.whatsapp.net',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['joinWithInvite'],
			},
		},
	},
	// Expiration field (for joinWithInvite)
	{
		displayName: 'Expiration',
		name: 'expiration',
		type: 'number',
		default: 0,
		description: 'The invite expiration timestamp in Unix seconds (optional)',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['joinWithInvite'],
			},
		},
	},
];
