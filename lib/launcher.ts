import { ChildProcess } from 'child_process';
import { Client, IUser } from 'minecraft-launcher-core'
import path from 'path'

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

export const mcPathWindows = path.join(process.env.APPDATA!, './.minecraft')
export const mcPathMac = path.join(process.env.HOME!, './Library/Application Support/minecraft')
export const mcPathLinux = path.join(process.env.HOME!, './.minecraft')

export const getMCPath = (osType: string) => {
    switch (osType) {
        case 'darwin': {
            return mcPathMac
        }
        case 'win32': {
            return mcPathWindows
        }
        case 'linux':
        default: {
            return mcPathLinux
        }
    }
}