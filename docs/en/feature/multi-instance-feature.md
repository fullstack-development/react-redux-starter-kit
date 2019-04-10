# Multi-instance feature

Each feature has its own branch in the redux state. But sometimes it is necessary to have multiple feature instances on the same page with their own state. To achieve this you can use a multi-instance feature.

A multi-instance feature is a feature which have multiple instances in the redux state. A state for a multi-feature instance, instead of being stored directly in the app state by the feature name key, like this:

```
{
  ...app state,
  [featureName]: featureState,
}
```
is now stored using an assigned to the feature instance unique ID (also called `instanceKey`):
```
{
  ...app state,
  [featureName]: {
    [featureInstanceID]: featureInstanceState,
    [anotherFeatureInstanceID]: anotherFeatureInstanceState,
    ...and so on
  }
}
```
## How to use a multi-instance feature:
Let's say we have a widget in our app which is represented by a `widget` feature. A user can add as many instances (the feature containers) of that widget on the page as he wants. The widget displays some data fetched from a server. The user can also configure the widget to change the data that get fetched and displayed.

So in this case every container with the widget would need to be able to use its own redux state, which can be achieved by making the feature multi-instance.

To make a feature multi-instance you should:

1. Wrap a feature's state interface (written as usual) with the IMultiInstanceState inside the IAppReduxState interface.
   ```
   export interface IAppReduxState {
    ...
    widget: IMultiInstanceState<features.widget.namespace.IReduxState>;
   }
   ```

2. Write selectors for a multi-instance feature with the feature state as its argument instead of the app state.
   ```
   import * as NS from '../namespace';

   export function selectWidgetData(state: NS.IReduxState): IWidgetData {
     return state.data.widgetData;
   }
   ```
   Action creators are written as usual.

3. Use the `multiConnect` HOC instead of the regular redux `connect` in the feature's containers. `multiConnect` takes the following arguments:
   - path to the multi-instance state. Usually it would just contain a path to the feature state:
      ```
      // path to the multi-instance widget feature state
      ['widget']
      ```
     but sometimes you may want to implement only a part of your feature as multi-instance, and keep the rest of the feature non-multi-instance. In this case you'd pass the path to the multi-instance part of the feature state like this:
        ```
        // path to the multi-instance part of the state (the widget feature is not multi-instance in general)
        ['widget', 'multi-instance-part']
        ```
   - initial feature state;
   - mapStateToProps function (the first argument is the feature state, as the multi-instance feature selectors are taking the feature state as its argument instead of the app state; the other arguments are the same as in the regular `connect`, starting from appState);
      ```
      function mapStateToProps(state: IReduxState, appState: IAppReduxState): IStateProps {
        return {
          widgetData: selectors.selectWidgetData(state),
          UITheme: configServiceSelectors.selectUITheme(appState),
        };
      }
      ```
   - mapDispatchToProps function (written just like one for the regular `connect`);

   A component wrapped with `multiConnect` also have the `instanceKey` prop. If you want to make use of it, you should use the `IMultiConnectProps` in props type. `instanceKey` is either generated automatically by the `multiConnect` or passed explicitly to the component if you need multiple containers to use the same redux state branch.


    ```
    /* multiConnect example for Widget container */

    type IProps = IActionProps & IStateProps & IOwnProps & IMultiConnectProps;

    class Widget extends React.PureComponent<IProps> {
      ...
    }

    export default (
      multiConnect(
        ['widget'],
        initialState,
        mapStateToProps,
        mapDispatchToProps,
      )(Widget)
    );
    ```

4. In order to differentiate between redux actions dispatched from the feature instances, multi-instance feature actions are dispached with the `_instanceKey` field. The field is added automatically by the `multiConnect` HOC so you don't have to worry about that. But the feature reducer have to be configured separately to react on the actions with the `_instanceKey` field. To do that use a `multiReducer` function to wrap a regular feature reducer:
   ```
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
5. If you dispatch actions in a saga, then you should add the `_instanceKey` to them explicitly and extend `IMultiAction` when declaring an action interface (it can be found in the action caught by the saga):
    ```
    interface ILoadWidgetData extends IMultiAction {
      type: 'WIDGET:LOAD_WIDGET_DATA';
      payload: ILoadWidgetDataPayload;
    }

    function* loadWidgetData({ api }: IDependencies, { payload: country, _instanceKey }: ILoadWidgetData) {
      try {
        const widgetData: IWidgetData = yield call(api.widgets.loadWidgetData, country);
        yield put({ ...actions.loadWidgetDataSuccess(widgetData), _instanceKey });
      } catch (error) {
        const msg = getMessage(error);
        yield put({ ...actions.loadWidgetDataFail(msg), _instanceKey });
      }
    }
    ```
