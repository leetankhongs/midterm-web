import React, { useState, useEffect } from 'react';
import BoardItem from './../boardItem/index'
import { Grid, Box } from '@material-ui/core';

import APICaller from './../../../until/callAPI'
import InputBoard from '../inputBoard/index'
import CustomizedSnackbars from './../../../components/snackbar/index'


const BoardList = (props) => {
    const [boards, setBoards] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        APICaller('boards/user/' + props.userID, 'GET', null).then(res => {
            setBoards(res.data)
        });
    }, [isReset, props.userID]);


    const handleReset = () => {
        setIsReset(!isReset)
    }

    const handleDelete = () => {
        setIsReset(!isReset)
        setIsDelete(true)
    }

    const changeDelete = () => {
        setIsDelete(false)
    }

    const createBoardList = () => {
        return (
            boards.map(board => {
                return (
                    <Grid item md={2} xs={12} key={board._id}>
                        <Box mr={2} mt={2}>
                            <BoardItem name={board.name} id={board._id} day={board.date} url={board.url} onDelete={handleDelete} onChangeDelete={changeDelete} />
                        </Box>
                    </Grid>
                )
            })
        )
    }

    return (
        <div style={{ margin: "10px" }}>
            {isDelete ? <CustomizedSnackbars open={true} type="success" message="Successfully deleted the board" /> : <></>}

            <h1>Board List</h1>
            <Grid container>
                <Grid item md={2} xs={12}>
                    <Box mr={2} mt={2}>
                        <InputBoard onReset={handleReset} userID={props.userID} />
                    </Box>
                </Grid>
                {createBoardList()}
            </Grid>
        </div>
    );
}

export default BoardList;
