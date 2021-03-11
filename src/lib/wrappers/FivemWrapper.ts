import axios from "axios";

export class Server {
    public ip: string;
    public timeout: number;
    constructor(ip: string) {
        if (!ip) throw Error('Missing fivem server IP and/or PORT (IP:PORT)');
        this.ip = ip;
        this.timeout = 1000
    }

    public async getServerStatus() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}/players.json`, { timeout: this.timeout })
                .then(body => {
                    let status = {
                        online: true,
                    }
                    send(status);
                }).catch(err => {
                    let status = {
                        online: false,
                        url: err.config.url,
                        method: err.config.method
                    }
                    if (err.response == undefined) send(status);
                });
        })
    }

    public async getPlayers() {
        await axios
            .get(`http://${this.ip}/players.json`, { timeout: this.timeout})
            .then((body) => {
                let players = body.data;
                return players.length;
            });
    }

}