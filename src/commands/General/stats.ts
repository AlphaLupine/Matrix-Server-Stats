import { Command } from 'discord-akairo';
import { Message, MessageAttachment } from 'discord.js';

export default class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
        });
    };

    async exec(message: Message) {
        let statsEmbed = new this.client.embed();
        await server.getServerStatus().then(data => {
            if (data.online) {
                statsEmbed.setMain()
                    .setTitle("MatrixRP is Online!")
                    .setDescription([
                    ].join("\n"))
            }
        })
        return message.channel.send(statsEmbed);
    }
}
