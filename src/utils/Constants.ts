"use strict";
import {Message, WebhookClientDataURL} from "discord.js";
import config from "../../configuration.json";

/* If you want to customize the Message, you can change the values below */
export interface NewMessage extends Message {
}

export const Emotes = config.emotes;

