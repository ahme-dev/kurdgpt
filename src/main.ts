import { load } from "ts-dotenv";
import { Telegraf } from "telegraf";
import { Configuration, OpenAIApi } from "openai";

// import env variables
const env = load({
	BOT_TOKEN: String,
	AI_KEY: String,
});

// connect to openai
const ai = new OpenAIApi(
	new Configuration({
		apiKey: env.AI_KEY,
	}),
);

// make the bot
const bot = new Telegraf(env.BOT_TOKEN);

bot.start((ctx) =>
	ctx.reply(
		"بەخێربێیت بۆ بۆتی کورد جی پی تی!\nتکایە ئاگاداربە کە من تەنها یەک نامەی تۆم بیرئەبێ.",
	),
);

// reply to messages
bot.on("message", async (ctx) => {
	// blacklist ids ctx.from.id
	// or save them to limit their messages

	const aiRes = await ai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed. Answer questions as concisely as possible, but with a bit of humor injected in all replies.",
			},
			{
				role: "user",
				content: ctx.message.text,
			},
		],
		temperature: 0.2,
		max_tokens: 100,
		user: ctx.from.id.toString(),
	});

	const replyMessage = aiRes.data.choices[0]?.message?.content;

	await ctx.reply(replyMessage || "?");
});

// catch all errors
bot.catch(async (err, ctx) => {
	console.log("error :: ", JSON.stringify(err));
	await ctx.reply("زۆر ببورە! کێشەیەکم بۆ دروستبووە");
});

// launch the bot
bot.launch();
