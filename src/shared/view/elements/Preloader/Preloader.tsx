import * as React from 'react';
import block from 'bem-cn';

import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';
import './Preloader.scss';

interface IProps {
  isShown: boolean;
  size?: number;
}

const b = block('preloader');

function Preloader(props: IProps) {
  const { isShown, size } = props;
  return isShown
    ? (
      <div className={b()}>
        <CircleProgressBar size={size} />
      </div>
    )
    : null;
}

export default Preloader;
