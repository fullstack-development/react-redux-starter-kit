import * as React from 'react';
import { withI18n, tKeys, ITranslateProps } from 'core/configurationI18n';
import { LanguageSelector } from 'shared/view/components';

function DemoTranslations(props: ITranslateProps) {
  const { t, lng } = props;
  return (
    <div>
      <p>{t(tKeys.demo.selectedLang.getKey(), { lng })}</p>
      <p>{t(tKeys.demo.selectorLabel.getKey())}</p>
      <div style={{ margin: 10 }}><LanguageSelector /></div>
      <p>{t(tKeys.demo.somethingText.getKey())}</p>
      <p>{t(tKeys.demo.pluralLabel.getKey())}</p>
      <ul>
        {[1, 2, 8].map(count => (
          <li key={count}>{t(tKeys.demo.pluralTest.getKey(), { count })}</li>
        ))}
      </ul>
    </div>
  );
}

export default withI18n()(DemoTranslations);
