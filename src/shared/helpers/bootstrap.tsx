// tslint:disable:max-classes-per-file

import * as React from 'react';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';

import { IAppReduxState } from 'shared/types/app';
import { ICommunicationState } from './redux';

type JobCreator = () => Promise<void>;

interface IBootstrapper {
  store: Store<IAppReduxState>;
  isBootstrapped: boolean;
  addJobCreator: (loader: JobCreator) => void;
  waitJobsCompletion: () => Promise<void>;
}

class Bootstrapper implements IBootstrapper {
  public store: Store<IAppReduxState>;
  public isBootstrapped = false;

  private _jobCreators: JobCreator[] = [];
  private _tree: React.ReactElement<any>;

  public constructor(tree: React.ReactElement<any>, store: Store<IAppReduxState>) {
    this.store = store;
    this._tree = <BootstrapContext.Provider value={this}>{tree}</BootstrapContext.Provider>;
  }

  public addJobCreator(jobCreator: JobCreator) {
    this._jobCreators.push(jobCreator);
  }

  public async waitJobsCompletion() {
    // will call componentWillMount, and our hoc
    // will collect waiters in context var this
    renderToString(this._tree);
    const promises = this._jobCreators.map(w => w());
    await Promise.all(promises);
    this.isBootstrapped = true;

    return void 0;
  }
}

const BootstrapContext = React.createContext<IBootstrapper | null>(null);

function serverDataWaiterHOC<P>(
  Component: React.ComponentClass<P> & { getJobCreator: (props: P, store: Store<IAppReduxState>) => JobCreator },
) {
  return class HOC extends React.PureComponent<P> {
    public static displayName = `ServerDataWaiter(${Component.displayName || Component.name})`;
    public static contextType = BootstrapContext;
    public context: IBootstrapper | null = null;

    public constructor(props: P, ctx: any) {
      super(props, ctx);

      if (__SERVER__ && this.context && !this.context.isBootstrapped) {
        const waiter = Component.getJobCreator(this.props, this.context.store);
        this.context.addJobCreator(waiter);
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  };
}

function waitCommunication(
  store: Store<IAppReduxState>,
  selectCommunication: (s: IAppReduxState) => ICommunicationState<any>,
  timeout: number = 3000,
): Promise<void> {
  let prev = selectCommunication(store.getState());

  function checkState(timer: ReturnType<typeof setTimeout>, complete: () => void) {
    const state = store.getState();
    const next = selectCommunication(state);

    if (!prev.isRequesting && next.isRequesting) {
      prev = next;
    } else if (prev.isRequesting && !next.isRequesting) {
      clearTimeout(timer);
      complete();
    }
  }

  return new Promise(resolve => {
    const timer = setTimeout(() => complete(), timeout);
    const complete = () => [unSub, resolve].map(f => f());
    const unSub = store.subscribe(() => checkState(timer, complete));
  });
}

export { BootstrapContext, serverDataWaiterHOC, Bootstrapper, waitCommunication };
