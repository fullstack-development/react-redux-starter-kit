import React from 'react';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import redux from 'redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

import { IAssets } from 'shared/types/app';

interface IHtmlProps {
  store: redux.Store<any>;
  assets: IAssets;
  app?: JSX.Element;
  muiStyleSheets?: ServerStyleSheets;
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
class Html extends React.PureComponent<IHtmlProps> {
  private static getHeadData() {
    return __SERVER__ ? Helmet.renderStatic() : Helmet.peek();
  }

  public render() {
    const { assets, app, store, muiStyleSheets } = this.props;
    const styles: React.CSSProperties = { height: '100%' };
    const head = Html.getHeadData();
    const state = store.getState();
    const stringifiedApp = app ? renderToString(app) : '';
    const windowAssets = serialize({ styles: assets.styles, javascript: assets.javascript });
    return (
      <html lang={__LANG__} style={styles}>
        <head>
          {head && head.base && head.base.toComponent()}
          {head && head.title && head.title.toComponent()}
          {head && head.meta && head.meta.toComponent()}
          {head && head.link && head.link.toComponent()}

          {assets.favicons.map((el, index) => <link key={index} {...el.attribs} />)}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles.map((filePath, index) => (
            <link href={`/${filePath}`} key={index} media="screen, projection" rel="stylesheet" type="text/css" />
          ))}
          {muiStyleSheets !== undefined && (
            <style type="text/css" id="jss-server-side">{muiStyleSheets.toString()}</style>
          )}
        </head>

        <body style={styles}>

          <div id="root" style={styles} dangerouslySetInnerHTML={{ __html: stringifiedApp }} />

          <div>
            {/* Other code */}
            {head && head.script && head.script.toComponent()}
          </div>

          {/* App code and 3d party services code */}
          <div>
            <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(state)};` }} charSet="UTF-8" />
            <script dangerouslySetInnerHTML={{ __html: `window.__assets=${windowAssets};` }} charSet="UTF-8" />
            {assets.javascript.map((filePath, index) =>
              <script defer src={`/${filePath}`} charSet="UTF-8" key={index} />)}
          </div>

        </body>
      </html>
    );
  }
}

export { Html, IHtmlProps };
