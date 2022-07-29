"use strict";

import Client from "../../main";
import Module from "./Module";

interface ModuleEventInfo {
	client: typeof Client;
	name: string;
}

export default abstract class ModuleEvent {
	client: typeof Client;
	name: string;
	module: Module;

	constructor(info: ModuleEventInfo) {
		this.client = info.client;
		this.name = info.name;
	}

	// eslint-disable-next-line no-unused-vars
	abstract run(...args: unknown[]): Promise<void>;
}
