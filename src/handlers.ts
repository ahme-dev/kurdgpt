import { translateToEnglish, translateToKurdish } from "./translation";
import { promptAI } from "./ai";
import { ContextExt } from "./types";
import { BotError } from "grammy";
import { addToConversation } from "./utils";

export async function handleMessage(ctx: ContextExt) {
	// if there's no message or user, return
	if (!ctx.from || !ctx.message) return;
	if (!ctx.message.text) return;

	// get the message text
	const messageText = ctx.message.text.trim().slice(0, 100);

	// say typing
	ctx.replyWithChatAction("typing");

	// translate user message to english
	const messageInEnglish = await translateToEnglish(messageText);

	// add user message to previous messages
	addToConversation(ctx, messageInEnglish, "user");

	// prompt the ai with the message
	const replyMessage = await promptAI(
		ctx.session.conversation,
		messageInEnglish,
		ctx.from.id.toString(),
	);

	// add the reply to previous messages
	addToConversation(ctx, replyMessage, "assistant");

	// translate the reply to kurdish
	const replyInKurdish = await translateToKurdish(replyMessage);

	// send the reply to the user
	await ctx.reply(replyInKurdish);
}

export async function handleStart(ctx: ContextExt) {
	await ctx.reply("بەخێربێیت، من بۆتی کورد جی پی تیم!");
	await ctx.reply("ئەتوانم وەڵامی هەموو پرسیارەکانت بەمەوە و یارمەتیت بەم");
	await ctx.reply("تکایە ئاگاداربە کە من کەمێ بیرەوەریم خراپە");
}

export async function handleErrors(err: BotError) {
	console.log("error caught :: ", err.message);
	await err.ctx.reply("زۆر ببورە! کێشەیەکم بۆ دروستبووە");
}
