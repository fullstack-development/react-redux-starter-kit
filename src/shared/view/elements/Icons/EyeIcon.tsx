import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function EyeIcon(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" transform="translate(-1 2)">
        <path stroke="currentColor" strokeWidth="1.5" d="M1.994 7a8.254 8.254 0 0 0 16.012 0A8.254 8.254 0 0 0 1.994 7z" />
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </SvgIcon>
  );
}

export default EyeIcon;
