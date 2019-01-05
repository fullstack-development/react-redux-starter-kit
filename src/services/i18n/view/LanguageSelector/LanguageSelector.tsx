import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState } from 'shared/types/app';

import { actions, selectors } from '../../redux';
import { Lang } from '../../namespace';

interface IStateProps {
  lang: Lang;
}

interface IActionProps {
  changeLanguage: typeof actions.changeLanguage;
}

type Props = IStateProps & IActionProps;

interface IOption {
  value: Lang;
  label: string;
}

class LanguageSelector extends React.PureComponent<Props, {}> {
  public static options: IOption[] = [
    { value: 'en', label: 'en' },
    { value: 'ru', label: 'ru' },
  ];

  public render() {
    const { lang } = this.props;

    return (
      <div>
        <select value={lang} onChange={this.changeLanguage}>
          {LanguageSelector.options.map(({ value, label }, i) => (
            <option value={value} key={i}>{label}</option>
          ))}
        </select>
      </div>
    );
  }

  @bind
  private changeLanguage({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    this.props.changeLanguage((value as Lang));
  }
}

function mapActions(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    changeLanguage: actions.changeLanguage,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return { lang: selectors.selectCurrentLocale(state) };
}

export { LanguageSelector };
export default connect<IStateProps, IActionProps>(mapState, mapActions)(LanguageSelector);
