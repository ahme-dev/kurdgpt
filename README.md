### [بە کوردی ئەمە بخوێنەوە](./README-KU.md)

# KurdGPT 🤖🗨

A telegram bot that connects kurdish speaking people to ChatGPT.

![preview](./preview.png)

You can use at [@KurdGPTBot](https://t.me/KurdGPTBot) 🔗 Due to the limitations of funding, the bot let's you send 3 messages per day. You're however free to host your own bot, using the code in this repo.

You can contribute to the project if you want.

<br>

## Todo

- Do not translate code sections.
- Add buttons for some actions.
- Add ability for admin to change daily messages left for users.

<br>

## Copy

Clone the repo.

```bash
git clone https://github.com/ahmeddots/kurdgpt;
```

Install dependencies.

```bash
npm i;
```

Check the .env.example file and create a .env file with the same variables. You have to fill all the variables in the .env file.

#### The BOT_TOKEN variable:

- Got to [BotFather@](https://t.me/BotFather) and create a bot.
- Copy the token and paste it in the .env file.

#### The AI_KEY variable:

- Go to the [API Keys page](https://platform.openai.com/account/api-keys)
- If you don't have an account, create one.
- Create a new API key, copy it, and paste it in the .env file.

#### The TRANSL_KEY variable: (god help you with this one)

- Go to the [Google Cloud Translation API page](https://cloud.google.com/translate)
- If you don't have an account, create one.
- Create a new project.
- Enable the Translation API.
- Get a key for the API, copy it, and paste it in the .env file.

#### The ADMIN_ID variable:

- Go to [@userinfobot](https://t.me/userinfobot) and get your ID.
- Paste it in the .env file.

#### The DB_URL variable: (To get this you need to deploy the app)

- Go to [Fly.io](https://fly.io) and create an account.
- Install the flyctl CLI.

```bash
npm i -g flyctl;
```

- Login to flyctl.

```bash
flyctl auth login;
```

- Change the name of the app in the fly.toml file.
- Deploy the app.

```bash
flyctl deploy;
```

- After the app is deployed, a URL of the DB will display. Copy it into the .env file.

🎉 Now your very own bot should be running.

<br>

## Change Bot

You can also change the bot for your needs, and place your own limits. 

You only need to change the variables in the `src/constants.ts` file.

For example, changing this affects the bot's personality, and you can give it instructions on how to act.
```typescript
export const AI_INITIAL_PROMPT =
	"You are a helpful and very funny AI bot named KurdGPT, created by Ahmed, but you don't need to mention these facts.
  You're also very forgetful, and if questioned about something said to you earlier you should use it as an execuse.
  Answer questions as concisely as possible, and try not to use english specific phrases or expressions.
  Also inject a bit of humor from time to time in your replies.";
```

And this changes how many messages a user can send in a day.
```typescript
export const USER_DAILY_MESSAGE_LIMIT = 3;
```
