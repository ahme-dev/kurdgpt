import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { env, loadEnv } from "./env";
import { AI_INITIAL_PROMPT, MESSAGE_CONNECTING_AI_ERROR } from "./constants";

loadEnv();

// connect to openai
const ai = new OpenAIApi(
	new Configuration({
		apiKey: env.AI_KEY,
	}),
);

// prompt the ai with the previous messages and the current prompt
// return the ai's reply
export async function promptAI(
	previousMessages: ChatCompletionRequestMessage[],
	promptMessage: string,
	uid: string,
): Promise<string> {
	const aiResponse = await ai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			// guide the ai
			{
				role: "system",
				content: AI_INITIAL_PROMPT,
			},

			// use the previous messages
			...previousMessages,

			// add the current user prompt
			{
				role: "user",
				content: promptMessage,
			},
		],
		temperature: 0.2,
		max_tokens: 100,
		// use the user id as the engine's id
		user: uid,
	});

	// get the ai's reply
	const replyMessage = aiResponse.data.choices[0]?.message?.content;

	// if there's no reply, return with indicative message
	if (!replyMessage) return MESSAGE_CONNECTING_AI_ERROR;

	// otherwise return the reply
	return replyMessage;
}
