import { Context } from "telegraf";
import { translateToEnglish, translateToKurdish } from "./translation";
import { promptAI } from "./ai";
import { Message, Update } from "telegraf/typings/core/types/typegram";

export async function handleMessage(ctx: Context<Update>) {
	// if there's no message or user, return
	if (!ctx.from || !ctx.message) return;

	// translate user message to english
	const messageInEnglish = await translateToEnglish(
		(ctx.message as Message.TextMessage).text,
	);

	// prompt the ai with the message
	const replyMessage = await promptAI(
		messageInEnglish,
		ctx.from?.id?.toString(),
	);

	// translate the reply to kurdish
	const replyInKurdish = await translateToKurdish(replyMessage);

	// send the reply to the user
	await ctx.reply(replyInKurdish);
}

export async function handleStart(ctx: Context<Update>) {
	await ctx.reply("بەخێربێیت بۆ بۆتی کورد جی پی تی!");
	await ctx.reply("تکایە ئاگاداربە کە من تەنها یەک نامەی تۆم بیرئەبێ");
}

export async function handleErrors(err: unknown, ctx: Context) {
	console.log("error :: ", JSON.stringify(err));
	await ctx.reply("زۆر ببورە! کێشەیەکم بۆ دروستبووە");
}
