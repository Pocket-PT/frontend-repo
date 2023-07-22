// This sample config can be found at our opensource repository located at:
// https://github.com/delasign/gatsbyjs-typescript-starter

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createRedirect } = require('gatsby-plugin-netlify');

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
        stores: path.resolve(__dirname, 'src/stores'),
      },
    },
  });
  createRedirect({
    fromPath: window.location.hostname, // 이 경로로의 요청을
    toPath: 'http://3.38.250.97/', // 이 경로로 리다이렉트합니다.
    isPermanent: true, // 영구 리다이렉트 설정 (기본값은 false)
    redirectInBrowser: true, // 브라우저에서 리다이렉트를 처리하도록 설정 (기본값은 false)
  });
};
