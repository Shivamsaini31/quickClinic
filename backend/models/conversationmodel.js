const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Message',
				default: [],
			},
		],lastMessage: {
			type: String,
			
			default: null, // Default to null if there's no last message yet
		  },
	},
	
	{ timestamps: true }
);


module.exports  = mongoose.model('Conversation', conversationSchema);

