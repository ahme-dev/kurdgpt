import { Translate } from "@google-cloud/translate/build/src/v2";
import { load } from "ts-dotenv";

// import env variables
const env = load({
	BOT_TOKEN: String,
	AI_KEY: String,
	TRANSL_KEY: String,
	DB_CON: String,
});

// connect to google translate
const translate = new Translate({
	key: env.TRANSL_KEY,
});

export async function translateToEnglish(text: string): Promise<string> {
	const translatedText = await translate.translate(text, {
		to: "en",
	});

	return translatedText[0];
}

export async function translateToKurdish(text: string): Promise<string> {
	const translatedText = await translate.translate(text, {
		to: "ckb",
	});

	return translatedText[0];
}
