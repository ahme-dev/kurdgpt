import { EnvType, load } from "ts-dotenv";

const schema = {
	BOT_TOKEN: String,
	AI_KEY: String,
	TRANSL_KEY: String,
	DB_URL: String,
	DEVELOPMENT: Boolean,
};

type Env = EnvType<typeof schema>;

export let env: Env;

// import env variables
export function loadEnv() {
	env = load(schema);
}
