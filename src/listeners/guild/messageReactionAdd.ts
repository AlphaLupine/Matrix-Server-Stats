import {AkairoClient, Listener} from 'discord-akairo';
import {MessageReaction, TextChannel} from "discord.js";

export default class ClientReadyListener extends Listener {
    constructor() {
        super('messageReactionAdd', {
            emitter: 'client',
            event: 'messageReactionAdd'
        });
    }

    async exec(reaction: MessageReaction) {

        let cooldown = 10000;

        const statChannel: TextChannel = await this.client.channels.fetch(process.env.STATS_CHANNEL_ID!) as TextChannel;
        const statMessage = await statChannel.messages.fetch(this.client.StatMessageCache.get(statChannel.id));
        if(reaction.users.cache.array().length <= 1 || reaction.message.id !== statMessage.id) return // Prevents Bot from executing event code and only runs if the reaction is used on the stat message

        const Reactor = reaction.users.cache.filter(x => !x.bot).map(x => x.id);
        statMessage.reactions.resolve(process.env.EMOJI_ID!)?.users.remove(Reactor.join());

        let lastUpdate = this.client.StatCooldownCache.get(Reactor.join());
        if(lastUpdate && cooldown - (Date.now() - lastUpdate) > 0) return;


        //Gather FiveM Server Information:
        this.client.logger.info("StatCollection - Message Reaction Trigger",`Gathering FiveM Server Stats`);
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
        await statMessage.edit(embed);
        this.client.StatCooldownCache.set(Reactor.join(), Date.now());
    }
}