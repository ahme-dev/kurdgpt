import { Configuration, OpenAIApi } from "openai";
import { load } from "ts-dotenv";

// import env variables
const env = load({
	BOT_TOKEN: String,
	AI_KEY: String,
	TRANSL_KEY: String,
	DB_CON: String,
});

// connect to openai
const ai = new OpenAIApi(
	new Configuration({
		apiKey: env.AI_KEY,
	}),
);

export async function promptAI(
	promptMessage: string,
	uid: string,
): Promise<string> {
	const aiResponse = await ai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed. Answer questions as concisely as possible, but with a bit of humor injected in most replies.",
			},
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

	if (!replyMessage) return "تۆزێ سەرم لێتێکچووە. ببورە";

	return replyMessage;
}
