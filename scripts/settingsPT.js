'use strict';

// Set client auth mode - true to enable client auth, false to disable it
const isClientAuthEnabled = false;

var email;
var password;
var language;

function onLoadAppParameters() {
    email = document.getElementById('output').value;
}

window.onload = onLoadAppParameters;

/**
 * Initializes the SDK and sets a global field with passed name for it the can
 * be referred later
 *
 * @param {string} name Name by which the chat widget should be referred
 */
const initSdk = (name) => {
    if (!name) {
        name = 'Bots';          // Set default reference name to 'Bots'
    }
    let Bots;

    setTimeout(() => {
        alert(email)

        /**
         * SDK configuration settings
         * Other than URI, all fields are optional with two exceptions for auth modes
         * In client auth disabled mode, 'channelId' must be passed, 'userId' is optional
         * In client auth enabled mode, 'clientAuthEnabled: true' must be passed
         */
        let chatWidgetSettings = {
            URI: 'oda-2497a55ccce743cdb5e930a2c58741f6-da2.data.digitalassistant.oci.oraclecloud.com',                               // ODA URI, only the hostname part should be passed, without the https://
            clientAuthEnabled: isClientAuthEnabled,     // Enables client auth enabled mode of connection if set true
            channelId: '46e6b051-0e2f-4ac7-a4d2-7151a51bc320',                   // Channel ID, available in channel settings in ODA UI
            userId: '<userID>',                         // User ID, optional field to personalize user experience
            enableAutocomplete: true,                   // Enables autocomplete suggestions on user input
            enableBotAudioResponse: true,               // Enables audio utterance of skill responses
            enableClearMessage: true,                   // Enables display of button to clear conversation
            enableSpeech: true,                         // Enables voice recognition
            enableTimestamp: false,                     // Show timestamp with each message
            speechLocale: WebSDK.SPEECH_LOCALE.EN_US,   // Sets locale used to speak to the skill, the SDK supports EN_US, FR_FR, and ES_ES locales for speech
            showConnectionStatus: false,                 // Displays current connection status on the header
            theme: WebSDK.THEME.DEFAULT,            // Redwood dark theme. The default is THEME.DEFAULT, THEME.REDWOOD_DARK while older theme is available as THEME.CLASSIC,
            //embedded: true,
            //targetElement: '<targetDivId>',
            multiLangChat: {
                supportedLangs: [{
                    lang: 'en'
                }, {
                    lang: 'es',
                    label: 'Español'
                }, {
                    lang: 'pt'
                    label: 'Português'
                }],
                primary: 'pt'
            },
            colors: {"branding": "white", "text": "#292929", "textLight": "#737373", "typingIndicator": "#D47229", 'botText': 'white', 'botMessageBackground': '#D47229', "actionsBackground": '#232323' },
            position: {bottom: '20px', right: '20px'},
            
        };

        // Initialize SDK
        if (isClientAuthEnabled) {
            Bots = new WebSDK(chatWidgetSettings, generateToken);
        } else {
            Bots = new WebSDK(chatWidgetSettings);
        }

        // Optional event listeners
        // All event listeners should preferably added before the connect() call, otherwise they may not be fired correctly
        Bots.on(WebSDK.EVENT.CLICK_AUDIO_RESPONSE_TOGGLE, (state) => {
            console.log('Response utterance toggled, current status =', state);
        });

        Bots.on(WebSDK.EVENT.WIDGET_OPENED, () => {
            console.log('Widget is opened');
        });
        Bots.setSize('100vw' ,'100vh')

        // Connect to the ODA
        Bots.connect()
        .then(
            () => {
                Bots.openChat()
            }
        )

        // Create global object to refer Bots
        window[name] = Bots;
    }, 0);
};
