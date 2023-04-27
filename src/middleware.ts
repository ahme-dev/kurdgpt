import { Context } from "telegraf";

export async function logRequests(ctx: Context, next: () => Promise<void>) {
	console.time(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
	await next();
	console.timeEnd(`request :: ${ctx.from?.id}-${ctx.from?.username} ::`);
}
