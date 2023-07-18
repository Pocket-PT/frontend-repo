// This sample config can be found at our opensource repository located at:
// https://github.com/delasign/gatsbyjs-typescript-starter

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Required for Paths to work with Gatsby.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        styles: path.resolve(__dirname, 'src/styles'),
        templates: path.resolve(__dirname, 'src/templates'),
        utils: path.resolve(__dirname, 'src/utils'),
        apps: path.resolve(__dirname, 'src/apps'),
        icons: path.resolve(__dirname, 'src/icons'),
        constants: path.resolve(__dirname, 'src/constants'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        videos: path.resolve(__dirname, 'src/videos'),
        libs: path.resolve(__dirname, 'src/libs'),
      },
    },
  });
};
