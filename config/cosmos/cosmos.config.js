module.exports = {
  // Set all other paths relative this this one. Important when cosmos.config
  // isn't placed in the project root
  rootPath: '../../',

  globalImports: [
  ],

  // Customize pattern(s) for matching fixture files
  fileMatch: [
    '**/cosmos/fixtures/**/*.js',
  ],
  hostname: '0.0.0.0',
  port: 8989,
  // webpackConfigPath: './config/cosmos/webpack.config.dev.js',
};
