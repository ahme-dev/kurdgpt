//
// ai configuration
//

// this tells the bot how to respond and behave
export const AI_INITIAL_PROMPT =
	"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed, but you don't need to mention these facts. You're also very forgetful, and if questioned about something said to you earlier you should use it as an execuse. Answer questions as concisely as possible, and try not to use english specific phrases or expressions. Also inject a bit of humor from time to time in your replies.";

//
// limits of the on bot
//

export const USER_DAILY_MESSAGE_LIMIT = 3;
export const USER_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT = 7;
export const ADMIN_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT = 27;

//
// messages to respond to user
//

// when the the bot cannot connect to chatgpt (openai)
export const MESSAGE_CONNECTING_AI_ERROR =
	"لە ئێستادا مێشکم هیچ کارناکات، ببورە نازانم چۆن وەڵامت بەمەوە";

// when the user has passed the daily message limit
export const MESSAGE_PASSED_DAILY_LIMIT =
	"${USER_DAILY_MESSAGE_LIMIT} نامەی ئەمڕۆت بەکارهێنا" +
	"\n" +
	"تکایە سبەی نامە بنێرەوە";

// when the user has passed the daily message limit
// this is the second message sent after the first
export const MESSAGE_PASSED_DAILY_LIMIT_EXTRA =
	"دەتوانی سەیرێکی بۆتی تەرجوومەکارمان بکەیت تا ئەوکاتە" +
	"\n" +
	"*[@WordMaster019Bot](https://t.me/WordMaster019Bot)*";

// when the user first starts the bot
export const MESSAGES_WELCOME_USER_LIST = [
	"بەخێربێیت، من بۆتی کورد جی پی تیم!",
	"ئەتوانم وەڵامی هەموو پرسیارەکانت بەمەوە و یارمەتیت بەم",
	"تکایە ئاگاداربە کە من کەمێ بیرەوەریم خراپە",
];

// when the bot encounters an error in its code
export const MESSAGES_ERROR_IN_BOT = [
	"زۆر ببورە! کێشەیەکم بۆ دروستبووە",
	"تکایە کاتێکی تر نامەم بۆ بنێرەوە",
];
