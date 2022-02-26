import fetch from '../utils/axios'
import appConfig from '@/config'


export const getUrl = (params: Type.Object) => fetch(appConfig.MUSIC_URL + '/song/url?br=64000', params, 'get')

// export const getDetail = (params: Type.Object) => fetch('http://localhost:9997/song/detail?ids=31134829,28762985', params, 'get')

export const getList = (params: Type.Object) => fetch(appConfig.MUSIC_URL + '/playlist/detail?id=5183094117', params, 'get')

// export const getLrc = (params: Type.Object) => fetch('http://localhost:9997/lyric?id=33894312', params, 'get')
