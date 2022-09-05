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

---

## Les modules

Les modules vous permettront de créer un dossier propre à une seule fonctionnalité de votre bot. Vous pourrez ainsi
simplement glisser le dossier vers un bot utilisant la même structure.

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
    │       Component.ts
    │
    └───events
            Event.ts
```

### Configurations et fonctions du module

Vous avez également la possibilité d'ajouter un fichier `config.json` et un fichier `functions.ts` dans le dossier du
module. Vous aurez la possibilité d'appeller les fonctions via `ctx.module.config` ou `ctx.module.functions` dans un
fichier de `Command` ou de `Component`. Dans un fichier d'`Event`, vous pourrez appeler les fonctions
via `this.module.config` ou `this.module.functions`.
Voici la structure du fichier `functions.ts` :

```ts
import Client from "../../../main";
import ModuleFunctions from "../../utils/ModuleFunctions";

export default class Functions extends ModuleFunctions {
    client: typeof Client;

    constructor(client: typeof Client) {
        super(client);
    }

    exampleFunction(argument: string): boolean {
        console.log(argument, this.client.user?.tag);
        return true
    }

}
```

De la même façon que `exampleFunction`, vous pouvez rajouter autant de fonctions que vous le souhaitez.
Concernant le fichier `config.json`, vous pouvez l'organiser comme vous voulez. Voici un exemple :

```json
{
  "property": "Value 117"
}
```

## Les events

Voici la structure de base d'un event :

```ts
"use strict";

import type Client from "../../../../main";
import {Events, Message, TextChannel} from "discord.js";
import ModuleEvent from "../../../utils/ModuleEvent";

export default class extends ModuleEvent {
    dmChannel: DmChanneService;

    constructor(client: typeof Client) {
        super({
            client: client,
            name: Events.MessageCreate,
        });
        this.client = client;
    }

    async run(message: Message) {
        // Your code here ( example for messageCreate event )
    }
}
````

### Les options d'un event

* `name` : [`Events`](https://discord.js.org/#/docs/discord.js/main/typedef/Events) - Nom de l'event. `Défaut : null`

## Les commandes

Voici la structure de base d'une commande, dans une commande, vous avez accès au [`Context`](#context). via `ctx` :

```ts
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
            userPerms: [PermissionsBitField.Flags.Administrator],
            ownerOnly: true,
            options: [{
                type: ApplicationCommandOptionType.String,
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

### Les options de la commande

* `name` : `string` - Nom de la commande. `Défaut : null`
* `description` : `string` - Description de la commande. `Défaut : null`
* `category` : `string` - Catégorie de la commande. `Défaut : null`
* `examples` : `string[]` - Exemples de commandes. `Défaut : []`
* `options` : [`ApplicationCommandOptionData[]`](https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOptionData) - Options de la commande. `Défaut : []`
* `userPerms` : [`PermissionResolvable`](https://discord.js.org/#/docs/discord.js/main/typedef/PermissionResolvable) - Permissions requises pour utiliser la commande. `Défaut : []`
* `botPerms` : [`PermissionResolvable`](https://discord.js.org/#/docs/discord.js/main/typedef/PermissionResolvable) - Permissions requises par le bot pour utiliser cette commande. `Défaut : []`
* `disabled` : `boolean` - Si la commande est désactivée ou non. `Défaut : false`
* `ownerOnly` : `boolean` - Si la commande est réservée aux propriétaires du bot. `Défaut : false`
* `cooldown` : `number` - Temps de cooldown en ms entre chaque exécution de la commande. `Défaut : false`
* `type` : [`ApplicationCommandType`](https://discord-api-types.dev/api/discord-api-types-v10/enum/ApplicationCommandType) - Type de la commande. `Défaut : ApplicationCommandType.ChatInput`
* `isAvailableInDM` : `boolean` - Si la commande est disponible en messages privés ou non. `Défaut : false`

## Les components

Voici la structure de base d'un component, dans un component, vous avez accès au [`Context`](#context). via `ctx` :

```ts
"use strict";


import type Context from "../../../utils/Context";
import Component from "../../../utils/Component";

export default class extends Component {
    constructor() {
        super({
            customId: "example",
            customIdParams: ["userId", "guildId"],
        });
    }

    async run(ctx: Context) {
        // Your code here
    }
}
````

### Les options de la commande

* `customId` : `string` - Identifiant unique du component. `Défaut : null`
* `customIdParams` : `string[]` - Nom des paramètres présents dans les components. `Défaut : []`

### Fonctionnement des components

Lorsque vous créez un component, vous pouvez ajouter des paramètres dans l'identifiant du component. Pour cela, il
suffit de les séparer avec des `:`.

#### Voici un exemple :

Vous souhaitez faire un bouton qui supprime un message précis dans un salon précis.
Lorsque vous allez créer votre component vous mettrez votre identifiant sous le format
suivant : `deleteMessage:channelId:messageId`.

- Nous allons partir du principe que l'identifiant sera `deleteMessage:812366241679147048:831511069948117012`
  Dans le fichier correspondant à ce component, vous allez pouvoir mettre en
  options `customIdParams : ["channelId", "messageId"]`.
- Lorsqu'un utilisateur cliquera sur le bouton, vous allez pouvoir récupérer les paramètres dans le `Context`
  via `ctx.customIdParams`, et le customId ( ici `deleteMessage` via `ctx.customId` ). Donc`ctx.customIdParams` vaudra :

```json
{
  channelId: "812366241679147048",
  messageId: "831511069948117012"
}
```

## Context

### ⚠️ Zone en travaux 🚧

```js
console.log('Coming soon ! La documentation est en cours de rédaction.')
```

## <p style="display:flex; align-items:center">Des questions ? Rejoignez mon serveur Discord <a href="https://discord.gg/BC3rE6f7GB"><img src="https://i.imgur.com/2p6wEQu.png" height="90px"></a></p>
