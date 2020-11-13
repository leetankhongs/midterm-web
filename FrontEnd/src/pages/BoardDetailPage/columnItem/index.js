import { useEffect, useState } from 'react';
import {
    Button,
    Box,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';


import TaskItem from './../taskItem/index'
import InputTask from './../inputTask/index'


const getListStyle = (isDraggingOver, color) => ({
    background: isDraggingOver ? 'dark' + color : "",
    padding: '8px 0px',
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            width: theme.spacing(2),
            height: theme.spacing(2),
        },
    },
    load: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const ColumnItem = (props) => {
    const classes = useStyles();

    const [tasks, setTasks] = useState([]);
    const [indexAddColumn, setIndex] = useState(-1);

    useEffect(() => {
        setTasks(props.tasks);
    }, [props.tasks]);

    const handleClickAdd = (value) => {
        if (value === indexAddColumn) {
            setIndex(-1);
        } else {
            setIndex(value);
        }
    }

    const handleCloseInputTask = () => {
        setIndex(-1);
    }


    return (
        <>

            <Grid item md={4} xs={12} >
                <Grid container alignItems="center">
                    <Grid item>
                        <Box className={classes.root}>
                            <Paper variant="outlined" square style={{ background: props.infor.color }} />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography align="center" variant="h6" style={{ margin: "0px 8px" }} >{props.infor.label}</Typography >
                    </Grid>
                </Grid>
                <Button variant="contained" fullWidth={true} onClick={() => handleClickAdd(props.columnType)} disabled={!props.canDrag}><AddIcon /></Button>
                {indexAddColumn === props.infor.value ?
                    <Box mt={2} mb={2} >
                        <InputTask color={props.infor.color} value={props.infor.value} onCloseInputTask={handleCloseInputTask} board={props.boardID} size={tasks.length} onAddNewTask={props.onAddNewTask} onRealTime={props.onRealTime} />
                    </Box> : ""}

                <Droppable droppableId={String(props.columnType)} >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver, props.infor.color)}>
                            {tasks.map((task, dex) => {
                                return (
                                    <Box mt={2} mb={2} key={dex}>
                                        <TaskItem index={dex} taskInfor={task}
                                            background={props.infor.color}
                                            taskID={task._id}
                                            onDeleteTask={props.onDeleteTask}
                                            onEditTask={props.onEditTask}
                                            canDrag={props.canDrag}
                                            onRealTime={props.onRealTime} />
                                    </Box>
                                )
                            })}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
            </Grid>
        </>
    );
}

export default ColumnItem;
