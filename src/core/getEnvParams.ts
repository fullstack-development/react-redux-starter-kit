import * as appInfo from '../../package.json';

export default function getEnvParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isWatchMode = process.env.WATCH_MODE === 'true';
  const withAnalyze = process.env.BUNDLE_ANALYZE_MODE === 'true';
  const forGHPages = process.env.FOR_GH_PAGES === 'true';

  const chunkName = isProduction ? 'id' : 'name';
  const chunkHash = isWatchMode && !isProduction ? 'hash' : 'chunkhash';
  const withHot = isWatchMode && isDevelopment;
  const appVersion = appInfo.version;

  return {
    isProduction, isDevelopment, isWatchMode, withAnalyze,
    chunkName, chunkHash, withHot, appVersion, forGHPages,
  };
}
