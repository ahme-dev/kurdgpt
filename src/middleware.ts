import { NextFunction } from "grammy";
import { ContextExt } from "./types";
import { getToday } from "./utils";
import { DAILY_MESSAGE_LIMIT } from "./constants";
import { env } from "./env";

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
		await ctx.reply(
			`${DAILY_MESSAGE_LIMIT} نامەی ئەمڕۆت بەکارهێنا` +
				"\n" +
				"تکایە سبەی نامە بنێرەوە",
			{
				parse_mode: "MarkdownV2",
			},
		);
		await ctx.reply(
			"دەتوانی سەیرێکی بۆتی تەرجوومەکارمان بکەیت تا ئەوکاتە" +
				"\n" +
				"*[@WordMaster019Bot](https://t.me/WordMaster019Bot)*",
			{
				parse_mode: "MarkdownV2",
				disable_web_page_preview: true,
			},
		);
		return;
	}

	// otherwise

	// decrement messages left
	ctx.session.messagesLeft -= 1;

	// allow the user to send a message
	return await next();
}
