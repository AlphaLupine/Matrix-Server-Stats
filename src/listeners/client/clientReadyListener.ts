import { Listener } from 'discord-akairo';
import { Server } from '../../lib/wrappers/FivemWrapper';
import {TextChannel} from "discord.js";

export default class ClientReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {

        //Gather FiveM Server Information:
        this.client.logger.info("StatCollection",`Gathering FiveM Server Stats`);
        let dynamicInfo = (await this.client.server.getDynamicInfo() as object);
        let playerCount = (await this.client.server.getPlayerCount() as number);
        let maxPlayerCount = (await this.client.server.getMaxPlayerCount() as number);
        let Status = (await this.client.server.getServerStatus() as object);
        let Players = (await this.client.server.getPlayers() as object);

        //Embed Template - TODO: Move to Matrix Embed Extension
        let embed = new this.client.embed().setMain()
            //@ts-ignore
            .setTitle(`MatrixRP is currently ${Status.online ? "Online" : "Offline"}`)
            .setImage("https://i.imgur.com/1uPrLrz.png")
            .setDescription([
                //@ts-ignore
                `**Gamemode:** ${dynamicInfo.gametype}`,
                `**Player Count:** ${playerCount}/${maxPlayerCount}`,
                `**Players:**\n`
            ].join("\n\n"))
            .setFooter(`Server is scheduled to restart every ${process.env.RESTART} hours`);

        //Run Setup:
        this.client.logger.info("Preparation",`Preparing Stats Channel`);
        const statChannel: TextChannel = await this.client.channels.fetch(process.env.STATS_CHANNEL_ID!) as TextChannel;
        await statChannel.bulkDelete(100);
        const statMessage = await statChannel.send(embed);
        this.client.StatMessageCache.set(statChannel.id, statMessage.id);
        await statMessage.react(process.env.EMOJI_ID!);

        const prefix = this.client.commandHandler.prefix;
        this.client.logger.info("ClientReady",`${this.client.user!.username} is ready!`);
        this.client.user?.setActivity(`${prefix}vote`, { type: 'STREAMING',  url: 'https://www.trackyserver.com/server/matrix-rp-648119'})
    }
}