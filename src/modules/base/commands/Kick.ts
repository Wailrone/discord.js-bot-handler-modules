"use strict";

import Command from "../../../utils/Command";
import Context from "../../../utils/Context";
import Client from "../../../../main";

export default class extends Command {
    constructor() {
        super({
            name: "kick",
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
        ctx.module.functions.coucouZebi()
    }
}
