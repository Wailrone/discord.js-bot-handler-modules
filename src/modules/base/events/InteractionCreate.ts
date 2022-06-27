"use strict";

import type {Interaction} from "discord.js";
import type Client from "../../../../main";
import CommandService from "../../../services/CommandService";
import ComponentService from "../../../services/ComponentService";
import ModuleEvent from "../../../utils/ModuleEvent";
import {Constants} from "discord.js";

export default class extends ModuleEvent {
    commands: CommandService;
    components: ComponentService;

    constructor(client: typeof Client) {
        super({
            client : client,
            name : Constants.Events.INTERACTION_CREATE,
            module : "base"
        });
        this.commands = new CommandService(this.client);
        this.components = new ComponentService(this.client);
    }

    async run(interaction: Interaction) {
        if (interaction.isApplicationCommand()) await this.commands.handle(interaction);
        if (interaction.isMessageComponent()) await this.components.handle(interaction)
    }
}