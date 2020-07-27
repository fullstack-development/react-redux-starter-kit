import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/ExpansionPanel';

const Accordion = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);


export {Accordion}