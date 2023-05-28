//
// ai configuration
//

// ئەمە بە زیرەکی دەستکردەکە ئەڵێت چۆن هەڵسوکەوت بکات
// this tells the bot how to respond and behave
export const AI_INITIAL_PROMPT =
	"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed, but you don't need to mention these facts. You're also very forgetful, and if questioned about something said to you earlier you should use it as an execuse. Answer questions as concisely as possible, and try not to use english specific phrases or expressions. Also inject a bit of humor from time to time in your replies.";

//
// limits of the on bot
//

// سنووری نامەی ڕۆژانە بۆ بەکارهێنەران
// The number of messages a user can send per day
export const USER_DAILY_MESSAGE_LIMIT = 3;

// ژمارەی ئەو نامانەی زیرەکی دەستکردەکە بیری ئەمێنێ بۆ بەکارهێنەران
// The number of messages the bot will remember from the user
export const USER_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT = 7;

// هەمان شتی سەرەوە بەس بۆ ئادمین
// The number of messages the bot will remember from the admin
export const ADMIN_AI_PREVIOUS_MESSAGES_REMEMBERED_LIMIT = 27;

//
// messages to respond to user
//

// نامە بۆ کاتێک بۆتەکە ناتوانێ کۆنێکتی چات جی پی تی بکات
// when the the bot cannot connect to chatgpt (openai)
export const MESSAGE_CONNECTING_AI_ERROR =
	"لە ئێستادا مێشکم هیچ کارناکات، ببورە نازانم چۆن وەڵامت بەمەوە";

// نامە بۆ کاتێک بەکارهێنەر سنووری ڕۆژانەی تێپەڕاندبێ
// when the user has passed the daily message limit
export const MESSAGE_PASSED_DAILY_LIMIT =
	"نامەی ئەمڕۆت بەکارهێنا" + "\n" + "تکایە سبەی نامە بنێرەوە";

// ئەمە نامەی دووەمە بۆ ئەوەی پێشتر (مەرجە ئەمەش دانێی)
// when the user has passed the daily message limit
// this is the second message sent after the first
export const MESSAGE_PASSED_DAILY_LIMIT_EXTRA =
	"دەتوانی سەیرێکی بۆتی تەرجوومەکارمان بکەیت تا ئەوکاتە" +
	"\n" +
	"*[@WordMaster019Bot](https://t.me/WordMaster019Bot)*";

// کاتێک بەکارهێنەر سەرەتا نامە بۆ بۆتەکە ئەنێرێ
// ئەتوانی کەمتر یان زیاتری بکەیت ئەم نامانە
// when the user first starts the bot
export const MESSAGES_WELCOME_USER_LIST = [
	"بەخێربێیت، من بۆتی کورد جی پی تیم!",
	"ئەتوانم وەڵامی هەموو پرسیارەکانت بەمەوە و یارمەتیت بەم",
	"تکایە ئاگاداربە کە من کەمێ بیرەوەریم خراپە",
];

// نامە بۆ کاتێک بۆتەکە کێشەیەیەک لە کۆدەکەی هەبێت
// ئەتوانی کەمتر یان زیاتری بکەیت ئەم نامانە
// when the bot encounters an error in its code
export const MESSAGES_ERROR_IN_BOT = [
	"زۆر ببورە! کێشەیەکم بۆ دروستبووە",
	"تکایە کاتێکی تر نامەم بۆ بنێرەوە",
];
