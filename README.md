# Bob Le Hérisson

Bob est un bot développé pour Laoria, streameuse dessin ayant une moyenne de 170 viewers. La communauté étant particulièrement bienveillante, Bob n'a pas besoin de supprimer de messages ou de bannir certains utilisateurs excessifs (les modos s'en chargent très bien).

## Installation

Le bot requier la librairie twitch tmi pour fonctionner :

`npm install tmi.js`

Il vous faudra ensuite changer la config tmi avec vos informations :

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
    
