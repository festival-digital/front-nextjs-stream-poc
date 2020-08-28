module.exports = {
  env: {
    NODE: process.env.NODE_ENV,
    STAGE: process.env.STAGE,
    DOMAIN: process.env.DOMAIN,
    GRAPH_URI: process.env.GRAPH_URI,
    VALIDATOR_API_URI: process.env.VALIDATOR_API_URI,
    WIRECARD_API_URI: process.env.WIRECARD_API_URI,
    DELIVERY_API_URI: process.env.DELIVERY_API_URI,
    APP_KEY: process.env.APP_KEY,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
  },
  distDir: './dist/next',
  webpack: (config) => ({
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.css$/,
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext].js',
          },
        },
        {
          test: /\.css$/,
          use: ['babel-loader', 'raw-loader', 'postcss-loader'],
        },
      ],
    },
  }),
};
