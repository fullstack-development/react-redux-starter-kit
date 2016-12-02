import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './TestComponent';

interface Test {
    a: Number;
    b: Number;
}

const test: Test = { a: 2, b: 4 };

console.log(test);

ReactDOM.render(
    <Hello framework="React" compiler="Typescript" />,
    document.getElementById('root')
);