const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
        zlib: require.resolve("browserify-zlib"),
        crypto: require.resolve("crypto-browserify"),
        url: require.resolve("url/")
      };
      return webpackConfig;
    }
  }
};
