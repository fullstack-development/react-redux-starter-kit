import * as React from 'react';

import { RowsLayout } from 'shared/view/elements';
import { Header, Footer } from 'shared/view/components';

import { StylesProps, provideStyles } from './BaseLayout.style';

class BaseLayout extends React.PureComponent<StylesProps> {
  public render() {
    const { classes, children } = this.props;

    return (
      <RowsLayout
        footerContent={<Footer />}
        headerContent={(
          <Header
            brandRedirectPath={'homeRedirectPath'}
            menuRedirectPaths={{ order: 'orderRedirectPath' }}
          >
            Some header text
          </Header>
        )}
      >
        <div className={classes.content}>
          {children}
        </div>
      </RowsLayout>
    );
  }
}

export default provideStyles(BaseLayout);
