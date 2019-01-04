import { Store } from 'redux';
import { bind } from 'decko';
import * as Polyglot from 'node-polyglot';

import { IAppReduxState } from 'shared/types/app';

import { ITranslateFunction, Lang } from './namespace';
import * as actions from './redux/actions';
import * as selectors from './redux/selectors';
import { DEFAULT_LANGUAGE } from './constants';
import { phrasesByLocale } from './locales';
import { injectable, inject } from 'inversify';
import TYPES from 'core/iocTypes';

/**
 * It is a localization service for whole app.
 * It will be injected inside all classes (including React components) and
 * provide public methods for translation and localization.
 *
 * For passing translate functional inside low level components use getTranslator function,
 * cause it needs to rerender component, when locale will change, and getTranslator will
 * care about rerender components when it needs.
 *
 * For other cases you can use Translate component, or translate api function, defined in this service.
 */
type Subscriber = () => void;

@injectable()
class I18n {
  public actions: typeof actions = actions;
  private polyglot: Polyglot = new Polyglot({
    locale: DEFAULT_LANGUAGE,
    phrases: phrasesByLocale[DEFAULT_LANGUAGE],
  });
  private translator: ITranslateFunction = this.polyglot.t.bind(this.polyglot) as ITranslateFunction;
  private subscribers: Subscriber[] = [];

  private _store: Store<IAppReduxState>;

  constructor(@inject(TYPES.Store) store: Store<IAppReduxState>) {
    this._store = store;
    this._store.subscribe(this.onStateChange);
  }

  public get locale(): Lang {
    return (this.polyglot.locale() as Lang);
  }

  public get t(): ITranslateFunction {
    return this.translator;
  }

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.findIndex(s => s === subscriber);
    this.subscribers.splice(index, 1);
  }

  @bind
  private onStateChange() {
    const state = this._store.getState();
    const locale = selectors.selectCurrentLocale(state);

    if (locale !== this.locale) {
      this.polyglot.locale(locale);
      this.polyglot.replace(phrasesByLocale[locale]);

      this.translator = this.polyglot.t.bind(this.polyglot) as ITranslateFunction;

      this.subscribers.forEach(subscriber => subscriber());
    }
  }
}

export default I18n;
