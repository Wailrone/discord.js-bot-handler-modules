"use strict";

import {Client, Collection, Intents, LimitedCollection, Options,} from "discord.js";
import {ConfigFile} from "./src/utils/Constants"
import CommandsManager from "./src/utils/CommandsManager";
import Logger from "./src/utils/Logger";
import * as config from "./config.json";
import ComponentsManager from "./src/utils/ComponentsManager";
import ModulesManager from "./src/utils/ModulesManager";
import SubEventsManager from "./src/utils/SubEventsManager";
import CommandsSetter from "./src/utils/CommandsSetter";
import Command from "./src/utils/Command";

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
            restTimeOffset: 0,
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                Intents.FLAGS.GUILD_MESSAGE_TYPING],
            partials: ["CHANNEL"],
            makeCache: Options.cacheWithLimits({
                MessageManager: {
                    sweepInterval: 300,
                    sweepFilter: LimitedCollection.filterByLifetime({
                        lifetime: 900,
                        getComparisonTimestamp: e => e?.editedTimestamp ?? e?.createdTimestamp,
                    })
                },
                ThreadManager: {
                    sweepInterval: 3600,
                    sweepFilter: LimitedCollection.filterByLifetime({
                        getComparisonTimestamp: e => e.archiveTimestamp,
                        excludeFromSweep: e => !e.archived,
                    }),
                }
            }),
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
            }
            catch (e) {
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
