import React from 'react';
import block from 'bem-cn';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { autobind } from 'core-decorators';

import {withTranslation, ITranslationProps, tKeys} from 'services/i18n';
import {withAsyncFeatures} from 'core';
import * as features from 'features';

import {routes} from '../../routes';
import {LayoutTopNavigation} from "./LayoutTopNavigation/LayoutTopNavigation";
import './Layout.scss';
import {Accordion, AccordionSummary, AccordionDetails} from "../../../shared/view/elements";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps & ITranslationProps;

const {header, footer} = tKeys.shared;

const b = block('layout');


class LayoutComponent extends React.Component<IProps> {
  public render() {
    const {children, t, title} = this.props;

    return (
      <div className={b()}>
        <div className={b('container')}>
          <aside className={b('side')}>
            <h1 className={b('title')}>{t(header.title)}</h1>
            <div className={b('description')}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Для чего мы сделали демо?</AccordionSummary>
                <AccordionDetails>Чтобы вы могли понять, какой объём работы и функциональность наша команда делает за
                  100 часов работы.</AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Как этим пользоваться?</AccordionSummary>
                <AccordionDetails>Настраивайте параметры поиска, просматривайте результаты и погружайтесь в культуру
                  GitHub.</AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Мне всё понравилось, что дальше?</AccordionSummary>
                <AccordionDetails>Свяжитесь с нашим CTO, чтобы мы круто поработали над вашим
                  проектом.</AccordionDetails>
              </Accordion>
            </div>
            <footer className={b('footer')}>
              <a
                className={b('company-link')}
                href="https://fullstack-development.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(footer.fsd)}
              </a>
            </footer>
          </aside>
          <main className={b('main')}>
            <header className={b('header')}>
              {this.renderTopNavigation()}
            </header>
            <div className={b('page-title')}>{title}</div>
            <div className={b('content')}>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
  @autobind
  private renderTopNavigation() {
    const {location, t} = this.props;
    const topNavigationItems = [
      {
        path: routes.search.users.getRoutePath(),
        title: t(tKeys.shared.search)
      },
      {
        path: routes.profile.getRoutePath(),
        title: 'Profile'
      }
    ]

    return <LayoutTopNavigation menuItems={topNavigationItems} activeItemPath={location.pathname}/>
  }
}

const wrappedComponent = withTranslation()(withRouter(LayoutComponent));
const Layout = withAsyncFeatures({
  profileFeatureEntry: features.profile.loadEntry,
})(wrappedComponent);

export {Layout, LayoutComponent, IProps as ILayoutProps};
