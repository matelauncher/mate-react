import { shell } from 'electron'
import axios from 'axios';

export const openURL = (link: string) => {
    shell.openExternal(link)
} 

export const platform = process.platform

export const loadLocaleMessages = () => {
    const locales = require.context('../assets/i18n/', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages: { [key: string]: {} } = {}
    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        const locale = matched[1]
        messages[locale] = { translation: locales(key) }
      }
    })
    return messages
}

export const getHTML = (url: string): Promise<string> => {
  return new Promise((resolve, rej) => {
      axios.get(url)
      .then(res => {
          resolve(res.data)
      })
      .catch(rej)
  })
}

export function isEmptyObject(obj: {}) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}