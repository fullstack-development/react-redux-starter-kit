import { IAction, IActionWithPayload, IFailAction, IFailActionWithPayload } from '../namespace';

type NullaryAC<A extends IAction> = () => A;
type UnaryAC<A extends IActionWithPayload> = (payload: A['payload']) => A;

type NullaryFailedAC<A extends IFailAction> = (error: A['error']) => A;
type UnaryFailedAC<A extends IFailActionWithPayload> = (error: A['error'], payload: A['payload']) => A;

interface ICommunicationActionCreators<E, C, F> {
  execute: E;
  completed: C;
  failed: F;
}

function makeCommunicationActionCreators<
  E extends IActionWithPayload, C extends IActionWithPayload, F extends IFailActionWithPayload
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, UnaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IActionWithPayload, C extends IActionWithPayload, F extends IFailAction
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IActionWithPayload, C extends IAction, F extends IFailActionWithPayload
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, NullaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<E extends IActionWithPayload, C extends IAction, F extends IFailAction>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IAction, C extends IActionWithPayload, F extends IFailActionWithPayload
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, UnaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<E extends IAction, C extends IActionWithPayload, F extends IFailAction>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<E extends IAction, C extends IAction, F extends IFailActionWithPayload>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, NullaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<E extends IAction, C extends IAction, F extends IFailAction>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators(executeType: string, completeType: string, failType: string) {
  return {
    execute: (payload: any) => {
      return { type: executeType, payload };
    },
    completed: (payload: any) => {
      return { type: completeType, payload };
    },
    failed: (error: any, payload: any) => {
      return { type: failType, error, payload };
    },
  };
}

export default makeCommunicationActionCreators;
