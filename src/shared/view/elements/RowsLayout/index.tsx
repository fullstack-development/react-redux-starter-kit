import * as React from 'react';
import { Grid, Row, Panel } from 'react-bootstrap';
import * as block from 'bem-cn';
import * as s from './styles.styl';

interface Props {
    children? : React.ReactElement<Object>,
    footerContent? : React.ReactElement<Object>,
    headerContent? : React.ReactElement<Object>
}

function RowsLayout ({ children, footerContent, headerContent } : Props) {
    const b = block('rows-layout');
    return (
        <Grid fluid className={s[b()]}>
            <Row>
                <header>{headerContent}</header>
            </Row>
            <Row>
                <main>{children}</main>
            </Row>
            <Row className={s[b('footer-row')()]}>
                <footer>
                    <Panel className={s[b('footer-content')]} header={<Grid>{footerContent}</Grid>} />
                </footer>
            </Row>
        </Grid>
    );
}

export default RowsLayout;
