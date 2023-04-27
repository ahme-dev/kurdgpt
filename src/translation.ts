import { Translate } from "@google-cloud/translate/build/src/v2";
import { env, loadEnv } from "./env";

loadEnv();

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
