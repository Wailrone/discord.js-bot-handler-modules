"use strict";

import type Client from "../../../../main";
import {Constants, TextChannel} from "discord.js";
import {NewMessage} from "../../../utils/Constants";
import DmChanneService from '../../../services/DmChannelService'
import ModuleEvent from "../../../utils/ModuleEvent";

export default class extends ModuleEvent {
    dmChannel: DmChanneService;

    constructor(client: typeof Client) {
        super({
            client : client,
            name : Constants.Events.MESSAGE_CREATE,
            module : "base"
        });
        this.client = client;
        this.dmChannel = new DmChanneService(this.client)
    }

    async run(message: NewMessage) {
        if (!message.guild) return await this.dmChannel.handle(message)
        if (!(message.channel instanceof TextChannel)) return
    }
}