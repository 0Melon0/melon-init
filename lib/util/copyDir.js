const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const HandlebarsArr = [
  'package.json',
  'Jenkinsfile',
  'dev.yaml',
  'svc.yaml',
  'apidoc.json',
  'config.default.js',
];

function copyDir(PARAMS, fileName = '', dirPath = '') {
  dirInfo = fs.statSync(path.join(PARAMS.cliDir, fileName));
  if (dirInfo.isDirectory()) {
    if (fileName) {
      try {
        fs.statSync(path.join(PARAMS.projectDir, dirPath, fileName));
      } catch (error) {
        fs.mkdirSync(path.join(PARAMS.projectDir, dirPath, fileName));
      }
    }
    fs.readdirSync(path.join(PARAMS.cliDir, fileName)).forEach(item => {
      let _PARAMS = JSON.parse(JSON.stringify(PARAMS));
      _PARAMS.cliDir = path.join(_PARAMS.cliDir, fileName);
      copyDir(_PARAMS, item, path.join(dirPath, fileName));
    });
  } else {
    try {
      if (fs.statSync(path.join(PARAMS.projectDir, dirPath, fileName))) {
        fs.rmSync(path.join(PARAMS.projectDir, dirPath, fileName));
      }
    } catch (error) {}

    if (HandlebarsArr.includes(fileName)) {
      const content = Handlebars.compile(
        fs.readFileSync(path.join(PARAMS.cliDir, fileName), {
          encoding: 'utf-8',
        })
      )(PARAMS);
      fs.writeFileSync(
        path.join(PARAMS.projectDir, dirPath, fileName),
        content
      );
    } else {
      fs.createReadStream(path.join(PARAMS.cliDir, fileName)).pipe(
        fs.createWriteStream(path.join(PARAMS.projectDir, dirPath, fileName))
      );
    }
  }
}

module.exports = copyDir;
