"use strict";

import type {Interaction} from "discord.js";
import {CommandInteraction, Events, MessageComponentInteraction} from "discord.js";
import type Client from "../../../../main";
import CommandService from "../../../services/CommandService";
import ComponentService from "../../../services/ComponentService";
import ModuleEvent from "../../../utils/ModuleEvent";

export default class extends ModuleEvent {
    commands: CommandService;
    components: ComponentService;

    constructor(client: typeof Client) {
        super({
            client: client,
            name: Events.InteractionCreate,
        });
        this.commands = new CommandService(this.client);
        this.components = new ComponentService(this.client);
    }

    async run(interaction: Interaction) {
        if (interaction instanceof CommandInteraction) await this.commands.handle(interaction);
        if (interaction instanceof MessageComponentInteraction) await this.components.handle(interaction)
    }
}