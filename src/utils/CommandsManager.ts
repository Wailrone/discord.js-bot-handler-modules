"use strict";

// ici on gère nos commandes pour les charger ou en trouver une avec la fonction findCommand pour une command help

import Client from "../../main";
import {resolve} from "path";
import {ApplicationCommandManager, Collection} from "discord.js";
import {access, readdir, stat} from "fs/promises";
import Command from "./Command";
import Module from "./Module";
import {accessSync, existsSync, readdirSync, statSync} from "fs";

export default class CommandsManager {
    private _client: typeof Client;
    private _path: string;
    private _globalCommands: ApplicationCommandManager;
    private _module: Module;

    constructor(client: typeof Client, module: Module) {
        this._client = client;
        this._module = module;
        this._path = resolve(__dirname, "..", "modules", this._module.name, "commands");
        this._commands = new Collection();
        if (!this._client.application) throw new Error("Appication is null");
        this._globalCommands = this._client.application.commands;
    }

    private _commands: Collection<string, Command>;

    get commands() {
        return this._commands;
    }

    addCommand(command: Command) {
        this._commands.set(command.name.toLowerCase(), command);
    }

    findCommand(name: string) {
        if (!name || typeof name !== "string") return undefined;
        return this._commands.find((cmd) => {
            return cmd.name.toLowerCase() === name.toLowerCase();
        });
    }

    loadCommands() {
        try {
            accessSync(this._path);
        } catch (error) {
            return this._client.logger.warn(`[Modules] [${this._module.name}] [Commands] No commands found in module ${this._module.name}`);
        }

        const stats = statSync(this._path);
        if (stats.isDirectory()) {
            const commands = readdirSync(this._path);
            if (commands && commands.length > 0) {
                for (const command of commands) {
                    const cmdPath = resolve(this._path, command);
                    const cmdStats = statSync(cmdPath);

                    if (cmdStats.isFile() && command.endsWith(".js")) {
                        this.addCommand(new (require(cmdPath)?.default));
                    }
                }
            }
        }
    }
}