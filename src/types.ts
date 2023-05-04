import { Context, SessionFlavor } from "grammy";
import { ChatCompletionRequestMessage } from "openai";

export interface SessionData {
	// how many messages can the user send per day
	dailyMessages: number;
	// how many messages the user has left
	// reset to dailyMessages every 24 hours
	messagesLeft: number;
	// the last date the user sent a message
	lastDate: string;
	// the messages sent between the user and the bot
	conversation: ChatCompletionRequestMessage[];
}

export type ContextExt = Context & SessionFlavor<SessionData>;
