import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { env, loadEnv } from "./env";

loadEnv();

// connect to openai
const ai = new OpenAIApi(
	new Configuration({
		apiKey: env.AI_KEY,
	}),
);

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
				content:
					"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed, but you don't need to mention these facts. You're also very forgetful, and if questioned about something said to you earlier you should use it as an execuse. Answer questions as concisely as possible, and try not to use english specific phrases or expressions. Also inject a bit of humor from time to time in your replies.",
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
		user: uid,
	});

	const replyMessage = aiResponse.data.choices[0]?.message?.content;

	if (!replyMessage)
		return "تۆزێک سەرم لێتێکچووە، ببورە\nتکایە کاتێکی تر نامەم بۆ بنێرە";

	return replyMessage;
}
