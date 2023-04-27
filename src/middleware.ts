import { Context } from "telegraf";
import { ContextExt } from "./types";

export async function logRequests(ctx: Context, next: () => Promise<void>) {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
}

export async function limitRequests(
	ctx: ContextExt,
	next: () => Promise<void>,
) {
	ctx.session.count++;
	console.log("count :: ", ctx.session.count);

	if (ctx.session.count > 1) return await ctx.reply("تەواو برا");

	return await next();
}
