import { LocalSettingManager } from 'biewangle'
import hillo from 'hillo'
import { today } from '@/dataLayer/repository/DateRepository'
import dayjs from 'dayjs'

export const GlobalConfig = LocalSettingManager.config({
  lang: 'zh', useTimelineView: 0, currentUserId: ''
})

export function getImageRoot (deviceId) {
  return getNgrokUrl(deviceId) + '/Resource/dishImg/'
}

export function getBannerImageRoot (deviceId) {
  return getNgrokUrl(deviceId) + '/Resource/'
}

export function getNgrokUrl (deviceId) {
  return `http://ik${deviceId.padStart(4, '0')}.ngrok.aaden.io`
}

export function initHillo (deviceId) {
  hillo.initial(getNgrokUrl(deviceId) + '/PHP/')
}

export const dateKey = 'boss-panel-save-date'
export const releaseTimestampKey = 'boss-panel-last-save-date-key'

export function setGlobalDateRange (range) {
  localStorage.setItem(releaseTimestampKey, dayjs().toISOString())
  console.log(localStorage.getItem(releaseTimestampKey))
  localStorage.setItem(dateKey, JSON.stringify(range))
}

export function getGlobalDateRange (checkForRelease = false) {
  if (checkForRelease) {
    const lastTime = localStorage.getItem(releaseTimestampKey)
    if (lastTime) {
      const lastTimestamp = dayjs(lastTime)

      const timeFromNow = dayjs().diff(lastTimestamp, 'minute')
      if (timeFromNow > 360) {
        localStorage.removeItem(dateKey)
      }
    } else {
      localStorage.removeItem(dateKey)
    }
  }
  const range = localStorage.getItem(dateKey)

  if (range) {
    return JSON.parse(range)
  } else {
    return [today, today]
  }
}
