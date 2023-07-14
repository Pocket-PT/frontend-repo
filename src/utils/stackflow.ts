import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { preloadPlugin } from '@stackflow/plugin-preload';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';
import Main from 'apps/Home/Main';
import OtherProfile from 'apps/Home/OtherProfile';
import { preloadDataMap } from './readPreloadData';

const activities = {
  Main,
  OtherProfile,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
        Main: '/',
        OtherProfile: '/',
      },
      fallbackActivity: () => 'Main',
    }),
    preloadPlugin({
      loaders: {
        Main({
          activityContext,
          activityParams,
          isInitialActivity,
          initialContext,
        }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: 'ok',
              data: initialContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .loadPage((activityContext as any).path)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .then((result: any) => {
                preloadDataMap[key] = {
                  _t: 'ok',
                  data: result.json.data,
                };
              });

            preloadDataMap[key] = {
              _t: 'pending',
              promise,
            };
          }

          return {
            key,
          };
        },
        OtherProfile({
          activityContext,
          activityParams,
          isInitialActivity,
          initialContext,
        }) {
          const key = `OtherProfile#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: 'ok',
              data: initialContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .loadPage((activityContext as any).path)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .then((result: any) => {
                preloadDataMap[key] = {
                  _t: 'ok',
                  data: result.json.data,
                };
              });

            preloadDataMap[key] = {
              _t: 'pending',
              promise,
            };
          }

          return {
            key,
          };
        },
      },
    }),
  ],
});

export type TypeActivities = typeof activities;
