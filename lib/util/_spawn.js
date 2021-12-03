const { spawn } = require('child_process');

function _spawn(command, args, options) {
  return new Promise((resolve, reject) => {
    process.platform === 'win32' && (command += '.cmd');
    let subProgram = spawn(command, args, options);
    subProgram.on('close', code => {
      code ? reject() : resolve();
    });
    subProgram.on('error', err => {
      reject(err);
    });
  });
}

module.exports = _spawn;
