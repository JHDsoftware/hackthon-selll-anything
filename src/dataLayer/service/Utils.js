import IKUtils from "innerken-js-utils";
import i18n from "@/i18n";

export function findInList (id, list) {
  return list.find(i => i.id === id)
}

/**
 * @param {[]} ids
 * @param {[]} list
 * return []
 */
export function grepOutIndex (ids = [], list) {
  return list.filter((l, index) => ids.includes(index))
}

/**
 * @param {[]} index
 * @param {[]} list
 * return []
 */
export function mergeFilterList (index, list) {
  return grepOutIndex(index, list).map(it => it.id)
}

export function anyIn (list, set) {
  return (set?.length > 0 && set.some(s => emptyOrIn(list, s)))
}

export function emptyOrIn (list, id) {
  return list.length === 0 || list.includes(id)
}

export function comparator (a, b) {
  if (parseFloat(a) < parseFloat(b)) {
    return -1
  }
  if (parseFloat(a) > parseFloat(b)) {
    return 1
  }
  return 0
}

export function showSuccessMessage (title) {
  IKUtils.toast(title, 'success')
}

export async function sureToDelete (action, content = '', title = this.$t('are_you_sure_want_to_delete_it')+'？') {
  const res = await IKUtils.showConfirmAsyn(i18n.t(content), i18n.t(title))
  IKUtils.showLoading(true)
  if (res.isConfirmed) {
    await action()
    IKUtils.toast(this.$t('delete_success')+'！', 'success')
  } else {
    IKUtils.toast(this.$t('cancle_success')+'!', 'info')
  }
}
