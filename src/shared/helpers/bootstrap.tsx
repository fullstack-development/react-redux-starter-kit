/* eslint-disable react/destructuring-assignment */
/* eslint max-classes-per-file: 0 */
import * as React from 'react';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';

import { IAppReduxState } from 'shared/types/app';

type JobCreator = () => Promise<void>;
type IStore = Store<IAppReduxState>;

interface IBootstrapper {
  store: IStore;
  isBootstrapped: boolean;
  addJobCreator: (loader: JobCreator) => void;
  waitJobsCompletion: () => Promise<void>;
}

class Bootstrapper implements IBootstrapper {
  public store: IStore;
  public isBootstrapped = false;

  private tree: React.ReactElement<any>;
  private jobCreators: JobCreator[] = [];

  public constructor(tree: React.ReactElement<any>, store: Store<IAppReduxState>) {
    this.store = store;
    this.tree = <BootstrapContext.Provider value={this}>{tree}</BootstrapContext.Provider>;
  }

  public addJobCreator(jobCreator: JobCreator) {
    this.jobCreators.push(jobCreator);
  }

  public async waitJobsCompletion() {
    // will call componentWillMount, and our hoc
    // will collect waiters in context var this
    renderToString(this.tree);
    const promises = this.jobCreators.map(w => w());
    await Promise.all(promises);
    this.isBootstrapped = true;
  }
}

const BootstrapContext = React.createContext<IBootstrapper | null>(null);

type GetJobCreator<P> = (props: P, store: Store<IAppReduxState>) => JobCreator;

function serverDataWaiterHOC<P>(
  Component: React.ComponentClass<P> & { getJobCreator: GetJobCreator<P> },
) {
  return class HOC extends React.PureComponent<P> {
    public static displayName = `ServerDataWaiter(${Component.displayName || Component.name})`;
    public static contextType = BootstrapContext;

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

export { BootstrapContext, serverDataWaiterHOC, Bootstrapper, IStore };
