import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Test {
    a: Number;
    b: Number;
}

const test: Test = { a: 2, b: 4 };

interface HelloProps { compiler: string; framework: string; }

class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

console.log(JSON.stringify(test));

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('root')
);