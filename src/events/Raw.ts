"use strict";

import {Message, Guild} from "discord.js";
import type Client from "../../main";
import DiscordEvent from "../utils/DiscordEvent";
import ModuleEvent from "../utils/ModuleEvent";

class InteractionCreate extends DiscordEvent {

    constructor(client: typeof Client) {
        super(client, "raw");
        this.client = client;
    }

    async run(rawData: any) {
        if (rawData.t === "GUILD_UPDATE") console.log(rawData.d);
        if (!rawData?.t || !rawData?.d) return;
        const modules = this.client.modules?.modules?.map(m => m)
        if (!modules) return;
        for (const module of modules) {
            const potentialEvent = module?.events?.find((e: ModuleEvent) => e?.name === rawData?.t);
            if (potentialEvent) {
                switch (rawData.t) {
                    case "READY":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(this.client);
                        break;
                    case "GUILD_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Guild(this.client, rawData.d));
                        break;
                    case "GUILD_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Guild(this.client, rawData.d));
                        break;
                    case "GUILD_UPDATE":
                        console.log(rawData.d);
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Guild(this.client, rawData.d));
                        break;
                    case "INVITE_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "INVITE_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_MEMBER_ADD":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_MEMBER_REMOVE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_MEMBER_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_MEMBERS_CHUNK":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_INTEGRATIONS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_ROLE_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_ROLE_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_ROLE_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_BAN_ADD":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_BAN_REMOVE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_EMOJIS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "CHANNEL_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "CHANNEL_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "CHANNEL_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "CHANNEL_PINS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_DELETE_BULK":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_REACTION_ADD":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_REACTION_REMOVE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_REACTION_REMOVE_ALL":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "MESSAGE_REACTION_REMOVE_EMOJI":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_LIST_SYNC":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_MEMBER_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "THREAD_MEMBERS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "USER_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "PRESENCE_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "TYPING_START":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "VOICE_STATE_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "VOICE_SERVER_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "WEBHOOKS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "INTERACTION_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "STAGE_INSTANCE_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "STAGE_INSTANCE_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "STAGE_INSTANCE_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_STICKERS_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_SCHEDULED_EVENT_CREATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_SCHEDULED_EVENT_UPDATE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_SCHEDULED_EVENT_DELETE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_SCHEDULED_EVENT_USER_ADD":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                    case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
                        // @ts-ignore. To avoid private constructor error.
                        potentialEvent.run(new Message(this.client, rawData.d));
                        break;
                }
            }
        }
    }
}

module.exports = InteractionCreate;