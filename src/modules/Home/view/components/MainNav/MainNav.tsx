import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router';
import { bind } from 'decko';
import MUIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'; // TODO: replace

import routes from 'modules/routes';
import './MainNav.scss';

type IProps = RouteComponentProps;

const b = block('main-nav');

const navigationItems = [
  { text: 'Search for GitHub users', link: routes.search.users.getRoutePath() },
  { text: 'Search for GitHub repositories', link: routes.search.repositories.getRoutePath() },
  { text: 'Edit profile', link: routes.profile.getRoutePath() },
];

class MainNav extends React.Component<IProps> { // TODO: pure?
  public render() {
    return (
      <nav className={b()}>
        <MUIList>
          {navigationItems.map((x, i) => (
            <ListItem
              className={b('list-item').toString()}
              key={i}
              onClick={this.makeNavigationItemClickHandler(x.link)}
              button
            >
              {x.text}
            </ListItem>
          ))}
        </MUIList>
      </nav>
    );
  }

  @bind
  private makeNavigationItemClickHandler(link: string) {
    return () => this.props.history.push(link);
  }
}

export default withRouter(MainNav);
