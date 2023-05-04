import { NextFunction } from "grammy";
import { ContextExt } from "./types";
import { getToday } from "./utils";
import { DAILY_MESSAGE_LIMIT } from "./constants";

export async function logRequests(ctx: ContextExt, next: NextFunction) {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
}

export async function limitRequests(ctx: ContextExt, next: NextFunction) {
	// get today's date
	const todayDate = getToday();

	// if a day has passed, reset messages left for user
	if (ctx.session.lastDate !== todayDate)
		ctx.session.messagesLeft = ctx.session.dailyMessages;

	// if user has no messages left, return
	if (ctx.session.messagesLeft <= 0) {
		await ctx.reply(
			`${DAILY_MESSAGE_LIMIT} نامەی ئەمڕۆت بەکارهێنا` +
				"\n" +
				"تکایە سبەی نامە بنێرەوە",
			{
				parse_mode: "MarkdownV2",
			},
		);
		await ctx.reply(
			"دەتوانی داواکری و پێشنیارەکانت بنێریت" +
				"\n" +
				"*[@ahmedkabd](https://t.me/ahmedkabd)*",
			{
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
			},
		);
		return;
	}

	// decrement messages left
	ctx.session.messagesLeft -= 1;

	// otherwise allow the user to send a message
	return await next();
}
