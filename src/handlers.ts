import { translateText } from "./translation";
import { promptAI } from "./ai";
import { ContextExt } from "./types";
import { BotError } from "grammy";
import { addToConversation } from "./utils";
import { MESSAGES_ERROR_IN_BOT, MESSAGES_WELCOME_USER_LIST } from "./constants";
import { tryAsync } from "tryresult";

// handle all messages sent to the bot
export async function handleMessage(ctx: ContextExt) {
	// if there's no message or user, return
	if (!ctx.from || !ctx.message) return;
	if (!ctx.message.text) return;

	// get the message text
	const messageText = ctx.message.text.trim().slice(0, 100);

	// say typing
	await tryAsync(ctx.replyWithChatAction("typing"));

	// translate user message to english
	const messageInEnglish = await translateText(messageText, "en");

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
	const replyInKurdish = await translateText(replyMessage, "ckb");

	// send the reply to the user
	await tryAsync(ctx.reply(replyInKurdish));
}

// handle the /start command
// the first message a user sends to the bot
export async function handleStart(ctx: ContextExt) {
	for (const message of MESSAGES_WELCOME_USER_LIST) {
		await tryAsync(ctx.reply(message));
	}
}

// handle all errors caught by the bot
export async function handleErrors(err: BotError) {
	console.log("error caught :: ", err.message);

	for (const message of MESSAGES_ERROR_IN_BOT) {
		await tryAsync(err.ctx.reply(message));
	}
}
