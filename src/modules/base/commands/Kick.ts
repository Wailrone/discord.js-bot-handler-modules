"use strict";

import Command from "../../../utils/Command";
import Context from "../../../utils/Context";
import { ApplicationCommandOptionType, PermissionsBitField } from "discord.js";

export default class extends Command {
	constructor() {
		super({
			name: "kick",
			category: "owners",
			description: "kick a code.",
			botPerms: [PermissionsBitField.Flags.Administrator],
			ownerOnly: true,
			userPerms: [PermissionsBitField.Flags.Administrator],
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "kickingthing",
					required: true,
					description: "Code to kick."
				}
			]
		});
	}

	async run(ctx: Context) {
		await ctx.reply("Not implemented yet.");
		// ctx.module.functions.coucouZebi();
	}
}
