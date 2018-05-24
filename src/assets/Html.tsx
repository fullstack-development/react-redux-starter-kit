import * as React from 'react';
import * as serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import * as redux from 'redux';
import { IAssets } from 'shared/types/app';

interface IHtmlProps {
  assets: IAssets;
  component?: JSX.Element;
  store: redux.Store<any>;
}

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends React.PureComponent<IHtmlProps> {
  private static getHeadData() {
    return __SERVER__ ? Helmet.renderStatic() : Helmet.peek();
  }

  // private static getCorrectFavicon() {
  //   let envPostfix = '';

  //   if (__DEVELOPMENT__) { envPostfix = 'dev'; }
  //   if (__STAGING__) { envPostfix = 'staging'; }
  //   if (envPostfix) { envPostfix = '-' + envPostfix; }

  //   return `/static/favicon-${__LOGO_POSTFIX__}${envPostfix}.ico`;
  // }

  public render() {
    const { assets, component, store } = this.props;
    const styles: React.CSSProperties = { height: '100%' };
    const head = Html.getHeadData();
    const state = store.getState();
    // const favicon = Html.getCorrectFavicon();

    const mainChunks = ['app', 'shared', 'vendor', 'manifest'];
    const scriptsFromAssets = Object
      .keys(assets.javascript)
      .filter(item => mainChunks.some(name => item.includes(`js/${name}`)))
      .sort((a, b) => {
        const indexA = mainChunks.findIndex(name => a.includes(`js/${name}`));
        const indexB = mainChunks.findIndex(name => b.includes(`js/${name}`));
        return indexB - indexA;
      });

    const stylesFromAssets = Object
      .keys(assets.styles)
      .sort((a, b) => {
        const indexA = mainChunks.findIndex(name => a.includes(name));
        const indexB = mainChunks.findIndex(name => b.includes(name));
        return indexB - indexA;
      });

    return (
      <html lang={__LANG__} style={styles}>
        <head>
          {head && head.base && head.base.toComponent()}
          {head && head.title && head.title.toComponent()}
          {head && head.meta && head.meta.toComponent()}
          {head && head.link && head.link.toComponent()}

          {/* <link rel="shortcut icon" href={favicon} /> */}

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {stylesFromAssets.map((key, idx) => (
            <link href={assets.styles[key]} key={idx} media="screen, projection" rel="stylesheet" type="text/css" />
          ))}
        </head>

        <body style={styles}>

          <div id="root" style={styles}>{component}</div>

          <div>
            {/* Other code */}
            {head && head.script && head.script.toComponent()}
          </div>

          {/* App code and 3d party services code */}
          <div>
            <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(state)};` }} charSet="UTF-8" />
            <script dangerouslySetInnerHTML={{ __html: `window.__assets=${serialize(assets)};` }} charSet="UTF-8" />
            <script src="https://maps.googleapis.com/maps/api/js?libraries=places" />
            {scriptsFromAssets.map((item, index) => <script defer src={item} charSet="UTF-8" key={index} />)}
          </div>

        </body>
      </html>
    );
  }
}

export { Html, IHtmlProps };
