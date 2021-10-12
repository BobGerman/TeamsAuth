require('dotenv').config();
const contactsService = require('./mock');
const { TeamsActivityHandler, CardFactory } = require('botbuilder');

const images = ['userBlue48.png', 'userGreen48.png', 'userOrange48.png'];

module.exports.ContactsBot =
  class ContactsBot extends TeamsActivityHandler {

  // Triggers when the action is invoked either in the search box or message menu by a user
  async handleTeamsMessagingExtensionQuery(context, query) {

    const { name, value } = query.parameters[0];

    if (name !== 'name') {
      return;
    }

    console.log(`Looking up ${value}`);

    const contacts = contactsService.query(context, value);

    const attachments = [];
    for (let c of contacts) {
      // Select an image based on the first initial
      const image = `https://${process.env.Hostname}/images/` +
        images[c.displayName.charCodeAt(0) % images.length];
      // Build the adaptive card to be used if the user selects this contact
      const card = {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "items": [
                  {
                    "type": "Image",
                    "style": "Person",
                    "url": image,
                    "size": "Small"
                  }
                ],
                "width": "auto"
              },
              {
                "type": "Column",
                "items": [
                  {
                    "type": "TextBlock",
                    "weight": "Bolder",
                    "text": c.displayName,
                    "wrap": true
                  },
                  {
                    "type": "TextBlock",
                    "spacing": "None",
                    "text": c.jobTitle,
                    "isSubtle": true,
                    "wrap": true
                  }
                ],
                "width": "stretch"
              }
            ]
          }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.3"
      };
      // Build the result card and thumbnail card and add them in an attachment
      const resultCard = CardFactory.adaptiveCard(card);
      const previewCard = CardFactory.thumbnailCard(c.displayName, [image]);
      const attachment = { ...resultCard, preview: previewCard };
      attachments.push(attachment);
    }

    return {
      composeExtension: {
        type: 'result',
        attachmentLayout: 'list',
        attachments: attachments
      }
    };
  }
}


