import * as React from 'react';
import { Grid, Row, Panel } from 'react-bootstrap';
import block from 'bem-cn';
import './styles.scss';

interface IProps {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

function RowsLayout({ children, footerContent, headerContent }: IProps) {
  const b = block('rows-layout');
  return (
    <Grid fluid className={b()}>
      <Row>
        <header>{headerContent}</header>
      </Row>
      <Row>
        <main>{children}</main>
      </Row>
      <Row className={b('footer-row')()}>
        <footer>
          <Panel className={b('footer-content')()} header={<Grid>{footerContent}</Grid>}/>
        </footer>
      </Row>
    </Grid>
  );
}

export default RowsLayout;
