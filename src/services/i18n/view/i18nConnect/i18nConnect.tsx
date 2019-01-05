import * as React from 'react';
import { bind } from 'decko';
import { injectable } from 'inversify';
import { inject, TYPES } from 'core';

import { ITranslateProps } from '../../namespace';
import I18n from '../../I18n';

function i18nConnect<TProps>(
  WrappedComponent: React.ComponentType<TProps & ITranslateProps>,
): React.ComponentClass<TProps> {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  @injectable()
  class I18nConnector extends React.Component<TProps> {
    public static displayName: string = `I18nConnect(${wrappedComponentName})`;

    @inject(TYPES.I18n)
    private i18n!: I18n;

    public componentDidMount() {
      this.i18n.subscribe(this.onLocaleChange);
    }

    public componentWillUnmount() {
      this.i18n.unsubscribe(this.onLocaleChange);
    }

    @bind
    public onLocaleChange() {
      this.forceUpdate();
    }

    public render() {
      const { locale, t } = this.i18n;
      return (
        <WrappedComponent locale={locale} t={t} {...this.props} />
      );
    }
  }

  return I18nConnector;
}

export { i18nConnect };
