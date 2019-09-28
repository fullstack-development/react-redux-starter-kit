import React from 'react';
import block from 'bem-cn';

const b = block('profile-list');

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

type IProps = IOwnProps;

function ProfileList(props: IProps) {
  const { items, title, onRemoveClick, onPreviewClick } = props;
  const makeHandler = (id: number, cb: (id: number) => void) => () => cb(id);

  const itemRows = items.map(({ id, title: itemTitle }) => (
    <div className={b('row')} key={id}>
      <div className={b('item')}>{itemTitle}</div>
      <div className={b('preview')} onClick={makeHandler(id, onPreviewClick)}>
        Preview
      </div>
      <div className={b('remove')} onClick={makeHandler(id, onRemoveClick)}>
        Remove
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

export default ProfileList;
