import { useState } from 'react';
import {
    Button,
    IconButton,
    Grid,
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import APICaller from './../../../until/callAPI'

const InputTask = (props) => {
    const newBorder = "5px solid " + props.color;
    const [textField, setTextField] = useState("");

    const handleClick = (event) => {
        if (textField !== "") {
            const newTask = {
                _id: props.board + props.size + props.value + "fake",
                board: props.board,
                description: textField,
                index: props.size,
                type: props.value
            }
            props.onCloseInputTask();

            setTextField("")
            props.onAddNewTask(newTask)

            APICaller("tasks", "POST", {
                type: props.value,
                description: textField,
                board: props.board
            })
                .then(res => {
                    props.onRealTime();
                })

        }

    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        setTextField(value);

    }

    return (
        <Grid container justify="center" style={{ border: newBorder }} >
            <Grid item xs={11} >
                <form noValidate autoComplete="off"  >
                    <TextField id="textField" value={textField} onChange={handleChange} label="Description" variant="outlined" size="small" fullWidth style={{ marginTop: "5px" }} />
                </form>
            </Grid>
            <Grid item xs={11}>
                <Grid container justify="space-between" style={{ margin: "4px" }}>
                    <Grid item  >
                        <Button variant="contained" size="small" style={{ margin: "2px", backgroundColor: "#76ff03" }} onClick={handleClick}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item >
                        <IconButton component="span" size="small" style={{ margin: "2px" }} onClick={() => props.onCloseInputTask()}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default InputTask;