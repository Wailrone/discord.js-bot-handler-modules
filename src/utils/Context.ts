"use strict";

import {
    BaseCommandInteraction,
    CommandInteraction,
    CommandInteractionOptionResolver,
    Guild,
    GuildChannel,
    GuildMember, GuildTextBasedChannel,
    InteractionDeferReplyOptions,
    InteractionReplyOptions,
    MessageComponentInteraction,
    MessagePayload,
    NewsChannel,
    ShardClientUtil,
    TextChannel,
    ThreadChannel,
    User,
    UserContextMenuInteraction,
    WebhookEditMessageOptions
} from "discord.js";
import Client from "../../main";

class Context {
    interaction: BaseCommandInteraction | MessageComponentInteraction;
    client: typeof Client;
    args: Omit<CommandInteractionOptionResolver, "getMessage" | "getFocused">
    customIdParams: { [p: string]: string };

    constructor(client: typeof Client, interaction: BaseCommandInteraction | MessageComponentInteraction, customIdParams?: string[]) {
        this.interaction = interaction;
        this.client = client;
        this.args = interaction instanceof CommandInteraction ? interaction.options : null
        this.customIdParams = interaction instanceof MessageComponentInteraction ? customIdParams.reduce((sum, key, index) => Object.assign(sum, {[key]: interaction.customId.split(":").slice(1)[index]}), {}) : null;
    }


    get module() {
        if (this.interaction instanceof BaseCommandInteraction) return this.client.modules.findCommandModule(this.interaction.commandName);
        else if (this.interaction instanceof MessageComponentInteraction) return this.client.modules.findComponentModule(this.interaction.customId?.split(":")?.[0]);
    }
    moduleFunctions(moduleName: string) {
        return this.client.moduleFunctions(moduleName);
    }

    moduleConfig(moduleName: string) {
        return this.client.moduleConfig(moduleName);
    }
    
    get customId() {
        if (this.interaction instanceof MessageComponentInteraction) {
            return this.interaction.customId.split(":")?.[0] || this.interaction.customId;
        }
    }


    get shards(): ShardClientUtil {
        if (!this.client?.shard) throw new Error("Shard non trouvable");
        return this.client.shard;
    }

    get guild(): Guild {
        if (!this.interaction.guild) throw new Error("Not a guild");
        return this.interaction.guild;
    }

    get channel(): GuildTextBasedChannel {
        if (!this.interaction.channel || !this.interaction.guild) throw new Error("Not a guild channel");
        if (!(this.interaction.channel instanceof GuildChannel) && !(this.interaction.channel instanceof ThreadChannel)) throw new Error("This is not a GuildTextChannel");
        return this.interaction.channel;
    }

    get author(): User {
        return this.interaction.user;
    }

    get targetUser(): User {
        if (this.interaction instanceof UserContextMenuInteraction) return this.interaction.targetUser;
    }

    get member(): GuildMember | any {
        return this.interaction.member;
    }

    get me(): GuildMember {
        return this.guild.me;
    }

    reply(content: string | MessagePayload | InteractionReplyOptions) {
        return this.interaction.reply(content); // for embed or file or simple message
    }

    deferReply(options?: InteractionDeferReplyOptions) {
        this.interaction.deferReply(options);
    }

    followUp(content: string | MessagePayload | InteractionReplyOptions) {
        return this.interaction.followUp(content);
    }

    editReply(content: string | MessagePayload | WebhookEditMessageOptions) {
        return this.interaction.reply(content);
    }

    deleteReply(): Promise<void> {
        return this.interaction.deleteReply();
    }
}

export default Context;
