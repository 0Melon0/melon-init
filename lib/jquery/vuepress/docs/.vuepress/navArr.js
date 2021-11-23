const fs = require('fs');
const path = require('path');
const mdRootDir = path.join(__dirname, '../');
let isChild, dirInfo;

// 配置文件夹的翻译
const titleObj = require('./titleObj');

const ignoreArr = ['assets', '.DS_Store'];

function getMd(nowDir, nowFileName) {
  dirInfo = fs.statSync(path.join(mdRootDir, nowDir, nowFileName));
  // 是否为文件夹
  if (dirInfo.isDirectory()) {
    let nowDirInfo = fs.readdirSync(path.join(mdRootDir, nowDir, nowFileName));
    let children = [];
    nowDirInfo.forEach(item => {
      if (!ignoreArr.includes(item) && !item.endsWith('md')) {
        isChild = getMd(path.join(nowDir, nowFileName), item);
        if (isChild.length) {
          children = children.concat(isChild);
        }
      }
    })
    if (children.length) {
      return [{
        text: `${titleObj[nowFileName] ? titleObj[nowFileName] : nowFileName}`,
        items: children
      }]
    } else {
      return [
        {
          text: `${titleObj[nowFileName] ? titleObj[nowFileName] : nowFileName}`,
          link: `${path.join(nowDir, nowFileName, '/')}`
        }
      ]
    }
  }
}

/**
 * MD文件夹判断
 */
function _navArr() {
  if (fs.existsSync(path.join(mdRootDir, '/md'))) {
    return getMd('/', 'md')[0].items
  } else {
    return []
  }
}

module.exports = _navArr;