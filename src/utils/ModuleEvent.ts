"use strict";

import Client from "../../main";
import {ApplicationCommandOptionData, ApplicationCommandType, Collection, PermissionResolvable} from "discord.js";
import type Context from "./Context";

interface ModuleEventInfo {
    client: typeof Client;
    name: string;
    module: string;
}

export default abstract class ModuleEvent {

    client: typeof Client;
    name: string;
    module: string;

    constructor(info: ModuleEventInfo) {
        this.client = info.client;
        this.name = info.name;
        this.module = info.module;
    }

    abstract run(...args: any): Promise<void>;
}