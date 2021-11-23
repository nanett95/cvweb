const beardy = (d) => {
  let page = document.getElementsByTagName('body')[0].innerHTML
  page = beardyParse(d, page)
  document.getElementsByTagName('body')[0].innerHTML = page
}
const beardyParse = (d, page, prevPatterns) => {
  let result = page
  let patterns = result.match(/{{([^}]+)}}/g)
  while(patterns && patterns.length > 0){
    let pattern = patterns[0]
    let action = pattern.replace(/({|})/g,'')
    if(action[0] === '#'){
      //iterate on array
      action = action.substr(1)
      const array = d[action]
      const pLength = pattern.length
      const start = result.indexOf(pattern)
      const end = result.indexOf(pattern.replace('#','/'))
      const block = result.substring(start + pLength,end)
      let series = ''
      for(let j in array){
        let tmpBlock = ''
        if(typeof array[j] === 'object')
           tmpBlock = beardyParse(array[j], block, patterns)
        else {
          tmpBlock = block.replace('{{_val}}',array[j])
        }
        series = series + tmpBlock
      }
      result = result.replace(result.substring(start, end + pLength), series)
    } else {
      const value = d[action] || ''
      if(value){
        result = result.replace(pattern,value)
      } else {
        result = result.replace(pattern,'')
      }
    }
    patterns = result.match(/{{([^}]+)}}/g)
  }
  return result
}
