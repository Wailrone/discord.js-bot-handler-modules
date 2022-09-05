"use strict";

import {ClientEvents, Collection, Events} from "discord.js";
import Client from "../../main";
import ModuleEvent from "./ModuleEvent";

export default class ModulesManager {
    modulesEvents: Collection<string, ModuleEvent>[];

    constructor(client: typeof Client) {
        this.modulesEvents = client.modules.modules.map(m => m.events)
        for (const event of Object.values(Events)) {
            client.on(event as keyof ClientEvents, (...args) => {
                for (const events of this.modulesEvents) {
                    events.find((e: ModuleEvent) => e.name === event)?.run(...args)
                }
            })
        }
    }
}