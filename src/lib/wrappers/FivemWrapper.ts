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
        });
    }

    public async getPlayerCount() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}/dynamic.json`, { timeout: this.timeout })
                .then(body => {
                    let playerCount = body.data.clients;
                    send(playerCount);
                });
        });
    }

    public async getMaxPlayerCount() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}/info.json`, { timeout: this.timeout })
                .then(body => {
                    let maxClients = body.data.vars.sv_maxClients;
                    send(maxClients);
                });
        });
    }

    public async getLicenseKey() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}/info.json`, { timeout: this.timeout })
                .then(body => {
                    let licenseKey = body.data.vars.sv_licenseKeyToken;
                    send(licenseKey)
                });
        });
    }

    public async getDynamicInfo() {
        return new Promise((send, err) => {
            axios
                .get(`http://${this.ip}/dynamic.json`, { timeout: this.timeout })
                .then(body => {
                    let info = body.data
                    send(info)
                });
        });
    }

}