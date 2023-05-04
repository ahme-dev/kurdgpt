import { Translate } from "@google-cloud/translate/build/src/v2";
import { env, loadEnv } from "./env";

loadEnv();

// connect to google translate
const translate = new Translate({
	key: env.TRANSL_KEY,
});

// translate any language to english or kurdish
export async function translateText(
	text: string,
	language: "en" | "ckb",
): Promise<string> {
	const translatedText = await translate.translate(text, {
		to: language,
	});

	return translatedText[0];
}
