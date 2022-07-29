"use strict";

import type Context from "./Context";

interface CommandInfo {
	customId: string;
	customIdParams?: string[];
}

export default abstract class Component {
	customId: string;
	customIdParams: string[];

	constructor(info: CommandInfo) {
		this.customId = info.customId;
		this.customIdParams = info.customIdParams || [];
	}

	// eslint-disable-next-line no-unused-vars
	abstract run(ctx: Context): void;
}
