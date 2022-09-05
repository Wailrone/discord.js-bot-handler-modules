"use strict";

import type Client from "../../../../main";
import {Events, Message, TextChannel} from "discord.js";
import DmChanneService from '../../../services/DmChannelService'
import ModuleEvent from "../../../utils/ModuleEvent";

export default class extends ModuleEvent {
    dmChannel: DmChanneService;

    constructor(client: typeof Client) {
        super({
            client: client,
            name: Events.MessageCreate,
        });
        this.client = client;
        this.dmChannel = new DmChanneService(this.client)
    }

    async run(message: Message) {
        console.log(this.module.name, this.module.config)
        if (!message.guild) return await this.dmChannel.handle(message)
        if (!(message.channel instanceof TextChannel)) return
    }
}