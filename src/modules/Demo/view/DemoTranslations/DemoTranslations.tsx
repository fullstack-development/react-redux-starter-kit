import * as React from 'react';
import { useTranslation, tKeys, LanguageSelector } from 'services/i18n';

function DemoTranslations() {
  const { t, i18n: { language } } = useTranslation();
  return (
    <div>
      <p>{t(tKeys.demo.selectedLang.getKey(), { language })}</p>
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

export default DemoTranslations;
