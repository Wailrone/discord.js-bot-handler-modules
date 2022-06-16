"use strict";

import Command from "../../../utils/Command";
import Context from "../../../utils/Context";
import Client from "../../../../main";
import ModuleCommand from "../../../utils/ModuleCommand";

export default class extends ModuleCommand {
    constructor() {
        super({
            name: "kick",
            module: "mod",
            category: "owners",
            description: "kick a code.",
            botPerms: ["ADMINISTRATOR"],
            ownerOnly: true,
            options: [{
                type: 'STRING',
                name: 'kickingthing',
                required: true,
                description: 'Code to kick.'
            }],
        });
    }

    async run(ctx: Context) {
        await ctx.reply(ctx.moduleConfig(this.module).property)
    }
}
