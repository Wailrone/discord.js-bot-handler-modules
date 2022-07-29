import Client from "../../main";

export default class ModuleFunctions {
	public client: typeof Client;

	constructor(client: typeof Client) {
		this.client = client;
	}
}
