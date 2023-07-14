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
      },
    },
  });
};
