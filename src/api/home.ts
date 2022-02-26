import fetch from '../utils/axios'

export const login = (params: Type.Object) => fetch('api/user/login', params, 'post')
