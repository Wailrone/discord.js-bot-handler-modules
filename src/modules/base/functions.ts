import Client from "../../../main";
import ModuleFunctions from "../../utils/ModuleFunctions";

export default class Functions extends ModuleFunctions {
    client: typeof Client;

    constructor(client: typeof Client) {
        super(client);
    }

    coucouZebi() {
        return console.log("Coucou Zebi !", this.client.config.bot.mainColor);
    }

    test() {
        console.log('yo bro')
    }

}