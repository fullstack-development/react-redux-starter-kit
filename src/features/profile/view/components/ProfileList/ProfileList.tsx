import React from 'react';
import block from 'bem-cn';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import './ProfileList.scss';

interface Item {
  id: number;
  title: string;
}

interface IOwnProps {
  items: Item[];
  title: string;
  onPreviewClick(id: number): void;
  onRemoveClick(id: number): void;
}

type IProps = IOwnProps & ITranslationProps;

const b = block('profile-list');

function ProfileList(props: IProps) {
  const { items, title, onRemoveClick, onPreviewClick, t } = props;
  const makeHandler = (id: number, cb: (id: number) => void) => () => cb(id);
  const {
    shared: sharedIntl,
    features: { profile: profileIntl },
  } = tKeys;

  const itemRows = items.map(({ id, title: itemTitle }) => (
    <div className={b('row')} key={id}>
      <div className={b('item')}>{itemTitle}</div>
      <div className={b('link')} onClick={makeHandler(id, onPreviewClick)}>
        {t(profileIntl.preview)}
      </div>
      <div className={b('link')} onClick={makeHandler(id, onRemoveClick)}>
        {t(sharedIntl.remove)}
      </div>
    </div>
  ));
  const mainTitle = <h2 className={b('main-title')}>{title}</h2>;

  return (
    <div className={b()}>
      {title && mainTitle}
      {itemRows}
    </div>
  );
}

export default withTranslation()(ProfileList);
