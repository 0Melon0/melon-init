const { spawn } = require('child_process');

function _spawn(command, args, options) {
  return new Promise((resolve, reject) => {
    process.platform === 'win32' && (command += '.cmd');
    let program = spawn(command, args, options);
    program.on('close', code => {
      code ? reject() : resolve();
    });
    program.on('error', err => {
      reject(err);
    });
  });
}

module.exports = _spawn;
