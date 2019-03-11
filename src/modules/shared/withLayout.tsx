import React from 'react';

import Layout from './Layout/Layout';

function withLayout(title: string) {
  return (Component: React.ComponentType) => () => (
    <Layout title={title}>
      <Component />
    </Layout>
  );
}

export default withLayout;
