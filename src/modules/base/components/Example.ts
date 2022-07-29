"use strict";

import type Context from "../../../utils/Context";
import Component from "../../../utils/Component";

export default class extends Component {
	constructor() {
		super({
			customId: "example",
			customIdParams: ["userId", "guildId"]
		});
	}

	async run(ctx: Context) {
		await ctx.reply("Hello world!");
		console.log(ctx.module.config);
		console.log(ctx.customIdParams);
	}
}
