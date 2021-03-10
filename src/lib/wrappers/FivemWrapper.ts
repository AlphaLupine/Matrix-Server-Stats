import axios from "axios";

const DEFAULT_OPTIONS = {
    timeout: 1000
};

export class Server {
    constructor(ip, options) {
        if (!ip) throw Error('Missing fivem server IP and/or PORT (IP:PORT)')
    }

}