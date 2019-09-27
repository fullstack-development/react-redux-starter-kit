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

  const itemRows = items.map(({ id, title }) => (
    <div className={b('row')} key={id}>
      <div className={b('item')}>{title}</div>
      <div className={b('preview')} onClick={() => onPreviewClick(id)}>
        Preview
      </div>
      <div className={b('remove')} onClick={() => onRemoveClick(id)}>
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
