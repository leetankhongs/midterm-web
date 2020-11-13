import { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    IconButton,
    TextField,
    Button
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import callAPI from './../../../until/callAPI'
const BoardHeader = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [text, setText] = useState("");
    
    useEffect(() => {
        callAPI('boards/' + props.boardID, 'GET', null).then(res => {
            setBoardName(res.data.name);
            setText(res.data.name);
        })
    }, [props.boardID])

    const handleOpenEditBoardName = () => {
        setText(boardName);
        setIsEdit(!isEdit)
    }

    const handleClick = () => {
        if (text !== "")
            callAPI('boards/edit/' + props.boardID, 'POST', { name: text }).then(res => {
                setIsEdit(false)
                setBoardName(text)
            })
    }

    return (
        <Grid container direction="row" justify="space-between" alignItems="center" style={{ backgroundColor: "white" }}>
            <Grid item style={{ margin: "8px 16px" }}>
                <Grid container>
                    {isEdit ?
                        <>
                            <Grid item>
                                <TextField
                                    id="outlined-textarea"
                                    label="Board Name"
                                    placeholder="Board Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: "-4px 0px" }}
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}

                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" size="small" style={{ margin: "0px 20px" }} onClick={handleClick}>
                                    Save
                            </Button>
                            </Grid>
                            <Grid item>
                                <Button size="small" onClick={handleOpenEditBoardName}>Cancel</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item>
                                <Typography variant="h6">{boardName}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton component="span" size="small" style={{ margin: "0px 8px" }} onClick={handleOpenEditBoardName}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </>
                    }
                </Grid>


            </Grid>
        </Grid>
    );
}

export default BoardHeader;
