import * as React from 'react';
import MuiMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';

function MenuItem(props: MenuItemProps) {
  return (
    <MuiMenuItem color="primary" {...props} />
  );
}

export default MenuItem;
