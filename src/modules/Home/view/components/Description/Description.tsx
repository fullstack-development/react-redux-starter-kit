import * as React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { StylesProps, provideStyles } from './Description.style';

function Description({ classes }: StylesProps) {
  return (
    <>
      <Typography variant="display3">FSD React-redux starter kit</Typography>
      <Divider classes={{ root: classes.dividerRoot }} />
      <Typography gutterBottom>
        This starter kit built on base of very great tools, which makes front
        end developing much better and more reliable. Feel free to explore
        that project. We used here such instruments, as:
        <Label className={classes.label}>TypeScript 2.x</Label>
        <Label className={classes.label}>React</Label>
        <Label className={classes.label}>Redux</Label>
        <Label className={classes.label}>Stylus</Label>
        <Label className={classes.label}>Bem</Label>
        <Label className={classes.label}>Webpack 2.x</Label>
      </Typography>
      <Typography gutterBottom>
        For demonstrating purposes we implemented simple web-app using GitHub api for exploring
        repositories, issues and users. Description of project structure and app architecture
        you can find in README.md in the root of project.
      </Typography>
    </>
  );
}

interface ILabelProps {
  children: string;
  className: string;
}

function Label({ children, className }: ILabelProps) {
  return <> <span className={className}>{children}</span></>;
}

export default provideStyles(Description);
