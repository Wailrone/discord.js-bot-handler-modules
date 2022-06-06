"use strict";

import Command, {CommandInfo} from "./Command";

interface ModuleCommandInfo extends CommandInfo {
    module: string;
}

export default abstract class ModuleCommand extends Command {
    module: string;

    constructor(info: ModuleCommandInfo) {
        super(info);
        this.module = info.module;
    }

}