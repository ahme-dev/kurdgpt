import { translateToEnglish, translateToKurdish } from "./translation";
import { promptAI } from "./ai";
import { ContextExt } from "./types";
import { BotError } from "grammy";

export async function handleMessage(ctx: ContextExt) {
	// if there's no message or user, return
	if (!ctx.from || !ctx.message) return;

	// say typing
	ctx.replyWithChatAction("typing");

	// translate user message to english
	const messageInEnglish = await translateToEnglish(ctx.message.text || "");

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

export async function handleStart(ctx: ContextExt) {
	await ctx.reply("بەخێربێیت بۆ بۆتی کورد جی پی تی!");
	await ctx.reply("تکایە ئاگاداربە کە من تەنها یەک نامەی تۆم بیرئەبێ");
}

export async function handleErrors(err: BotError) {
	console.log("error caught :: ", err.message);
	await err.ctx.reply("زۆر ببورە! کێشەیەکم بۆ دروستبووە");
}
