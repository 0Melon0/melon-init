const { spawn } = require('child_process');

function _spawn(command, args, options) {
  return new Promise((resolve, reject) => {
    let childProcess = spawn(command, args, options);
    childProcess.on('close', (code) => {
      code ? reject() : resolve()
    });
  });
}

module.exports = _spawn;