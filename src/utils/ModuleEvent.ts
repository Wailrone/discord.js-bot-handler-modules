"use strict";

import Client from "../../main";
import {ApplicationCommandType, Events} from "discord.js";
import Module from "./Module";

interface ModuleEventInfo {
    client: typeof Client;
    name: Events;
}

export default abstract class ModuleEvent {

    client: typeof Client;
    name: Events;
    module: Module;

    constructor(info: ModuleEventInfo) {
        this.client = info.client;
        this.name = info.name;
    }

    abstract run(...args: any): Promise<void>;
}