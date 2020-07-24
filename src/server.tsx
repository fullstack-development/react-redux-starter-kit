import 'reflect-metadata';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

import { Bootstrapper } from 'shared/helpers/bootstrap';
import { IAssets, IAppData } from 'shared/types/app';
import { Html } from 'assets/Html';
import { configureApp } from 'core/configureApp';
import { ServerApp } from 'core/App';

async function render(
  { req, res, assets }: { req: express.Request; res: express.Response; assets: IAssets },
) {
  try {
    await handleAppRequest(req, res, assets);
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
}

async function handleAppRequest(req: express.Request, res: express.Response, assets: IAssets) {
  const appData = configureApp();

  if (__DISABLE_SSR__) {
    res.status(200).send(renderWithoutSSR(appData, assets));
  }

  /* used to handle redirect inside rendered app */
  const context: { url?: string } = {};

  try {
    const document = await renderWithSSR(appData, assets, req.originalUrl, context);
    context.url
      ? res.redirect(context.url)
      : res.status(200).send(document);
  } catch (error) {
    res.status(500).send(
      process.env.NODE_ENV === 'production'
        ? renderWithoutSSR(appData, assets)
        : renderToString(<pre>{error.stack}</pre>),
    );
  }
}

async function renderWithSSR(
  appData: IAppData,
  assets: IAssets,
  location: string,
  context: object,
) {
  await waitForAsyncTasksToComplete(appData, location);
  const sheets = new ServerStyleSheets();
  const app = renderToString(
    sheets.collect(<ServerApp {...appData} location={location} context={context} />),
  );

  const html = <Html app={app} store={appData.store} assets={assets} muiStyleSheets={sheets} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;
  return document;
}

async function waitForAsyncTasksToComplete(appData: IAppData, location: string) {
  const appForBootstrap = <ServerApp {...appData} location={location} context={{}} />;
  const bootstrapper = new Bootstrapper(appForBootstrap, appData.store);
  await bootstrapper.waitJobsCompletion();
}

function renderWithoutSSR(appData: IAppData, assets: IAssets) {
  const html = <Html assets={assets} store={appData.store} />;
  const document = `
    <!doctype html>
    ${renderToString(html)}
  `;

  return document;
}

// server export used in server/starters.tsx
export { render };
