require('dotenv').config();
const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');
const { ContactsBot } = require('./bot');

// Create HTTP server
const app = express();
const server = app.listen(process.env.PORT || 3978, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Set up error handling
const onTurnErrorHandler = async (context, error) => {

  // Log errors to console - in production, add better logging
  console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
      'OnTurnError Trace',
      `${ error }`,
      'https://www.botframework.com/schemas/error',
      'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};
adapter.onTurnError = onTurnErrorHandler;

// Create the bot
const myBot = new ContactsBot();

// Messaging endpoint - Listen for incoming requests.
app.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await myBot.run(context);
  });
});
