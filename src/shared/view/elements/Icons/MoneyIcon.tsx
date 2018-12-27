import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function MoneyIcon(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd">
        <path stroke="currentColor" strokeWidth="1.5" d="M16.25 12.893L.75 2.778V14A3.25 3.25 0 0 0 4 17.25h12.25v-4.357zM.707 2.75L.52 2.628l.23.068v.054H.707zM16.246 3.249L16.234.833 1.987.75H1.98C1.3.75.75 1.3.75 1.98c0 .687.556 1.244 1.243 1.245l14.253.024z" />
        <path stroke="currentColor" strokeWidth="1.5" d="M17.25 12.25v-4.5H15a2.25 2.25 0 1 0 0 4.5h2.25z" />
        <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" d="M16.253 3.248v3" />
      </g>
    </SvgIcon>
  );
}

export default MoneyIcon;
