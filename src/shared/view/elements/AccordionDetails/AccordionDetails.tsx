import {withStyles} from "@material-ui/core/styles";
import MuiAccordionDetails from "@material-ui/core/ExpansionPanelDetails";

const AccordionDetails = withStyles(() => ({
    root: {
        padding: '0 0 15px',
        fontSize: 18,
        lineHeight: 1.3,
        color: 'rgba(0, 0, 0, 0.6)'
    },
}))(MuiAccordionDetails);

export {AccordionDetails}