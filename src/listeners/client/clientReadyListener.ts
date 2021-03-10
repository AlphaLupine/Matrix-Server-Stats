import { Listener } from 'discord-akairo';

export default class ClientReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const prefix = this.client.commandHandler.prefix;
        this.client.logger.info("ClientReady",`${this.client.user!.username} is ready!`);
        this.client.user?.setActivity(`${prefix}help`, { type: 'STREAMING',  url: 'https://www.trackyserver.com/server/matrix-rp-648119'})
    }
}