import fetch from '../utils/axios'

export const getList = (params: Type.Object) => fetch('album', params, 'get')

export const getExif = (url: string, params: Type.Object) => fetch(`${url}?exif`, params, 'get')
