"use strict";

import type Client from "../../../../main";
import ModuleEvent from "../../../utils/ModuleEvent";
import {Constants} from "discord.js";

export default class extends ModuleEvent {

    constructor(client: typeof Client) {
        super({
            client : client,
            name : Constants.Events.CLIENT_READY,
            module : "base"
        });
        this.client = client;
    }

    async run() {

    }
}