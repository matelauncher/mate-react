import axios from 'axios'

const versionsJSON = 'https://launchermeta.mojang.com/mc/game/version_manifest.json'

export interface VersionsObject { 
    latest: { 
        release?: string, 
        snapshot?: string 
    }, 
    versions: { 
        id: string,
        type: string,
        url: string 
    }[] 
}

export const getVersions = (settings: { snapshots?: boolean }): Promise<VersionsObject> => {
    const versions: VersionsObject = { latest: {}, versions: [] }

    return new Promise((resolve, rej) => {
        axios.get(versionsJSON)
        .then(res => {
            versions.latest! = res.data.latest
            res.data.versions.forEach((version: { id: string, type: string, url: string }) => {
                if (version.type === 'release' || (settings.snapshots ? version.type === 'snapshot' : false)) {
                    versions.versions!.push(version)
                }
            })
            resolve(versions)
        })
        .catch(rej)
    })
  }