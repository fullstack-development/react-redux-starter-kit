import React from 'react';
import block from 'bem-cn';

import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';
import './Preloader.scss';

interface IProps {
  isShown: boolean;
  size?: number;
  backgroundColor?: string;
}

const b = block('preloader');

function Preloader(props: IProps) {
  const { isShown, size, backgroundColor} = props;
  return isShown
    ? (
      <div className={b()} style={{ backgroundColor }}>
        <CircleProgressBar size={size} />
      </div>
    )
    : null;
}

export default Preloader;
