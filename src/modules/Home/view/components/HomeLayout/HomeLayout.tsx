import React from 'react';
import block from 'bem-cn';

import MainNav from '../MainNav/MainNav';
import './HomeLayout.scss';

const b = block('home-layout');

function HomeLayout() {
  return (
    <div className={b()}>
      <div className={b('content')}>
        <h1 className={b('title')}>
          <span className={b('company')}>FSD</span>
          <br/>
          <span className={b('demo')}>React+Redux Demo</span>
        </h1>
        <MainNav />
      </div>
    </div>
   );
}

export default HomeLayout;
