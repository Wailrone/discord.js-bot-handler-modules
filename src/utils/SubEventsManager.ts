"use strict";

import {Collection, Constants} from "discord.js";
import Client from "../../main";
import ModuleEvent from "./ModuleEvent";

export default class ModulesManager {
    modulesEvents: Collection<string, ModuleEvent>[];

    constructor(client: typeof Client) {
        this.modulesEvents = client.modules.modules.map(m => m.events)
        for (const event of Object.entries(Constants.Events).map(v => v[1])) {
            client.on(event, (...args) => {
                for (const events of this.modulesEvents) {
                    events.find((e: ModuleEvent) => e.name === event)?.run(...args)
                }
            })
        }
    }
}