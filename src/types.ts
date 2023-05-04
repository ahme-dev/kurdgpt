import { Context, SessionFlavor } from "grammy";

export interface SessionData {
	// how many messages can the user send per day
	dailyMessages: number;
	// how many messages the user has left
	// reset to dailyMessages every 24 hours
	messagesLeft: number;
	// the last date the user sent a message
	lastDate: string;
}

export type ContextExt = Context & SessionFlavor<SessionData>;
