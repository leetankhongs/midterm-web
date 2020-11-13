import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';

import APICaller from '../../../until/callAPI'
import CustomizedSnackbars from './../../../components/snackbar/index'
const InputBoard = (props) => {
    const [textField, setTextField] = useState("");

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSuccess(false);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClick = (event) => {
        if (textField !== "") {
            APICaller("boards", "POST", {
                name: textField,
                user: props.userID
            }).then(res => {props.onReset(); setSuccess(true)})

            setTextField("")
            setOpen(false);
        }

    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        setTextField(value);

    }

    return (
        <>
            {success ? <CustomizedSnackbars open={true} type="success" message="Thêm thành công" /> : <></>}
            <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth={true} style={{ height: "150px" }}>
                Add Board
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick = {true}>
                
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Board Name"
                        type="text"
                        fullWidth
                        value={textField}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                            </Button>
                    <Button onClick={handleClick} color="primary">
                        Subscribe
                            </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InputBoard;