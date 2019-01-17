import * as React from 'react';

import { ITranslateProps } from '../../namespace';
import { I18nContext } from '../../constants';

function i18nConsumer<TProps>(
  WrappedComponent: React.ComponentType<TProps & ITranslateProps>,
): React.ComponentClass<TProps> {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class I18nConnector extends React.Component<TProps> {
    public static displayName: string = `I18nConnect(${wrappedComponentName})`;

    public render() {
      return (
        <I18nContext.Consumer>
          {(contextProps) => <WrappedComponent {...contextProps} {...this.props} />}
        </I18nContext.Consumer>
      );
    }
  }
  return I18nConnector;
}

export { i18nConsumer };
