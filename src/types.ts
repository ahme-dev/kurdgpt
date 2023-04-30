import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export interface ContextExt<U extends Update = Update> extends Context<U> {
	session: {
		// how many messages can the user send per day
		dailyMessages: number;
		// how many messages the user has left
		// reset to dailyMessages every 24 hours
		messagesLeft: number;
		// the last date the user sent a message
		lastDate: string;
	};
}
