import * as React from 'react';
import { PageHeader, Label } from 'react-bootstrap';
import './Layout.scss';
import block from 'bem-cn';

function Description(): React.ReactElement<object> {
  const b = block('index-page');
  return (
    <div>
      <PageHeader>FSD React-redux starter kit</PageHeader>
      <p className={b('description')()}>
        This starter kit built on base of very great tools, which makes front
        end developing much better and more reliable. Feel free to explore
        that project. We used here such instruments, as:
        <Label bsStyle="primary" className={b('tool')()}>TypeScript 2.x</Label>
        <Label bsStyle="primary" className={b('tool')()}>React</Label>
        <Label bsStyle="primary" className={b('tool')()}>Redux</Label>
        <Label bsStyle="primary" className={b('tool')()}>Stylus</Label>
        <Label bsStyle="primary" className={b('tool')()}>Bem</Label>
        <Label bsStyle="primary" className={b('tool')()}>Webpack 2.x</Label>
      </p>
      <p className={b('description')()}>
        For demonstrating purposes we implemented simple web-app using GitHub api for exploring
        repositories, issues and users. Description of project structure and app architecture
        you can find in README.md in the root of project.
      </p>
    </div>
  );
}

export default Description;
