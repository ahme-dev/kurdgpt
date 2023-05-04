import { EnvType, load } from "ts-dotenv";

const schema = {
	// as described in .env.example
	BOT_TOKEN: String,
	AI_KEY: String,
	TRANSL_KEY: String,
	ADMIN_ID: Number,
	DB_URL: String,
};

type Env = EnvType<typeof schema>;

export let env: Env;

// import env variables
export function loadEnv() {
	env = load(schema);
}
