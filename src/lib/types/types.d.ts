import { Logger } from '@nedbot/logger';

import "discord-akairo";
import MatrixEmbed from "../extensions/MatrixEmbed";
import StatMessageCache from "../caches/StatMessageCache";

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        inhibitorHandler: InhibitorHandler;
        logger: Logger;
        readonly embed: typeof MatrixEmbed;
        StatMessageCache: StatMessageCache;
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