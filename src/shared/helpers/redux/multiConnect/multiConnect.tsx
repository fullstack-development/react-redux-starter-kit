import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as uuid from 'uuid';
import { bind } from 'decko';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect, Omit } from 'react-redux';
import { IAppReduxState } from 'shared/types/app';

import { addInstance, removeInstance } from './actions';
import { MapStateToProps, MapDispatchToProps, ReactComponent, IMultiAction, IMultiConnectProps } from './namespace';

type FeatureName = keyof IAppReduxState;
type MultiComponent<P> = ReactComponent<P & IMultiConnectProps>;

const mountedContainersForInstance: {[key: string]: number} = {};

const multiConnect = <TReduxState, TStateProps, TDispatchProps, TOwnProps>(
  keyPathToState: FeatureName[],
  initialState: TReduxState,
  mapStateToProps: MapStateToProps<TReduxState, TStateProps, TOwnProps>,
  mapDispatchToProps?: MapDispatchToProps<TDispatchProps, TOwnProps>,
) => {
  type IWrappedComponentProps = TStateProps & TDispatchProps & TOwnProps & IMultiConnectProps;
  return (WrappedComponent: ReactComponent<IWrappedComponentProps>): MultiComponent<TOwnProps> => {

    class MultiConnector extends React.PureComponent<TOwnProps & IMultiConnectProps, {}> {
      public static contextTypes = {
        store: PropTypes.object,
      };
      public context: { store: Store<IAppReduxState> };
      public displayName: string = `(MultiConnect) ${WrappedComponent.displayName}`;

      private ConnectedComponent:
        React.ComponentClass<
          Omit<IWrappedComponentProps, keyof (TStateProps & TDispatchProps)> & TOwnProps & IMultiConnectProps
        >;
      private instanceKey: string;

      public componentWillMount() {
        this.instanceKey = (this.props.instanceKey as string) || uuid();

        const mountedContainers = mountedContainersForInstance[this.instanceKey] || 0;
        mountedContainersForInstance[this.instanceKey] = mountedContainers + 1;

        this.context.store.dispatch(addInstance(this.instanceKey, initialState, keyPathToState));
        this.ConnectedComponent = connect(this.mapStateToProps, this.mapDispatchToProps)(WrappedComponent);
      }

      public componentWillUnmount() {
        const mountedContainers = mountedContainersForInstance[this.instanceKey] || 1;
        mountedContainersForInstance[this.instanceKey] = mountedContainers - 1;

        if (mountedContainers === 1) {
          this.context.store.dispatch(removeInstance(this.instanceKey, keyPathToState));
        }
      }

      public render() {
        const ConnectedComponent = this.ConnectedComponent;
        return <ConnectedComponent instanceKey={this.instanceKey} {...this.props as any} />;
      }

      @bind
      private mapStateToProps(appState: IAppReduxState, ownProps?: TOwnProps): TStateProps {
        const state = keyPathToState.reduce((prev, cur) => prev ? prev[cur] : prev, appState as any);
        const instanceState = state ? state[this.instanceKey] : {};
        return mapStateToProps(instanceState, appState, ownProps);
      }

      @bind
      private mapDispatchToProps(dispatch: Dispatch<any>, ownProps?: TOwnProps): TDispatchProps {
        if (!mapDispatchToProps) { return ({} as TDispatchProps); }

        const actions = mapDispatchToProps(this.actionDecorator as any, ownProps);
        return bindActionCreators(actions as any, dispatch);
      }

      @bind
      private actionDecorator(action: IMultiAction): IMultiAction {
        action._instanceKey = this.instanceKey;
        return action;
      }
    }

    return MultiConnector;
  };
};

export { multiConnect };
