"use strict";


import type Context from "../../../utils/Context";
import Command from "../../../utils/Command";
import {ApplicationCommandType} from "discord.js";

export default class extends Command {
    constructor() {
        super({
            name: "User informations",
            category: "contextMenus",
            type: ApplicationCommandType.User,
            cooldown: 5000,
        });
    }

    async run(ctx: Context) {
        ctx.module.commandsManager.findCommand('userinfos').run(ctx);
    }

}