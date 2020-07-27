import {withStyles} from "@material-ui/core/styles";
import MuiAccordionSummary from "@material-ui/core/ExpansionPanelSummary";

const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        padding: 0,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 2,
        color: '#304FFE',
        '&$expanded': {
            margin: '12px 0',
            color: 'rgba(0, 0, 0, 0.87)'
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export {AccordionSummary}