import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {Link} from "react-router-dom";
import block from "bem-cn";

import {ITranslationProps, withTranslation} from "services/i18n";

import './LayoutTopNavigation.scss';

interface IMenuItem {
    path: string;
    title: string;
}

interface IOwnProps {
    menuItems: IMenuItem[];
    activeItemPath: string;
}

type IProps = ITranslationProps & IOwnProps;

const b = block('layout-top-navigation');

class LayoutTopNavigationComponent extends Component<IProps> {
    render() {
        const {menuItems} = this.props;

        return (
            <div className={b()}>
                {menuItems.map(this.renderMenuItem)}
            </div>
        );
    }

    @autobind
    private renderMenuItem({path, title}: IMenuItem, i:number) {
        const { activeItemPath } = this.props;
        return (
            <Link to={path} className={b('item', { active: path === activeItemPath })} key={i}>
                {title}
            </Link>
        );
    }
}

const LayoutTopNavigation = withTranslation()(LayoutTopNavigationComponent)

export {
    LayoutTopNavigation,
    IProps as ILayoutTopNavigation,
    IMenuItem as ILayoutTopNavigationItem
};