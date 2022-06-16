"use strict";

import Client from "../../main";
import {resolve} from "path";
import {access, readdir, stat} from "fs/promises";
import Component from "./Component";
import Command from "./Command";
import ModuleEvent from "./ModuleEvent";
import {Collection} from "discord.js";

export default class ModulesManager {
    private _client: typeof Client;
    private _path: string;

    constructor(client: typeof Client) {
        this._client = client;
        this._path = resolve(__dirname, "..", "modules");
    }

    private _modules: Collection<string, any> = new Collection();

    get modules() {
        return this._modules;
    }

    addModule(name: string) {
        this._modules.set(name, {
            events: new Collection(),
        });
    }

    addModuleElement(module: string, type: string, file: ModuleEvent | Component | Command) {
        const fileName = (file instanceof Component) ? file.customId : file.name
        if (type === "commands" && file instanceof Command) return this._client.commands.addCommand(file);
        if (type === "components" && file instanceof Component) return this._client.components.addComponent(file);
        this._modules.get(module)[type].set(fileName, file);
    }

    findModule(module: string, type: string, name: string) {
        if (!name || typeof name !== "string") return undefined;
        return this._modules.get(module)[type].find((cmd: any) => {
            const fileName = (cmd instanceof Component) ? cmd.customId : cmd.name
            return fileName.toLowerCase() === name.toLowerCase();
        });
    }

    async loadModules() {
        try {
            await access(this._path);
        } catch (error) {
            return;
        }
        const modules = await readdir(this._path);
        if (!modules || modules.length > 0) {
            for (const module of modules) {
                const modulePath = resolve(this._path, module);
                const moduleStats = await stat(modulePath);
                if (moduleStats.isDirectory()) {
                    this.addModule(module);
                    try {
                        this._modules.get(module).config = require(resolve(modulePath, 'config.json'));
                    } catch (e) {
                        this._client.logger.warn(`[ModuleLoadWarning] No config file present for module ${module}`)
                    }
                    const folders = await readdir(modulePath);
                    if (folders && folders.length > 0) {
                        for (const folder of folders) {
                            const folderPath = resolve(this._path, module, folder);
                            const folderStats = await stat(folderPath);
                            if (folderStats.isDirectory()) {
                                const moduleElements = await readdir(folderPath);
                                if (moduleElements && moduleElements.length > 0) {
                                    for (const moduleElement of moduleElements) {
                                        const pathOfModuleElement = resolve(this._path, module, folder, moduleElement);
                                        const statsOfModuleElement = await stat(pathOfModuleElement);
                                        if (statsOfModuleElement.isFile() && moduleElement.endsWith('.js')) this.addModuleElement(module, folder, new (require(pathOfModuleElement)?.default)(this._client));
                                    }
                                }
                            } else if (folderStats.isFile() && folder.endsWith('.js')) {
                                this._modules.get(module).functions = new (require(folderPath)?.default)(this._client);
                            }
                        }
                    }
                }
            }
        }
    }
}