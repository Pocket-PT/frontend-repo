export const preloadDataMap: {
  [
    activityId: string
  ]: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { _t: 'pending'; promise: Promise<any> } | { _t: 'ok'; data: any };
} = {};

export function readPreloadData<T>(preloadRef: { key: string }): T {
  const preloadData = preloadDataMap[preloadRef.key];

  switch (preloadData._t) {
    case 'pending':
      throw preloadData.promise;
    case 'ok':
      return preloadData.data;
  }
}
