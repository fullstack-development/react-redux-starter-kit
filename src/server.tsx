import 'reflect-metadata';
import * as express from 'express';
import * as React from 'react';
import bootstrapper from 'react-async-bootstrapper';
import { renderToString } from 'react-dom/server';

import { IAssets, IAppData } from 'shared/types/app';
import Html from 'assets/Html';

import configureApp from 'core/configureApp';
import { ServerApp } from 'core/App';

// const pretty = new PrettyError();

async function render({ req, res, assets }: { req: express.Request; res: express.Response; assets: IAssets }) {
  try {
    await handleAppRequest(req, res, assets);
  } catch (e) {
    return res.status(500).send(JSON.stringify(e));
  }
}

/**
 * Server render functions below
 */
function hydrateOnClient(appData: IAppData, assets: IAssets) {
  const html = <Html assets={assets} store={appData.store} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;

  return document;
}

async function renderOnServer(appData: IAppData, assets: IAssets, location: string, context: object) {
  const component = <ServerApp {...appData} location={location} context={context} />;
  await bootstrapper(component);
  const html = <Html assets={assets} component={component} store={appData.store} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;

  return document;
}

async function handleAppRequest(req: express.Request, res: express.Response, assets: IAssets) {
  const appData = configureApp();

  if (__DISABLE_SSR__) { return res.status(200).send(hydrateOnClient(appData, assets)); }

  const context: { url?: string } = {};

  try {
    const document = await renderOnServer(appData, assets, req.originalUrl, context);
    context.url
      ? res.redirect(context.url)
      : res.status(200).send(document);
  } catch (error) {
    return res.status(500).send(renderToString(<pre>{error.stack}</pre>));
  }
}

export default render;
