/*
 * @Author: ShawnPhang
 * @Date: 2021-08-23 14:48:55
 * @Description:
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2021-08-23 20:35:47
 * @site: book.palxp.com / blog.palxp.com
 */
/**
 *   0 本地服务器   1 线上服务器
 */
const isProduction = process.env.NODE_ENV === 'production'
const environment: number = isProduction ? 1 : 0

let apiUrl!: string
let MUSIC_URL!: string

if (environment === 0) {
  apiUrl = 'http://localhost:9998'
  MUSIC_URL = ''
} else {
  apiUrl = '${api_url}'
  MUSIC_URL = '${music_url}'
}

export default {
  VERSION: '0.0.3.beta',
  APP_COPYRIGHT: '',
  API_URL: apiUrl,
  IMG_URL: '',
  MUSIC_URL,
}
