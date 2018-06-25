# Мульти-инстанс фича

Каждая фича при подключении к redux-стору получает свою персональную ветку в стейте. Иногда одну и ту же фичу мы хотим использовать несколько раз на одной странице, и встаёт задача распараллеливания стейта.

Ярким примером является фича гео-селектора. Посредством этой фичи пользователь вводит в форму гео-данные и на форме может быть несколько гео-селекторов одновременно. Каждый экземпляр должен хранить введенные пользователем данные, валидировать их, делать асинхронные запросы за списками стран/городов/улиц и отслеживать состояние этих запросов. 

## Возможные решения такой задачи:

* отказ от redux и перенос redux-логики в react-контейнер и его локальный стейт. В результате мы получим мешанину из стейта, логики по обновлению стейта и вьюх. Открытым останется вопрос обработки асинхронных запросов;
* использовать redux, но стейт фичи разветвить по индексам/инстансам react-контейнеров, таким образом каждый отрисованный контейнер будет работать со своей веткой стейта. Для того чтобы обеспечить правильную работу нескольких экземпляров фичи, нам нужно все экшены маркировать ключами, соответственно придется переписать все экшен-креэйторы, редьюсеры, селекторы и саги, чтобы они учитывали ключ и понимали по ключу с какой веткой стейта нужно работать. Возможно в первый раз решить такую задачу будет интересно, но после второго раза она станет рутинной.
* использовать уже написанный хелпер `multiConnect`

## Xелпер `multiConnect`

Данный хелпер берет на себя обязанности по распараллеливанию стейта фичи и позволяет быстро делать из обычной фичи мульти-инстанс фичу и наоборот.

### Экспортирует:

* `reducer` - вспомогательный редьюсер, который нужно подключить к redux-стору. Создает и удаляет ветки екземпляров фичи
* `multiReducer` - декоратор, в который нужно завернуть редьюсер фичи. Контролирует срабатывание редьюсера фичи на ветках стейта для конкретных экземпляров.
* `multiConnect` - HOC, который используется вместо `connect`.
* `IMultiConnectProps` - используется для типизации пропсов контейнера в случае если внутри контейнера нужен ключ инстанса
* `IMultiInstanceState<T>` - используется для типизации `IAppReduxState`.

### Как этим пользоваться

1. подключаем `reducer` к redux-стору любым удобным способом
2. оборачиваем стейт фичи внутри `IAppReduxState` в интерфейс `IMultiInstanceState`
    ```typescript
    export interface IAppReduxState {
      selectGeo?: IMultiInstanceState<selectGeoNamespace.IReduxState>;
      ...
    }
    ```
3. оборачиваем редьюсер фичи в `multiReducer`:
    ```typescript
    export default (
      multiReducer(
        combineReducers({
          data: dataReducer,
          edit: editReducer,
          communication: communicationReducer,
        }),
      )
    );
    ```
4. заменяем `connect` на `multiConnect`, которому отдаем путь до стейта фичи, инишиал-стейт фичи, `mapStateToProps` относительно стейта фичи и `mapDispatchToProps`:
    ```typescript
    // здесь без изменений
    function mapDispatchToProps(dispatch: Dispatch<any>): IActionProps {
      return bindActionCreators({
        loadCountries: actions.loadCountries,
        loadCities: actions.loadCities,
        ...
      }, dispatch);
    }

    // первым аргументом принимает стейт фичи, остальные аргументы сдвинулись
    function mapStateToProps(state: IReduxState, appState: IAppReduxState, ownProps: IOwnProps): IStateProps {
      const cities = selectors.selectCities(state, locale);
      ...

      return { cities, ... };
    }

    type IProps = IActionProps & IStateProps & IOwnProps & IMultiConnectProps;
    
    class GeoSelector extends React.PureComponent<IProps, {}> {
      ...
    }

    export default (
      multiConnect(['selectGeo'], initialState, mapStateToProps, mapDispatchToProps)(
        GeoSelector,
      )
    );
    ```
5. переписываем селекторы относительно стейта фичи, т.к. `mapStateToProps` теперь принимает стейт инстанса фичи.
6. если в фиче есть саги и в них диспатчатся экшены, то нужно эти экшены дополнить полем `_instanceKey`, значение которого можно получить из перехваченного сагой экшена
    ```typescript
    // интерфейс экшена наследуем от IMultiAction одним из способов
    interface ILoadCities extends IMultiAction {
      type: 'SELECT_GEO:LOAD_CITIES';
      payload: IGeoCountry;
    }

    type ILoadCities<T = 'SELECT_GEO:LOAD_CITIES'> = IAction<T, IGeoCountry> & IMultiAction<T>

    // берем из пойманного экшена _instanceKey
    function* loadCities({ api }: IDependencies, { payload: country, _instanceKey }: ILoadCities) {
      try {
        const cities: IGeoCity[] = yield call(api.geo.loadCities, country);
        yield put({ ...actions.loadCitiesSuccess(cities), _instanceKey }); // дополняем экшен полем _instanceKey
      } catch (error) {
        const msg = getMessage(error);
        yield put({ ...actions.loadCitiesFail(msg), _instanceKey }); // дополняем экшен полем _instanceKey
      }
    }
    ```

В момент отрисовки контейнера в redux-стейте создается ветка инстанса. Ключ, по которому будет доступен стейт инстанса, автоматически генерируется в момент отрисовки, но есть возможность задать этот ключ извне, передав пропс `instanceKey`.

### можно ли сделать так, чтобы два контейнера работали с одной веткой стейта?

Да. Нужно сгенерировать ключ в общем предке контейнеров фичи, и передать его в пропс `instanceKey` интересующим нас контейнерам. Это предотвратит автоматическую генерацию ключа, на первый mount будет создана ветка инстанса в redux-стейте, на последний unmount эта ветка будет удалена.

```typescript
import { SearchPanel, SearchPaginator } from 'features/search';

const SEARCH_KEY: string = 'search-in-main-page';

class MainPage extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <div>
        <SearchPanel instanceKey={SEARCH_KEY} />
        ...
        <SearchPaginator instanceKey={SEARCH_KEY} />
      </div>
    );
  }
}
```
