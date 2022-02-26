const GROUP_LEVEL: Type.Object = {
  topic: 4,
  year: 3,
  month: 2,
  time: 1,
}

const TRANS_FIELD: Type.Object = [
  {
    name: '型号',
    key: 'Model',
  },
  {
    name: '焦距',
    key: 'FocalLength',
  },
  // { name: '参数', val: '${res.FNumber.val}, ${(res.ExposureTime.val).split(" ")[0]}s, IOS${res.ISOSpeedRatings.val}' },
  { name: '参数', val: '${FNumber}, ${ExposureTime}s, IOS${ISOSpeedRatings}' },
  { name: '时间', key: 'DateTime' },
  // {
  //   name: '光圈',
  //   key: 'FNumber',
  // },
  // {
  //   name: '快门',
  //   key: 'ShutterSpeedValue',
  // },
  // {
  //   name: '快门',
  //   key: 'ExposureTime',
  // },
  // {
  //   name: 'ISO',
  //   key: 'ISOSpeedRatings',
  // },
]

const freezeObject: Type.Object = {} // 不参与渲染的冻结变量

export const widthws3 = (window.screen.width / 3).toFixed(0)
export const widthws2 = (window.screen.width / 2).toFixed(0)

export { TRANS_FIELD, GROUP_LEVEL, freezeObject }
