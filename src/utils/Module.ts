import Client from "../../main";
import Command from "./Command";
import CommandsManager from "./CommandsManager";
import EventsManager from "./EventsManager";
import ModuleEvent from "./ModuleEvent";
import { Collection } from "discord.js";
import ComponentsManager from "./ComponentsManager";
import Component from "./Component";
import ModuleFunctions from "./ModuleFunctions";

export default class Module {
	public name: string;
	public commandsManager: CommandsManager;
	public eventsManager: EventsManager;
	public componentsManager: ComponentsManager;
	public config: object;
	public functions: typeof ModuleFunctions;
	private _client: typeof Client;

	constructor(client: typeof Client, name: string) {
		this._client = client;
		this.name = name;
		this.commandsManager = new CommandsManager(client, this);
		this.eventsManager = new EventsManager(client, this);
		this.componentsManager = new ComponentsManager(client, this);
		this.config = {};
		this.functions = class extends ModuleFunctions {};
		this.initModule();
	}

	get commands(): Collection<string, Command> {
		return this.commandsManager.commands;
	}

	get events(): Collection<string, ModuleEvent> {
		return this.eventsManager.events;
	}

	get components(): Collection<string, Component> {
		return this.componentsManager.components;
	}

	initModule() {
		try {
			this.commandsManager.loadCommands();
			this._client.logger.info(
				`[Modules] [${this.name}] [Commands] Loaded ${this.commandsManager.commands.size} commands`
			);

			this.eventsManager.loadEvents();
			this._client.logger.info(
				`[Modules] [${this.name}] [Events] Loaded ${this.eventsManager.events.size} events`
			);

			this.componentsManager.loadComponents();
			this._client.logger.info(
				`[Modules] [${this.name}] [Components] Loaded ${this.componentsManager.components.size} components`
			);
		} catch (error) {
			this._client.logger.error(
				`[Modules] [${this.name}] [Components] Error while loading components : ${error}`
			);

			this._client.logger.error(`[Modules] [${this.name}] Error while loading module elements : ${error}`);
		}
	}
}
