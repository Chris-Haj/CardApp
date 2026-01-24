const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  if (env.mode === 'production') {
    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      })
    );
  }

  return config;
};
