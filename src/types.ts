import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export interface ContextExt<U extends Update = Update> extends Context<U> {
	session: {
		requestCount: number;
	};
}
