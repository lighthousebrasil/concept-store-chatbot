"use strict";

// Set client auth mode - true to enable client auth, false to disable it
var isClientAuthEnabled = false;

var skillVoicePT = [
  {
    lang: "pt-br",
    name: "Google português do Brasil",
  },
  {
    lang: "pt-br",
    name: "Luciana",
  },
  {
    lang: "pt-pt",
    name: "Joana",
  },
  {
    lang: "pt-br",
  },
];

var skillVoiceEN = [
  {
    lang: "en-us",
    name: "Samantha",
  },
  {
    lang: "en-us",
    name: "Alex",
  },
  {
    lang: "en-us",
  },
];

var skillVoiceES = [{ lang: "es-es" }];

/**
 * Initializes the SDK and sets a global field with passed name for it the can
 * be referred later
 *
 * @param {string} name Name by which the chat widget should be referred
 */
function initSdk(name) {
  // Retry initialization later if WebSDK is not available yet
  if (!document || !WebSDK) {
    setTimeout(function () {
      initSdk(name);
    }, 2000);
    return;
  }

  if (!name) {
    name = "Bots"; // Set default reference name to 'Bots'
  }
  var Bots;

  var locale = sessionStorage.getItem('languageTag');
  var speechLocale = locale == 'pt_BR' ? 'pt-br' : locale == 'es' ? 'es-es' :'en-us';
  var skillVoices = locale == 'pt_BR' ? skillVoicePT : locale == 'es' ? skillVoiceES :skillVoiceEN;

  setTimeout(function () {
    /**
     * SDK configuration settings
     * Other than URI, all fields are optional with two exceptions for auth modes
     * In client auth disabled mode, 'channelId' must be passed, 'userId' is optional
     * In client auth enabled mode, 'clientAuthEnabled: true' must be passed
     */
    var chatWidgetSettings = {
      URI: "oda-27ac513e872642dc9984fe27bd60a41d-da10.data.digitalassistant.oci.oraclecloud.com",
      channelId: "2dcc05e1-f3ac-444f-9c3c-b65d0c29fa8c",
      initUserHiddenMessage: "Oi",
      initMessageOptions: {
        sendAt: "expand",
      },
      displayActionsAsPills: false,
      enableAttachment: true,
      //			shareMenuItems: ['visual'],
      shareLocation: false,
      enableAutocomplete: true,
      enableAutocompleteClientCache: true,
      enableClearMessage: false,
      initUserProfile: {
        profile: {
          givenName: sessionStorage.getItem("givenName"),
          surname: sessionStorage.getItem("surname"),
          email: sessionStorage.getItem("email"),
          languageTag: sessionStorage.getItem("languageTag"),
          passInt: sessionStorage.getItem("passInt"),
        },
        properties: {
          userInt: sessionStorage.getItem("email"),
          passInt: sessionStorage.getItem("passInt"),
          userId: sessionStorage.getItem("userId"),
        },
      },
      enableTimestamp: true,
      showConnectionStatus: true,
      embeddedVideo: true,
      locale: speechLocale,
      enableBotAudioResponse: true,
      enableSpeech: true,
      speechLocale: speechLocale,
      enableSecureConnection: true,
      initBotAudioMuted: true,
      openChatOnLoad: true,
      skillVoices: skillVoices,
      conversationBeginPosition: "bottom",
      font: '14px "Mier B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      colors: {
        branding: "white",
        text: "#292929",
        textLight: "#737373",
        typingIndicator: "#D47229",
        botText: "white",
        botMessageBackground: "#D47229",
        actionsBackground: "#232323",
      },
      i18n: {
        "pt-BR": {
          audioResponseOff: "Clique para ativar a resposta de áudio",
          audioResponseOn: "Clique para desativar a resposta de áudio",
          chatTitle: "Assistente Digital",
          connected: "Disponível",
          disconnected: "Indisponível",
          inputPlaceholder: "Digite sua mensagem aqui",
          send: "Enviar (Enter)",
          clear: "Limpar Chat",
          close: "Minimizar Chat",
          connecting: "Conectando...",
          closing: "Fechando...",
          requestLocation: "Envie a sua localização",
          upload: "Escolha o arquivo a ser enviado",
          uploadFailed: "Ocorreu um erro. Contacte o administrador.",
          uploadUnsupportedFileType:
            "Ocorreu um erro. Este tipo de arquivo não é permitido.",
          requestLocationString: "Ocorreu um erro. Contacte o administrador",
          uploadFileSizeLimitExceeded:
            "Limite de arquivo ultrapassado. O tamanho máximo é de 25mb.",
          cardNavPrevious: "Opção anterior",
          cardNavNext: "Próxima opção",
          cardImagePlaceholder: "Imagem",
          recognitionTextPlaceholder: "Fale a sua mensagem",
          speak: "Digite a sua mensagem",
          shareVisual: "Selecionar imagem",
          shareLocation: "Compartilhar localização",
          openMap: "Visualizar no mapa",
          userMessage: "Eu disse",
          utteranceGeneric: "Mensagem da Loja Conceito",
          retryMessage: "Tente novamente",
          requestLocationDeniedUnavailable:
            "Seu local atual não está disponível. Tente novamente ou digite sua cidade/UF.",
          requestLocationDeniedTimeout:
            "Demorando muito para obter sua localização atual. Tente novamente ou digite sua cidade/UF.",
          requestLocationDeniedPermission:
            "Permissão de localização negada. Permita o acesso para compartilhar sua localização ou digite sua cidade/UF.",
          previousChats: "Conversa anterior",
          noSpeechTimeout:
            "Não foi possível detectar a voz, nenhuma mensagem foi enviada.",
          errorSpeechUnsupportedLocale:
            "O navegador utilizado para detecção de fala não é compatível. Não é possível iniciar a voz.",
          card: "Cartão",
        },
        en: {
          audioResponseOff: "Click to enable audio response",
          audioResponseOn: "Click to disable audio response",
          chatTitle: "Digital Assistant",
          connected: "Available",
          disconnected: "Unavailable",
          inputPlaceholder: "Type your message here",
          send: "Send (Enter)",
          clear: "Clear Chat",
          close: "Close Chat",
          connecting: "Connecting...",
          closing: "Closing...",
          requestLocation: "Send your location",
          upload: "Choose the file to send",
          uploadFailed: "An error has occurred. Contact your administrator.",
          requestLocationString:
            "An error has occurred. Contact your administrator.",
          uploadFileSizeLimitExceeded:
            "File limit exceeded. The maximum size is 25mb.",
        },
      },
    };

    // Initialize SDK
    Bots = new WebSDK(chatWidgetSettings);

    Bots.setSize('100vw' ,'100vh');

    // Connect to skill when the widget is expanded for the first time
    var isFirstConnection = true;
    Bots.on(WebSDK.EVENT.WIDGET_OPENED, function () {
      if (isFirstConnection) {
        Bots.connect()
        isFirstConnection = false;
      }
    });

    Bots.openChat();

    // Create global object to refer Bots
    window[name] = Bots;
    customizeLaunchButton();
  }, 0);
}

function customizeLaunchButton() {
    const launchButton = document.querySelector('.oda-chat-button');
    if (launchButton) {
        const element = document.createElement('div');
        element.setAttribute('dir', 'auto');
        element.setAttribute('class', 'oda-chat-letschat');
        const innerText = document.createTextNode('Olá, como posso ajudar?');
        element.appendChild(innerText);
        launchButton.appendChild(element);
    }
}
