import { getNgrokUrl } from '@/dataLayer/service/GlobalConfig'
import hillo from 'hillo'
import i18n from "@/i18n";

let counter = 0

export async function getInfoForDeviceId (deviceId) {
  const url = getNgrokUrl(deviceId)
  try {
    return (await hillo.get(url + '/PHP/Restaurant.php?op=view')).content[0]
  } catch (e) {
    // return {name: "店内主机未连接网络", adress1: "无法读取该店铺数据" + counter++}
    return {name: i18n.t('Shop_net_error'), adress1: i18n.t('cant_get_data') + counter++}
  }

}

export async function updateRestaurantInfo (info) {
  await (await hillo.post('Restaurant.php?op=update', {...info}))
}

window.decodeDeviceId = decodeDeviceId

export function decodeDeviceId (str) {
  // const p = 1213
  // const q = 823
  return pow(BigInt(str), 7n) % 998299n
}

function pow (a, b) {
  let res = a
  for (let i = 1; i < b; i++) {
    res = res * a
  }
  return res
}



