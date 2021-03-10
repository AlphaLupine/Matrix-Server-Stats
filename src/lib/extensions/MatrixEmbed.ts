import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { Colours } from "../util/Constants";

export default class MatrixEmbed extends MessageEmbed {
    public constructor(data?: MessageEmbed | MessageEmbedOptions) {
        super(data);
        this.setMain();
    };

    public setMain() {
        return this.setColor(Colours.Main);
    };

    public setSuccess() {
        return this.setColor(Colours.Success);
    };

    public setFail() {
        return this.setColor(Colours.Fail);
    };

    public setCaution() {
        return this.setColor(Colours.Caution);
    };

    public addEmptyField() {
        return this.addField("\u200b", "\u200b");
    };
}