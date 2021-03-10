import { Logger } from '@nedbot/logger';

import "discord-akairo";

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        inhibitorHandler: InhibitorHandler;
        logger: Logger;
    }
}