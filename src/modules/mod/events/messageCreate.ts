"use strict";

import Client from "../../../../main";
import {Message} from "discord.js";
import ModuleEvent from "../../../utils/ModuleEvent";
import {Constants} from "discord.js";

export default class extends ModuleEvent {

    constructor(client: typeof Client) {
        super({
            client: client,
            name: Constants.Events.MESSAGE_CREATE,
            module: "mod"
        });
    }

    async run(message: Message) {

    }

}
