const path = require('path');
const interpreter = path.resolve(process.env.HOME, 'n/n/versions/node/10.3.0/bin/node');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'h5-management-system',
      script    : 'index.js',
      cwd: __dirname,
      interpreter:interpreter,
      env: {
        NODE_ENV: "development",
        PORT:5000
      },
      env_production : {
        NODE_ENV: 'production',
        PORT:5000,
        LOG_DIR: path.resolve(process.env.HOME, 'logs')
      },
      max_restart: 10,
      error_file: path.resolve(process.env.HOME, 'logs/h5-management-system-err.log'),
      out_file: path.resolve(process.env.HOME, 'logs/h5-management-system-out.log')
    }
  ]
};
