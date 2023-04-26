import { load } from "ts-dotenv";
import { Telegraf } from "telegraf";

const env = load({
	BOT_TOKEN: String,
});

const bot = new Telegraf(env.BOT_TOKEN);

bot.on("message", async (ctx) => {
	await ctx.reply(`Hello!`);
});

bot.launch();
