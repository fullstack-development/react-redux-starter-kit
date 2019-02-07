import * as React from 'react';
import block from 'bem-cn';
import './Layout.scss';

const b = block('layout');

function Layout(props: React.ComponentProps<'div'>) {
  const { children } = props;
  return (
    <div className={b()}>
      {children}
      <div className={b('footer')}>
        <a className={b('link')} href="https://fullstack-development.com" target="_blank">
          Fullstack Development
        </a>
      </div>
    </div>
  );
}

export default Layout;
