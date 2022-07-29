"use strict";

import Client from "../../main";
import { resolve } from "path";
import { Collection } from "discord.js";
import CommandsManager from "./CommandsManager";
import ComponentsManager from "./ComponentsManager";
import Module from "./Module";
import { accessSync, readdirSync, statSync } from "fs";

export default class ModulesManager {
	public commands: CommandsManager;
	public components: ComponentsManager;
	private readonly _client: typeof Client;
	private readonly _path: string;

	constructor(client: typeof Client) {
		this._client = client;
		this._path = resolve(__dirname, "..", "modules");
	}

	private _modules: Collection<string, Module> = new Collection();

	get modules() {
		return this._modules;
	}

	findModule(name: string) {
		return this._modules.find((module: Module) => module.name === name);
	}

	findComponentModule(name: string): Module {
		return this._modules.find((module: Module) => !!module.componentsManager.findComponent(name));
	}

	findComponent(name: string) {
		return this.findComponentModule(name).componentsManager.findComponent(name);
	}

	findCommandModule(name: string) {
		return this._modules.find((module: Module) => !!module.commandsManager.findCommand(name));
	}

	findCommand(name: string) {
		return this.findCommandModule(name)?.commandsManager?.findCommand(name);
	}

	addModule(name: string) {
		this._modules.set(name, new Module(this._client, name));
	}

	loadModules() {
		try {
			accessSync(this._path);
		} catch (error) {
			return;
		}
		const modules = readdirSync(this._path);
		if (!modules || modules.length > 0) {
			for (const module of modules) {
				const modulePath = resolve(this._path, module);
				const moduleStats = statSync(modulePath);
				if (moduleStats.isDirectory()) {
					this.addModule(module);
					const createdModule = this._modules.get(module);

					const configPath = resolve(modulePath, "config.json");
					const configStats = statSync(configPath);
					if (configStats.isFile()) createdModule.config = require(configPath);

					const functionsPath = resolve(modulePath, "functions.js");
					const functionsStats = statSync(functionsPath);
					if (functionsStats.isFile()) {
						// eslint-disable-next-line @typescript-eslint/no-var-requires
						const functionClass = require(functionsPath)?.default;
						if (!functionClass) continue;
						createdModule.functions = new functionClass(this._client);
					}
				}
			}
		}
	}
}
