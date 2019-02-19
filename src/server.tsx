import 'reflect-metadata';
import express from 'express';
import React from 'react';
import bootstrapper from 'react-async-bootstrapper';
import { renderToString } from 'react-dom/server';

import { IAssets, IAppData } from 'shared/types/app';
import { SheetsRegistry } from 'shared/styles';
import Html from 'assets/Html';

import configureApp from 'core/configureApp';
import { ServerApp } from 'core/App';

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
    return res.status(500).send(
      process.env.NODE_ENV === 'production'
        ? hydrateOnClient(appData, assets)
        : renderToString(<pre>{error.stack}</pre>),
    );
  }
}

async function renderOnServer(appData: IAppData, assets: IAssets, location: string, context: object) {
  const sheets = new SheetsRegistry();
  const appForBootstrap = <ServerApp {...appData} location={location} context={{}} disableStylesGeneration />;
  await bootstrapper(appForBootstrap);
  const app = <ServerApp {...appData} location={location} context={context} registry={sheets} />;
  const html = <Html assets={assets} component={app} store={appData.store} styleSheets={sheets} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;
  return document;
}

function hydrateOnClient(appData: IAppData, assets: IAssets) {
  const html = <Html assets={assets} store={appData.store} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;

  return document;
}

export default render;
