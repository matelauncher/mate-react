const remote = require('electron').remote

export const close = () => {
    remote.getCurrentWindow().close()
}
export const minimize = () => {
    remote.getCurrentWindow().minimize()
}
export const hide = () => {
    remote.getCurrentWindow().hide()
}
export const show = () => {
    remote.getCurrentWindow().show()
}