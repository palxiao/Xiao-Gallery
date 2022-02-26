import mRegular from './widget/regular'
export const regular = mRegular

import app_config from '@/config';
export const config = app_config

// import Preload from './widget/preload'
// export const preload = Preload

import groupArray from './widget/group-array'
export const GroupArray = groupArray

import dayjs from 'dayjs'
export { dayjs }

/**
 * 对象扩展
 * @param {Object} destination 目标对象
 * @param {Object} source 源对象
 * @return {Object} 扩展对象
 */

export const extend = (destination: Type.Object, source: Type.Object) => {
  if (source && destination) {
    for (const property in source) {
      if (source.hasOwnProperty(property)) {
        destination[property] = source[property]
      }
    }
  }
  return destination
}

/**
 * 星期换算
 * @param {String} 'YYYY-MM-DD'
 */
export const transformDate = (date: string) => {
  const weekDay = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const myDate = new Date(date.replace(/-/g, '/'))
  if (weekDay[myDate.getDay()]) {
    return weekDay[myDate.getDay()]
  } else { return '' }
}

/**
 * 返回正确时间
 */
export const getDate = (date: string) => {
  const reDate = new Date(date.replace(/-/g, '/'));
  return reDate
}

/** 判断是否在数组中并返回下标 */
export const isInArray = (arr: Type.Object[], value: any) => {
  if (arr.indexOf && typeof (arr.indexOf) === 'function') {
    const index = arr.indexOf(value)
    if (index >= 0) {
      return index
    }
  }
  return false
}

/** 删除多个对象元素 */
export const deleteSome = (obj: Type.Object, arr: string[]) => {
  arr.forEach(key => {
    delete obj[key]
  })
  return obj
}

/** 拾取对象元素 */
export const pickSome = (obj: Type.Object, arr: string[]) => {
  const newObj: Type.Object = {}
  arr.forEach((key) => {
    newObj[key] = obj[key]
  })
  return newObj
}

/** String长度 */
export const getBLen = (str: string) => {
  if (str == null) { return 0; }
  str += '';
  return str.replace(/[^\x00-\xff]/g, '01').length;
}

/** 区间范围产生随机数 */
export const random = function(min: number, max: number) {
  if (arguments.length === 2) {
      return Math.floor(min + Math.random() * ((max + 1) - min))
  } else {
      return null;
  }
}

/** 检测苹果手机 */
export const isIOS = () => {
  const u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return isiOS
}

export default {}
