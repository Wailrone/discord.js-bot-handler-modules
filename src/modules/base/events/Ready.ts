"use strict";

import type Client from "../../../../main";
import ModuleEvent from "../../../utils/ModuleEvent";
import {Constants, Events} from "discord.js";

export default class extends ModuleEvent {

    constructor(client: typeof Client) {
        super({
            client : client,
            name : Events.ClientReady,
            module : "base"
        });
        this.client = client;
    }

    async run() {

    }
}