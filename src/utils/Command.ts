"use strict";

import type {ApplicationCommandOptionData, PermissionResolvable} from "discord.js";
import {ApplicationCommandType} from "discord.js";
import type Context from "./Context";

export interface CommandInfo {
    name: string;
    description?: string;
    category: string;
    options?: ApplicationCommandOptionData[];
    examples?: string[];
    userPerms?: PermissionResolvable;
    botPerms?: PermissionResolvable;
    disabled?: boolean;
    ownerOnly?: boolean;
    type?: ApplicationCommandType;
    cooldown?: number;
    isAvailableInDM?: boolean;
}

export default abstract class Command {
    name: string;
    description: string;
    category: string;
    options: ApplicationCommandOptionData[];
    examples: string[];
    userPerms: PermissionResolvable;
    botPerms: PermissionResolvable;
    disabled: boolean;
    ownerOnly: boolean;
    cooldown: number;
    type: ApplicationCommandType;
    isAvailableInDM: boolean;

    constructor(info: CommandInfo) {
        this.name = info.name;
        this.category = info.category;
        this.description = info.description;
        this.options = info.options || [];
        this.examples = info.examples || [];
        this.userPerms = info.userPerms || [];
        this.botPerms = info.botPerms || [];
        this.disabled = info.disabled || false;
        this.ownerOnly = info.ownerOnly || false;
        this.cooldown = info.cooldown || 3000;
        this.type = info.type || ApplicationCommandType.ChatInput;
        this.isAvailableInDM = info.isAvailableInDM || false;
    }

    abstract run(ctx: Context): void;
}