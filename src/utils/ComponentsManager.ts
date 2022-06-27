"use strict";

import Client from "../../main";
import {resolve} from "path";
import {Collection} from "discord.js";
import {access, readdir, stat} from "fs/promises";
import Component from "./Component";
import Module from "./Module";
import {accessSync, existsSync, readdirSync, statSync} from "fs";

export default class ComponentsManager {
    private _client: typeof Client;
    private _path: string;
    private _module: Module;

    constructor(client: typeof Client, module: Module) {
        this._client = client;
        this._module = module;
        this._components = new Collection();
        this._path = resolve(__dirname, "..", "modules", this._module.name, "components");
    }

    private _components: Collection<string, Component>;

    get components() {
        return this._components;
    }

    addComponent(component: Component) {
        this._components.set(component.customId.toLowerCase(), component);
    }

    findComponent(name: string) {
        if (!name || typeof name !== "string") return undefined;
        return this._components.find((comp) => {
            return comp.customId.toLowerCase() === name.toLowerCase();
        });
    }

    loadComponents() {
        try {
            accessSync(this._path);
        } catch (error) {
            return this._client.logger.warn(`[Modules] [${this._module.name}] [Components] No components found in module ${this._module.name}`);
        }

        const stats = statSync(this._path);
        if (stats.isDirectory()) {
            const components = readdirSync(this._path);
            if (components && components.length > 0) {
                for (const component of components) {
                    const compPath = resolve(this._path, component);
                    const compStats = statSync(compPath);

                    if (compStats.isFile() && component.endsWith(".js")) {
                        this.addComponent(new (require(compPath)?.default));
                    }
                }
            }
        }
    }
}