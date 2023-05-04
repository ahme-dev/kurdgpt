import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { env, loadEnv } from "./env";

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
		// use the user id as the engine's id
		user: uid,
	});

	// get the ai's reply
	const replyMessage = aiResponse.data.choices[0]?.message?.content;

	// if there's no reply, return with indicative message
	if (!replyMessage)
		return "لە ئێستادا مێشکم هیچ کارناکات، ببورە نازانم چۆن وەڵامت بەمەوە";

	// otherwise return the reply
	return replyMessage;
}
