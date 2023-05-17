import {
	ADMIN_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT,
	USER_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT,
} from "./constants";
import { env, loadEnv } from "./env";
import { ContextExt } from "./types";

loadEnv();

// get todays date in the format dd/mm/yyyy
export function getToday(): string {
	const d = new Date();
	const dateString = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
	return dateString;
}

// add a message to the conversation
// used with session middleware
export function addToConversation(
	ctx: ContextExt,
	content: string,
	role: "user" | "assistant",
) {
	// add the message to the conversation
	ctx.session.conversation.push({
		role,
		content,
	});

	// get limit based on type of user
	let messagesLimit =
		ctx.from?.id == env.ADMIN_ID
			? ADMIN_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT
			: USER_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT;

	// if the conversation longer than the limit, remove the oldest message
	if (ctx.session.conversation.length >= messagesLimit)
		ctx.session.conversation.shift();
}
