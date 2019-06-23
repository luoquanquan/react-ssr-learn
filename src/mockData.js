import fetch from 'isomorphic-fetch'

export default () => fetch('https://music.niubishanshan.top/api/v2/music/toplist')
  .then(res => res.json())
  .then(({ data }) => data)
