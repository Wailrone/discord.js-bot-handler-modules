"use strict";


import type Context from "../../../utils/Context";
import Command from "../../../utils/Command";

export default class extends Command {
    constructor() {
        super({
            name: "User informations",
            category: "contextMenus",
            type: "USER",
            cooldown: 5000,
        });
    }

    async run(ctx: Context) {
        ctx.module.commandsManager.findCommand('userinfos').run(ctx);
    }

}