import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';
import Main from 'apps/Home/Main';
import OtherProfile from 'apps/Home/OtherProfile';

const activities = {
  Main,
  OtherProfile,
};

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities,
  initialActivity: () => 'Main',
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
});
