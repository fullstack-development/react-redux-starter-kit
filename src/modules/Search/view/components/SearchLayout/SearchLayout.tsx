import {ITranslationProps, tKeys, withTranslation} from "../../../../../services/i18n";
import {createSelector} from "reselect";
import {IHeaderMenuItem, LayoutHeaderMenu} from "./LayoutHeaderMenu/LayoutHeaderMenu";
import {routes} from "../../../../routes";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import block from "bem-cn";

interface IOwnProps {

}

type IProps = IOwnProps & RouteComponentProps & ITranslationProps

const {header} = tKeys.shared;
const b = block('search-layout');

const selectMenuItems = createSelector(
  (props: IProps) => props.t,
  (t): IHeaderMenuItem[] => ([
    {
      path: routes.search.users.getRoutePath(),
      title: t(header.users),
    },
    {
      path: routes.search.repositories.getRoutePath(),
      title: t(header.repositories),
    },
  ]),
);

class SearchLayoutComponent extends React.Component<IProps> {
  public render() {
    const {children} = this.props;

    return (
      <div className={b()}>
        <LayoutHeaderMenu menuItems={selectMenuItems(this.props)} activeItemPath={location.pathname}/>
        {children}
      </div>
    );
  }
}

const SearchLayout = withTranslation()(withRouter(SearchLayoutComponent));

export {
  SearchLayout,
  IProps as ISearchLayout
}