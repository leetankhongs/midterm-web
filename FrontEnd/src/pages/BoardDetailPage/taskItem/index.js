import { useState, useEffect } from 'react';
import { IconButton, Grid, TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Draggable } from 'react-beautiful-dnd';

import APICaller from './../../../until/callAPI'

const getItemStyle = (isDragging, draggableStyle, color) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 5,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    backgroundColor: color,
    filter: isDragging ? 'brightness(2)' : 'brightness(1)',
    // styles we need to apply on draggables
    ...draggableStyle
});

const TaskItem = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(props.taskInfor.description);
    const newBorder = "5px solid " + props.background;

    useEffect(() => {
        setContent(props.taskInfor.description);
        setIsEdit(false);
    }, [props.taskInfor.description]);

    const handleClick = () => {

        props.onDeleteTask(props.taskInfor);
        APICaller('tasks/' + props.taskInfor._id, 'DELETE', null).then(res => props.onRealTime());
    }

    const handleEditClick = () => {
        setIsEdit(true);
    }

    const handleDoEditTask = () => {
        props.onEditTask(props.taskInfor, content);
        setIsEdit(false);

        APICaller('tasks/edit/' + props.taskInfor._id, 'POST', {
            description: content
        }).then(res => props.onRealTime())
    }

    const handleChange = (event) => {
        setContent(event.target.value);
    }

    if (isEdit) return (
        <Grid container justify="center" style={{ border: newBorder }} >
            <Grid item xs={11} >
                <form noValidate autoComplete="off"  >
                    <TextField id="textField" value={content} label="Description" variant="outlined" size="small" fullWidth style={{ marginTop: "5px" }} onChange={handleChange} />
                </form>
            </Grid>
            <Grid item xs={11}>
                <Grid container justify="space-between" style={{ margin: "4px" }}>
                    <Grid item  >
                        <Button variant="contained" size="small" style={{ margin: "2px", backgroundColor: "#76ff03" }} onClick={handleDoEditTask}>
                            Done
                        </Button>
                    </Grid>
                    <Grid item >
                        <IconButton component="span" size="small" style={{ margin: "2px" }} onClick={handleClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )

    return (
        <Draggable
            key={props.taskID}
            draggableId={props.taskID}
            index={props.index}
            isDragDisabled={!props.canDrag}

        >
            {(provided, snapshot) => (
                <Grid container ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        props.background
                    )}
                >
                    <Grid item >
                        {props.taskInfor.description}
                    </Grid>
                    <Grid container direction="row" justify="flex-end" alignItems="baseline" >
                        <Grid item>
                            <IconButton component="span" size="small" onClick={handleEditClick} disabled={!props.canDrag}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <IconButton component="span" size="small" onClick={handleClick} disabled={!props.canDrag}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid >
            )
            }
        </Draggable >
    )
}

export default TaskItem;