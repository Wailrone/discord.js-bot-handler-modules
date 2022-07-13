"use strict";

import {Client, IntentsBitField, Partials} from "discord.js";
import {ConfigFile} from "./src/utils/Constants"
import Logger from "./src/utils/Logger";
import * as config from "./configuration.json";
import ComponentsManager from "./src/utils/ComponentsManager";
import ModulesManager from "./src/utils/ModulesManager";
import SubEventsManager from "./src/utils/SubEventsManager";
import CommandsSetter from "./src/utils/CommandsSetter";

class Bot extends Client {
    config: ConfigFile;
    logger: Logger;
    commands!: CommandsSetter;
    components!: ComponentsManager;
    modules!: ModulesManager;
    userCooldown: Map<string, boolean>;
    moduleFunctions: (moduleName: string) => any;
    moduleConfig: (moduleName: string) => any;
    subevents!: SubEventsManager;

    constructor() {
        super({
            rest: {
                offset: 0,
            },
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildBans,
                IntentsBitField.Flags.GuildMessageReactions,
                IntentsBitField.Flags.GuildIntegrations,
                IntentsBitField.Flags.GuildWebhooks,
                IntentsBitField.Flags.GuildEmojisAndStickers,
                IntentsBitField.Flags.GuildVoiceStates,
                IntentsBitField.Flags.DirectMessages,
                IntentsBitField.Flags.DirectMessageReactions,
                IntentsBitField.Flags.DirectMessageTyping,
                IntentsBitField.Flags.GuildScheduledEvents,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.GuildMessageTyping,
            ],
            partials: [
                Partials.Channel,
            ],
            sweepers: {
                messages: {
                    interval: 300,
                    lifetime: 900,
                },
                threads: {
                    interval: 3600,
                    lifetime: 900,
                }
            }
        });
        this.config = config as ConfigFile;
        this.logger = new Logger(`Shard #${this.shard?.ids?.toString() ?? "0"}`);
        this.userCooldown = new Map();

        this.launch().then(async () => {
            this.modules = new ModulesManager(this);

            try {
                this.modules.loadModules()
                this.logger.success(`[Modules] Loaded ${this.modules?.modules.size} modules`);
                this.commands = new CommandsSetter(this);
                this.subevents = new SubEventsManager(this);
            } catch (e) {
                this.logger.error(`[Modules] Error while loading modules: ${e}`)
            }

            await this.logger.debug(`Connecté en tant que ${this.user.tag}`)

        }).catch(error => {
            this.logger.error(`[LaunchError] An error occured at startup ${error}`, error.stack);
        });
    }

    async launch() {
        try {
            await this.login(this.config.bot.token);
            this.logger.success("[WS] Connected to discord");
        } catch (error) {
            this.logger.error(`[WS] Connection error: ${error}`);
            return process.exit(1);
        }

        process.on("unhandledRejection", (error: Error) => {
            this.logger.error(`[UnhandledRejection] An error occured: ${error}`, error.stack);
        });
    }
}

export default new Bot();
