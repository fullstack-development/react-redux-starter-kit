import {withStyles} from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";

const PaginationControl = withStyles({
  root: {
    width: '30px',
    height: '30px',
    borderRadius: '50px',
    fontSize: '15px',
    color: '#5c5d66',
    '&.pagination-page_active, &.pagination-arrow': {
      backgroundColor: '#e6e9fe'
    }
  }
})(ButtonBase);

export default PaginationControl