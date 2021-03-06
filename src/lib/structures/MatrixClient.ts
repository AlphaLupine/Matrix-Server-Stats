import {
    AkairoClient,
    ListenerHandler,
    CommandHandler,
    InhibitorHandler
} from "discord-akairo";
import { join } from "path";
import { Logger } from "@nedbot/logger";
import MatrixEmbed from "../extensions/MatrixEmbed";
import StatMessageCache from "../caches/StatMessageCache";
import StatCooldownCache from "../caches/StatCooldownCache";
import { Server } from "../wrappers/FivemWrapper";

export default class MatrixClient extends AkairoClient {
    public server = new Server(process.env.SERVERINFO!)
    public logger = new Logger({
        logFileDirectory: "./logs",
        infoLogFileName: "client.log",
        errorLogFileName: "error.log",
        enableConsoleLogs: true,
        enableInfoLogs: true,
        enableErrorLogs: true,
    });
    public readonly embed = MatrixEmbed;
    public StatMessageCache = new StatMessageCache();
    public StatCooldownCache = new StatCooldownCache();
    public listenerHandler = new ListenerHandler(this, {
        directory: join(process.cwd(), "dist", "listeners")
    });

    public commandHandler = new CommandHandler(this, {
        directory: join(process.cwd(), "dist", "commands"),
        prefix: process.env.PREFIX,
        allowMention: true,
        commandUtil: true,
        handleEdits: true,
    });

    public inhibitorHandler = new InhibitorHandler(this, {
        directory: join(process.cwd(), "dist", "inhibitors")
    });

    public constructor() {
        super(
            {
                ownerID: process.env.OWNER_IDS?.split(","),
            },
            {
                disableMentions: "everyone",
                partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION']
            }
        );
    }

    public start() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();

        return this.login(process.env.TOKEN);
    }

}