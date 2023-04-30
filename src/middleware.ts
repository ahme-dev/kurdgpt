import { Context } from "telegraf";
import { ContextExt } from "./types";
import { getToday } from "./utils";

export async function logRequests(ctx: Context, next: () => Promise<void>) {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
}

export async function limitRequests(
	ctx: ContextExt,
	next: () => Promise<void>,
) {
	// get today's date
	const todayDate = getToday();

	// if a day has passed, reset messages left for user
	if (ctx.session.lastDate !== todayDate)
		ctx.session.messagesLeft = ctx.session.dailyMessages;

	// if user has no messages left, return
	if (ctx.session.messagesLeft <= 0)
		return await ctx.reply("تکایە سبەی نامە بنێرەوە! ٤ نامەی ئەمڕۆت بەکارهێنا");

	// decrement messages left
	ctx.session.messagesLeft -= 1;

	// otherwise allow the user to send a message
	return await next();
}
