import { CONVERSATION_MESSAGES_LIMIT } from "./constants";
import { ContextExt } from "./types";

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

	// if the conversation longer than the limit, remove the oldest message
	if (ctx.session.conversation.length >= CONVERSATION_MESSAGES_LIMIT)
		ctx.session.conversation.shift();
}
