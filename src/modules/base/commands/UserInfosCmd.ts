/* eslint-disable no-undef */
"use strict";

import Command from "../../../utils/Command";
import Context from "../../../utils/Context";
import {ApplicationCommandOptionType,ColorResolvable,resolveColor} from "discord.js";

export default class extends Command {
    constructor() {
        super({
            name: "userinfos",
            description: "Gives information about a user.",
            category: "utils",
            options: [{
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "User to get information about.",
                required: true,
            }],
        });
    }

    async run(ctx: Context) {
        const targetUser = ctx.targetUser || ctx.args.getUser('user');
        const targetAvatarURL = targetUser.avatarURL({extension: 'png'})

        await ctx.reply({
            ephemeral: !!ctx.targetUser,
            embeds: [
                {
                    title: `Profil de ${targetUser.tag}`,
                    color: (await targetUser.fetch())?.accentColor || resolveColor(ctx.client.config.bot.mainColor as ColorResolvable),
                    description: `<@${targetUser.id}>`,
                    thumbnail: {
                        url: targetAvatarURL || targetUser.defaultAvatarURL,
                    },
                    fields: [
                        {
                            name: `🆔 Identifiant`,
                            value: `\`\`\`${targetUser.id}\`\`\``
                        }
                    ]
                }
            ],
        })
    }
}
