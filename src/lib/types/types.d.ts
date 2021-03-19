import { Logger } from '@nedbot/logger';
import { Server } from "../wrappers/FivemWrapper";

import "discord-akairo";
import MatrixEmbed from "../extensions/MatrixEmbed";
import StatMessageCache from "../caches/StatMessageCache";
import StatCooldownCache from "../caches/StatCooldownCache";

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        inhibitorHandler: InhibitorHandler;
        logger: Logger;
        server: Server;
        readonly embed: typeof MatrixEmbed;
        StatMessageCache: StatMessageCache;
        StatCooldownCache: StatCooldownCache;
    }
}
declare module "discord.js" {
    interface MessageEmbed {
        setMain(): this,
        setSuccess(): this,
        setFail(): this,
        setCaution(): this,
        addEmptyField(inline?: Boolean): this
    }
}