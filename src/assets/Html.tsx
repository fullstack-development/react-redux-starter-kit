import * as React from 'react';
import * as serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import * as redux from 'redux';
import { IAssets } from 'shared/types/app';
import { SheetsRegistry } from 'react-jss';

interface IHtmlProps {
  assets: IAssets;
  component?: JSX.Element;
  store: redux.Store<any>;
  styleSheets?: SheetsRegistry;
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

  public render() {
    const { assets, component, store, styleSheets } = this.props;
    const styles: React.CSSProperties = { height: '100%' };
    const head = Html.getHeadData();
    const state = store.getState();

    return (
      <html lang={__LANG__} style={styles}>
        <head>
          {head && head.base && head.base.toComponent()}
          {head && head.title && head.title.toComponent()}
          {head && head.meta && head.meta.toComponent()}
          {head && head.link && head.link.toComponent()}

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles.map((filePath, idx) => (
            <link href={filePath} key={idx} media="screen, projection" rel="stylesheet" type="text/css" />
          ))}
          {styleSheets && (
            <style type="text/css" id="server-side-styles">{styleSheets.toString()}</style>
          )}
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
            {assets.javascript.map((filePath, index) => <script defer src={filePath} charSet="UTF-8" key={index} />)}
          </div>

        </body>
      </html>
    );
  }
}

export { Html, IHtmlProps };
