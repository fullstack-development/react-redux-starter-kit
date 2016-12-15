import * as React from 'react';
import * as block from 'bem-cn';
import { Navbar, Form } from 'react-bootstrap';
import RowsLayout from '../../../../shared/view/elements/RowsLayout';
import Header from '../../../../shared/view/components/Header/index';
import { SearchRepositoriesInput } from '../../../../features/searchRepositories';
import Description from './Description';
import Search from './Search';
import * as s from './styles.styl';

interface Props {}

class IndexLayout extends React.Component<Props, null> {

    private b = block('index-page');

    constructor(props : Props) {
        super(props);
    }

    render () {
        const b = this.b;

        return (
            <RowsLayout
                footerContent={
                    <a href="http://fullstack-development.com/">FullStackDevelopment</a>
                }
                headerContent={
                    <Header>
                        <Navbar.Form pullRight>
                            <SearchRepositoriesInput />
                        </Navbar.Form>
                    </Header>
                }
            >
                <div className={s[b()]}>
                    <div className={s[b('content')]}>
                        <Description />
                        <Search />
                    </div>
                </div>
            </RowsLayout>
        );
    }
}

export {Props};
export default IndexLayout;