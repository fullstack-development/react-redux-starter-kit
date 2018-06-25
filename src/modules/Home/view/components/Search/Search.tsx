import * as React from 'react';
import { Typography, Divider } from '@material-ui/core';

import * as GitHubIcon from './images/github-icon.png';
import { StylesProps, provideStyles } from './Search.style';

interface IProps {
  SearchRepositoriesInput: React.ComponentClass<any>;
}

function Search({ SearchRepositoriesInput, classes }: IProps & StylesProps) {
  return (
    <>
      <div className={classes.title}>
        <img className={classes.githubIcon} src={GitHubIcon} />
        <Typography variant="display2">Search repositories on github</Typography>
      </div>
      <Divider classes={{ root: classes.dividerRoot }} />
      <SearchRepositoriesInput />
    </>
  );
}

export default provideStyles(Search);
