import Client from "../../../main";

export default class {
    client: typeof Client;

    constructor(client : typeof Client) {
        this.client = client;
    }

    coucouZebi() {
        return console.log("Coucou Zebi !", this.client.config.bot.mainColor);
    }

    test() {
        console.log('yo bro')
    }

}