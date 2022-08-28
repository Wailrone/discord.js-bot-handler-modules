"use strict";

// ici on gère nos commandes pour les charger ou en trouver une avec la fonction findCommand pour une command help

import Client from "../../main";
import {ApplicationCommandManager, ApplicationCommandType, Collection} from "discord.js";
import Command from "./Command";

class CommandsManager {
    private _client: typeof Client;
    private _globalCommands: ApplicationCommandManager;
    private readonly _commands: Collection<string, Command>;

    constructor(client: typeof Client) {
        this._client = client;
        if (!this._client.application) throw new Error("Appication is null");
        this._globalCommands = this._client.application.commands;
        this._commands = new Collection([...new Set([].concat(...(this._client.modules.modules.map((module) => Array.from(module.commands)))))])
        this.setCommands();
    }

    get fetch() {
        return this._commands;
    }

    setCommands() {

        function areSameOptions(a1: any[], a2: any[]): boolean {
            function washUndefinedAndFalse(objs: any[]) {
                return objs?.map(obj => Object.fromEntries(Object.entries(obj).filter(e => e[1])))
            }

            function objectsEqual(o1: any, o2: any): boolean {
                return typeof o1 === 'object' && Object.keys(o1).length > 0
                    ? Object.keys(o1).length === Object.keys(o2).length
                    && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
                    : o1 === o2;
            }

            a1 = washUndefinedAndFalse(a1);
            a2 = washUndefinedAndFalse(a2);
            return a1?.length === a2?.length && a1?.every((obj, i) => objectsEqual(obj, a2[i]));
        }

        if (this._globalCommands.cache.some(cmd => (this._commands.get(cmd.name)?.description || "") !== cmd?.description || !areSameOptions(this._commands.get(cmd.name)?.options || [], cmd.options || [])
        )) {

            this._globalCommands.set(this._commands.map((cmd) => {
                if (cmd.type !== ApplicationCommandType.ChatInput) return {
                    name: cmd.name,
                    type: cmd.type,
                    defaultMemberPermissions: cmd.userPerms,
                }
                else return {
                    name: cmd.name,
                    type: cmd.type,
                    description: cmd.description,
                    options: cmd.options,
                    defaultMemberPermissions: cmd.userPerms,
                }
            }));
            console.info("[Commands] Refresh the globals commands");
        }
    }
}

export default CommandsManager;