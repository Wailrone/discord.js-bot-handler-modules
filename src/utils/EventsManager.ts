"use strict";

// ici on gère nos commandes pour les charger ou en trouver une avec la fonction findCommand pour une command help

import Client from "../../main";
import {resolve} from "path";
import {ApplicationCommandManager, Collection} from "discord.js";
import {access, readdir, stat} from "fs/promises";
import Command from "./Command";
import Module from "./Module";
import {accessSync, existsSync, readdirSync, statSync} from "fs";
import ModuleEvent from "./ModuleEvent";

export default class EventsManager {
    private _client: typeof Client;
    private _path: string;
    private _module: Module;
    private _events: Collection<string, ModuleEvent>;

    constructor(client: typeof Client, module: Module) {
        this._client = client;
        this._module = module;
        this._path = resolve(__dirname, "..", "modules", this._module.name, "events");
        this._events = new Collection();
    }

    get events() {
        return this._events;
    }

    addEvent(event: ModuleEvent) {
        this._events.set(event.name.toLowerCase(), event);
    }

    findEvent(name: string) {
        if (!name || typeof name !== "string") return undefined;
        return this._events.find((evt) => {
            return evt.name.toLowerCase() === name.toLowerCase();
        });
    }

    loadEvents() {
        try {
            accessSync(this._path);
        } catch (error) {
            return this._client.logger.warn(`[Modules] [${this._module.name}] [Events] No events found in module ${this._module.name}`);
        }

        const stats = statSync(this._path);
        if (stats.isDirectory()) {
            const events = readdirSync(this._path);
            if (events && events.length > 0) {
                for (const event of events) {
                    const cmdPath = resolve(this._path, event);
                    const cmdStats = statSync(cmdPath);

                    if (cmdStats.isFile() && event.endsWith(".js")) {
                        this.addEvent(new (require(cmdPath)?.default)(this._client));
                    }
                }
            }
        }
    }
}