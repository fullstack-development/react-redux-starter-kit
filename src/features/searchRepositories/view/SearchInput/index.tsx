import * as React from 'react';
import * as block from 'bem-cn';
import { FormControl, Form, FormGroup, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import * as s from './styles.styl';
console.log(s);
interface Props {
    value? : string
}

function SearchRepositoriesInput (props : Props) : React.ReactElement<Props> {
    const b = block('search-repositories-input');

    return (
        <Form className={s[b()]}>
            <FormControl className={s[b('input')()]} type="text" placeholder="Repository name" />
            <Button className={s[b('submit')()]}>
                <Glyphicon glyph="search" />
            </Button>
        </Form>
    );
}

export { Props };
export default SearchRepositoriesInput;
