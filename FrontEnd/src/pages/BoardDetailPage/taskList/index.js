import { Box } from '@material-ui/core';
import ColumnList from '../columnList/index'

const TaskList = (props) => {

    return (
        <Box style={{ margin: "16px" }}>
            <ColumnList boardID={props.boardID} />
        </Box>
    )
}

export default TaskList;