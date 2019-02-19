import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { RowsLayout } from 'shared/view/elements';
import { Header, Footer } from 'shared/view/components';

import { StylesProps, provideStyles } from './BaseLayout.style';

class BaseLayout extends React.PureComponent<StylesProps & RouteComponentProps<any>> {
  public render() {
    const { classes, children } = this.props;

    return (
      <RowsLayout
        footerContent={<Footer />}
        headerContent={(
          <Header>
            Full stack development
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

export default withRouter(provideStyles(BaseLayout));
