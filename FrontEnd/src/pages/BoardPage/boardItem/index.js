import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import APICaller from './../../../until/callAPI'
import ConfirmDialog from './../../../components/confirmDialog/index';
import CustomizedSnackbars from './../../../components/snackbar/index'

const BoardItem = (props) => {

    const [taskNumber, setTaskNumber] = useState(0);
    const [copied, setCopied] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        APICaller('tasks/board?id=' + props.id, 'GET', null).then(res => {
            setTaskNumber(res.data.length);
        });
    }, [props.id]);
    const day = new Date(props.day);

    const handleChoose = (value) => {
        if (value) {
            APICaller('boards/' + props.id, 'DELETE', null).then(res => {
                props.onDelete();
                setIsSubmit(false);
            });

        }
        setIsSubmit(false);
    }

    const handleClickToDelete = () => {
        props.onChangeDelete();
        setIsSubmit(true);
    }

    return (
        <>
            {isSubmit ? <ConfirmDialog title="Delete board" content="Do you want to delete this board?" onChoose={handleChoose} /> : <></>}
            {copied === true ? <CustomizedSnackbars open={true} type="success" message="Copied" /> : <></>}
            {copied === false ? <CustomizedSnackbars open={true} type="success" message="Copied" /> : <></>}
            <Card style={{ border: "1px solid black" }}>
                <CardActionArea>
                    <Link to={process.env.PUBLIC_URL + '/boards?id=' + props.id} style={{ textDecoration: "none", color: "black" }}>
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.name}
                            </Typography>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear()}

                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {taskNumber} tasks
                                </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions>
                    <Grid container justify="space-between">
                        <Grid item>
                            <CopyToClipboard text={props.url} onCopy={() => { setCopied(!copied) }}>
                                <Button size="small" color="primary">
                                    URL
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item>
                            <Button size="small" color="primary" onClick={handleClickToDelete}>
                                Delete
                        </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card >

        </>
    );
}

export default BoardItem;