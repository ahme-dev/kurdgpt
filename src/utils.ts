import { ContextExt } from "./types";

export function getToday(): string {
	const d = new Date();
	const dateString = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
	return dateString;
}

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

	// if the conversation is too long, remove the last item
	if (ctx.session.conversation.length >= 7) ctx.session.conversation.shift();
}
