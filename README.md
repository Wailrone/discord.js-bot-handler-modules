# 📦 discord.js-bot-handler-modules

### Cette structure vous permettra de facilement automatiser certaines tâches sur votre bot Discord.

> #### Merci à [@warix8](https://github.com/warix8) pour la base de la structure. N'hésitez pas à aller visiter [son profil](https://github.com/warix8) pour plus d'informations.

# 📖 Documentation

## Les bases

### Le fichier config

Les différents paramètres du bot se feront pour la plupart dans le fichier `configuration.json`

```json
{
    "bot": {
        "mainColor": "#FFFFFF",
        "errorWebhook": "WEBHOOK_URL",
        "token": "TOKEN",
        "defaultContact": "Wailrone™#0666",
        "ownersIDs": [
            "393378313663676427"
        ]
    },
    "emotes": {
        "SUCCESS": "🟢",
        "ERROR": "🔴",
        "WARNING": "⚠"
    }
}
```

* `mainColor` - Couleur principale du bot, utilisée dans tous les embeds du bot.
* `errorWebhook` - Lien du webhook qui vous renverra les différentes erreurs de votre bot.
* `token` - Le token du bot.
* `defaultContact` - Lorsqu'une erreur apparaît, le bot enverra un message avec la personne à contacter par défaut.
* `ownersIDs` - Ce tableau contient la liste des propriétaires du bot.
* `emotes` - Couleur principale du bot, utilisée dans tous les embeds du bot.

### Démarrer le bot

Pour démarrer le bot, il vous suffit d'exécuter la commande `npm start`.
Vous pouvez modifier le script dans le fichier `package.json`.

La commande `tsc` va dans un premier temps compiler les fichiers TypeScript en JavaScript. La commande node
dist/shards.js va quant à elle lancer le shardingManager.

Tous les fichiers compilés vont dans le dossier `dist`

```json
  "scripts": {
      "start": "tsc && node dist/shards.js"
  },
```

### Héberger le bot

Pour héberger le bot, rien de plus simple. Il vous suffit d'exécuter la commande `tsc` et de récupérer les fichiers
présents dans le dossier `dist`. Bien évidemment, le dossier `dist` ne doit pas être conservé, seul son contenu doit "
remplacer" les fichier .ts

---

## Les modules

### Le module base

Dans le dossier `modules`, vous verrez le module `base`, il ne doit pas être supprimé. Vous pouvez cependant supprimer
les commandes et components du module base. Seuls les events sont essentiels.

### Ajouter un module

Dans le dossier `modules`, vous pouvez rajouter un dossier sur la base du module `base`.
Il doit contenir ces dossier et fichiers :

```
└───moduleName
    │   config.json
    │   functions.ts
    │
    ├───commands
    │       Command.ts
    │
    ├───components
    │       Componen.ts
    │
    └───events
            Event.ts
```

#### Structure du fichier commande :

Veuillez impérativement suivre cette structure.

````ts
"use strict";

import Command from "../../../utils/Command";
import Context from "../../../utils/Context";
import Client from "../../../../main";

export default class extends Command {
    constructor() {
        super({
            name: "commandName",
            category: "owners",
            description: "Command Description",
            botPerms: ["ADMINISTRATOR"],
            ownerOnly: true,
            options: [{
                type: 'STRING',
                name: 'option',
                required: true,
                description: 'Option Description.'
            }],
        });
    }

    async run(ctx: Context) {
        // Your code here
    }
}
````

Voir [la documentation liée aux commandes](#les-commandes) afin d'en savoir plus sur les différents paramètres.

```js
console.log('Coming soon !')
```


