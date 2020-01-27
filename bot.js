const tmi = require('tmi.js');
const prefix = "!";

const tmiConfig = {
    options: {
        debug: true
    },
    connection: {
        reconnect:  true
    },
    identity: {
        username: "BobLeHerisson", // Username du bot
        password: process.env.TOKEN // Token oAuth de twitch
    },
    channels: [
        "Laoria" // Nom exact de la chaîne à laquelle se connecter
    ]
};

let client = new tmi.client(tmiConfig);
let atk; // Personne qui attaque au shifusub
let def; // Personne défend au shifusub
let tmp = 3; // Décompte shifusub
let x; // Fonction sociale
let a; // Fonction sociale
let social; // Fonction sociale
let msg; // variable message.toLowerCase
let marie = false; // marie8975 n'est pas là
let xouneh = false; // Xouneh n'est pas là
let todaySubs = 0; // Nombre de subs du jour
let answers = [
  hello = [ // Le bot dit bonjour aux gens
    " Coucou laoriaDoge",
    " Hello laoriaDerp",
    " Bien ou quoi ?",
    " Yooo laoriaPoin",
    " Salut !",
  ],
  chanson = [ // Le bot chante
    "Je ne suis pas un esclave laoriaAngry",
    "Taaaaaake oooooon meeeeeeeeeee laoriaDoge",
    "J'suis pas d'humeur...",
    "Never gonna give you up, never gonna let you doooown. Never gonna run around and desert youuuu !",
    "ERROR 677 : The bot cannot sing right now.",
    "Zenvious est beau ! Zenvious est bon ! Mais il restera, toujours second ! laoriaPoin",
    "Si je pouvais, je chanterai Take On Me toute la vie.",
    "I am a dwarf and I'm digging a hole ! Diggy diggy hole, diggy diggy hole !",
    "The coconut nut is giant nut laoriaPoin",
    "HU HU HU HU HU HU HU HU HU ! Zoom Zoom.",
    "AAAIIIAAA. SAY DO YOU REMEMBER laoriaAngry",
    "I'll beeee goooooone, IN A DAY OR TWOOOOOOOOOOOOOOOOOOOOOOOO"
  ],
  deus = [ // Quand Xouneh arrive sur le chat
    "/me Dieu Xouneh. Que nous vaut votre présence ?",
    "/me Ô grand Seigneur Xouneh. Votre seule présence sur ce chat en bénie ses utilisateurs. Puisse votre session d'aujourd'hui se passer à merveille. Merci, mon créateur.",
    "/me Salut papa ! Tu viens chanter Take On Me avec moi ? laoriaDoge",
    "/me Xouneh le Dieu est arrivé sur le chat.",
  ]
]

client.connect();


// _____________________________________________________________________________

// Check if user is sub
function isSubscriber(user){
    return user.subscriber;
}
// Check if user is mod
function isModerator(user){
    return user.mod;
}
// The two following functions are used to detect chat commands
const has= (a,b)=> {
    for(let c in a) {
        if(b.includes(a[c])) return true;
    } return false;
};
function commandParser(message){
    let prefixEscaped = prefix.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    let regex = new RegExp("^" + prefixEscaped + "([a-zA-Z]+)\s?(.*)");
    return regex.exec(message);
}
// Returns random number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// _____________________________________________________________________________


client.on('connected', (adress, port, channel) => {
    client.say("Laoria", "Re, j'ai buggé laoriaDoge"); // Message lancé à la connexion du bot
    social = setInterval(autoSocial, 600000); // Temps en millisecondes entre deux messages de pub réseaux sociaux
    console.log("Fonction sociale lancée avec succès."); // Check si la fonction s'est lancée correctement
    // msg AUTOMATIQUE RESEAUX SOCIAUX
    function autoSocial() {
      client.say("Laoria", "Réseaux sociaux : https://discord.gg/rJcqE5 → Discord https://www.instagram.com/_laoria_/ → Insta  https://twitter.com/laoria_ → Twitter");
    }
});


client.on('chat', (channel, user, message, isSelf) => {
    if (isSelf) return;
    msg = message.toLowerCase(); // Mettre le message en minuscules
    let fullCommand = commandParser(msg);

    // SHIFUSUB ATTENTE DECOMPTE
    function clearInts(){
      clearInterval(a);
      x = setInterval(attente, 3000); // Interval du décompte
    }
    function attente() {
      if (tmp != -1) {
        client.say(channel, " " + tmp);
        tmp--;
        return tmp;
      } else {
        tmp = 3;
        def;
        atk;
        clearInterval(x);
        return tmp, def, atk;
      }
    }

    // LOGICIEL DE DESSIN
    if (msg.includes("quel logiciel") || msg.includes("quoi comme logiciel")) {
      client.say(channel, "@" + user['display-name'] + " Elle utilise Photoshop.");
    }
    // REGLES SHIFUSUB
    if (msg.includes("!shifusub")) {
      client.say(channel, "Vous pouvez attaquer quelqu'un au Shifusub en le tagant via cette commande. Shifumi classique, le perdant offre un sub ou plus. BO 1.");
    }
    // SHIFUSUB DEFI
    if (msg.includes("shifusub @")) {
      let words = msg.split("@");
      def = words[1];
      atk = user['display-name'];
      client.say(channel, "@" + def + " => @" + user['display-name'] + " te défie " +  " au shifusub. Pour accepter il faut répondre \"J'accepte le défi\"");
      return def, atk;
    }
    // SHIFUSUB ACCEPT
    if (msg.includes("j'accepte le défi")) {
      if (user.username == def) {
        let words = msg.split(" ");
        client.say(channel, "@" + user['display-name'] + " accepte le shifusub de @" + atk + " . Les règles sont simples : je fais un décompte de 3 à 0, au moment ou je dit \"0\", les deux candidats envoient leur réponse parmi les 3 suivantes : Pierre, Feuille, Ciseaux. Le perdant offre un sub !");
        a = setInterval(clearInts, 7000); // Temps de lecture du paragraphe
      }
    }
    // @bobleherisson
    if (msg.includes("@bobleherisson") || msg.includes("bob")) {
      // DIRE BONJOUR
      if (msg.includes("salut ") || msg.includes("hey ") || msg.includes("hello ") || msg.includes("coucou") || msg.includes("bonjour") || msg.includes("wesh")){
        let r = getRandomInt(answers[0].length);
        client.say(channel, "@" + user['display-name'] + answers[0][r]);
      }
      // CHANTE NOUS UNE CHANSON
      if (msg.includes("chante")){
        let r = getRandomInt(answers[1].length);
        client.say(channel, answers[1][r]);
      }
      // RE
      if (msg.search("re ") == 0){
        client.say(channel, "@" + user['display-name'] + " re bro");
      }
      // REMERCIEMENT
      if (msg.includes("merci ")) {
        client.say(channel, "@" + user['display-name'] + " De rien !");
      }
      // JE T'AIME BOB
      if (msg.includes("je t'aime") || msg.includes("jtm")){
        client.say(channel, "@" + user['display-name'] + " Heu... Désolé, mon seul amour c'est la raclette.");
      }
      // EST CE QU'IL VA BIEN ?
      if (msg.includes("comment va") || msg.includes("ça va")){
        client.say(channel, "@" + user['display-name'] + " tranquille on fait aller frer laoriaDoge");
      }
      // INSULTE
      if (msg.includes("tg") || msg.includes("ta gueule") || msg.includes("enculé") || msg.includes("connard") || msg.includes("con ") ||msg.includes("fdp") || msg.includes("ferme l")){
        client.say(channel, "/timeout "+ user.username + " 300s", "On insulte pas le bot.");
        client.say(channel, "@" + user['display-name'] + " Pardon ? J'ai cru mal lire.")
      }
    }
    // MARIE EST LAAAAAA
    if (user.username == "marie8975" && marie == false) {
        marie = true;
        if (marie) {
          client.say(channel, "/me MARIE EST ARRIVÉE !");
        }
        return marie;
    }
    // XOUNEH LE DIEU
    if (user.username == "xouneh" && xouneh == false) {
        xouneh = true;
        if (xouneh) {
          let r = getRandomInt(answers[2].length);
          client.say(channel, answers[2][r]);
        }
        return xouneh;
    }
    // LA SR C'EST NON
    // if (msg.includes(" sr ")) {
    //   client.say(channel, "❌ LA SR C'EST NON ❌");
    // }


    // COMMANDES
    if(fullCommand){
        let command = fullCommand[1];
        let param = fullCommand[2];

        switch(command){
            case "zenvious":
                client.say(channel, "Commandant de l'armée des pogoteurs et 2nd meilleur modal laoriaTrigger");
                break;
            case "discord":
                client.say(channel, "Rejoindez la secte : https://discord.gg/rJcqE5");
                break;
            case "insta":
                client.say(channel, "Viendez voir les dessins : https://www.instagram.com/_laoria_/");
                break;
            case "twitter":
                client.say(channel, "Lisez les meilleurs tweets : https://twitter.com/laoria_");
                break;
            case "mc":
                client.say(channel, "Texture Pack : Ozocraft. Shaders : BSL. N'hésitez pas à rejoindre le serveur ouvert à tous ! => mc.laoria.fr");
                break;
            case "etudes":
                client.say(channel, "Elle a suivi la prépa Design & Digital à Artline l'an dernier, ce qui lui a donné les bases en dessin. Depuis, elle apprend en autodidacte pour le plaisir. Sinon, elle est graphiste branding / webdesigner à son compte. VOILÀ.");
                break;
            case "english":
                client.say(channel, "She can only say : \"DO YOU WANT A CUP OF TEEEEAAAAAAAAA\" laoriaTea !");
                break;
            case "tab":
                client.say(channel, "Elle a une tablette Wacom Intuos Pro en Small (A5). Yes.");
                break;
            case "invi":
                client.say(channel, "Soyez pas triste si elle vous lit pas. Elle sait que vous l'aimez même si elle sait pas que vous êtes là !");
                break;
            case "doublage":
                client.say(channel, "Un live doublage est en préparation laoriaWoaw");
                break;
            case "don":
                client.say(channel, "Les dons ne sont pas activés. Pour soutenir la chaîne faites des dons aux modos Kappa");
                break;
            case "play":
              if (isModerator(user)) {
                client.say(channel, "!play");
              }
                break;
            case "pogoon":
              if (isModerator(user)) {
                client.say(channel, "/emoteonly")
                client.say(channel, "TOUT LE MONDE HEADBANG laoriaTrigger laoriaTrigger laoriaTrigger laoriaTrigger laoriaTrigger laoriaTrigger");
              }
                break;
            case "pogooff":
              if (isModerator(user)) {
                client.say(channel, "/emoteonlyoff")
                client.say(channel, "Merci pour ce pogo de QUA-LI-TÉ !");
              }
                break;

            default:
        }
    }
});

// NEW SUB
client.on("subscription", (channel, username, method, message, userstate) => {
  todaySubs++;
  client.say(channel, "/me Merci pour l'abonnement " + username + " laoriaWoaw (🐴+"+todaySubs+")");
  client.say(channel, "laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw laoriaWoaw");
  return todaySubs;
});
// RE SUB
client.on("resub", (channel, username, months, message, userstate, methods) => {
  todaySubs++;
  let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
  client.say(channel, "/me " + username + " repart pour un mois ! Total de " + cumulativeMonths + " mois laoriaWoaw (🐴+"+todaySubs+")");
  return todaySubs;
});
// SUB GIFT
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, "/me " + username + " a offert " + numbOfSubs + " à la chaine ! Au total, il a offert " + senderCount + " abonnements laoriaWoaw (🐴+"+todaySubs+")");
});
client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  todaySubs++;
  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, "/me " + username + " a offert un abonnement cadeau à " + recipient + " laoriaWoaw (🐴+"+todaySubs+")");
  return todaySubs;
});
// RAIDS
client.on("raided", (channel, username, viewers) => {
  client.say(channel, "/me OSKOUR ON SE FAIT RAID laoriaShocked ! Merci " + username + " pour les " + viewers + " viewers laoriaWoaw");
});
