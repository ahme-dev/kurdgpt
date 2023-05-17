import { NextFunction } from "grammy";
import { ContextExt } from "./types";
import { getToday } from "./utils";
import { env } from "./env";
import {
	MESSAGE_PASSED_DAILY_LIMIT,
	MESSAGE_PASSED_DAILY_LIMIT_EXTRA,
} from "./constants";

export async function logRequests(ctx: ContextExt, next: NextFunction) {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
}

export async function limitRequests(ctx: ContextExt, next: NextFunction) {
	// if the message is not from a user, return
	if (!ctx.from) return;

	// if the user is the admin, allow them to send as many messages as they want
	if (ctx.from.id === env.ADMIN_ID) return await next();

	// get today's date
	const todayDate = getToday();

	// if a day has passed, reset messages left for user
	if (ctx.session.lastDate !== todayDate)
		ctx.session.messagesLeft = ctx.session.dailyMessages;

	// if user has no messages left, return
	if (ctx.session.messagesLeft <= 0) {
		await ctx.reply(MESSAGE_PASSED_DAILY_LIMIT, {
			parse_mode: "MarkdownV2",
		});
		if (MESSAGE_PASSED_DAILY_LIMIT_EXTRA.length !== 0) {
			await ctx.reply(MESSAGE_PASSED_DAILY_LIMIT_EXTRA, {
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
			});
		}
		return;
	}

	// otherwise

	// decrement messages left
	ctx.session.messagesLeft -= 1;

	// allow the user to send a message
	return await next();
}
