"use strict";
import { Message } from "discord.js";
import config from "../../configuration.json";

/* If you want to customize the Message, you can change the values below */
export type NewMessage = Message;

export const Emotes = config.emotes;
