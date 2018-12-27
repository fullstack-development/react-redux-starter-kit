import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Question(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" transform="translate(-234 -342)">
        <circle cx="243" cy="351" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path fill="currentColor" d="M242.011 352c0-.544.076-.978.227-1.3.15-.323.427-.64.829-.954.401-.313.669-.567.802-.763.133-.197.2-.404.2-.621 0-.657-.346-.986-1.039-.986-.329 0-.592.089-.79.265-.197.177-.3.421-.309.732H240c.009-.742.283-1.323.822-1.743.54-.42 1.276-.63 2.208-.63.941 0 1.671.2 2.19.598.52.398.78.96.78 1.688 0 .33-.084.642-.253.936-.169.293-.464.619-.886.976l-.54.45c-.337.283-.53.615-.578.996l-.027.356h-1.705zm-.011 2.007c0-.292.094-.533.28-.723A.967.967 0 0 1 243 353c.292 0 .532.095.72.284.186.19.28.43.28.723a.977.977 0 0 1-.275.712c-.183.187-.425.281-.725.281s-.542-.094-.725-.281a.977.977 0 0 1-.275-.712z" />
      </g>
    </SvgIcon>
  );
}

export default Question;
