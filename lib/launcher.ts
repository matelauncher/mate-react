import { ChildProcess } from 'child_process';
import { Client, IUser } from 'minecraft-launcher-core'
import path from 'path'
const appdataPath: string = process.env.APPDATA!

const launcher: Client = new Client();

class Launcher {
    public proc?: ChildProcess

    constructor(public launcher: Client) {
        launcher.on('data', console.log)
    }

    launch(options: {
        root: string,
        version: {
            number: string,
            type: string
        },
        memory: {
            max: string,
            min: string
        },
        authorization: Promise<IUser>
    }) {
        if (this.proc) {
            this.proc.kill()
        }

        return launcher.launch(options)
        .then(proc => this.proc = proc!)
        .catch(console.error)
    }
}

export const launcherClass = new Launcher(launcher)
export default launcher
export const mcPath = path.join(appdataPath, './.minecraft')