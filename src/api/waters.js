import request from '../utils/request'

export function getWaters(params) {
  return request({
    url: `/api/waters`,
    method: 'get',
    params
  })
}