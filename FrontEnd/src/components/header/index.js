import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.setItem('token', null);
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={process.env.PUBLIC_URL + '/'} style={{ textDecoration: "none", color: "white" }}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <GroupIcon />
                        </IconButton>
                    </Link>

                    <Typography variant="h6" className={classes.title}>
                        Retrospective
                    </Typography>
                    {
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >

                                <Link to={process.env.PUBLIC_URL + '/profile'} style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem >Profile</MenuItem>
                                </Link>
                                <Link to={{
                                    pathname: '/login',
                                    state: {
                                        type: 'success',
                                        message: "Successfully logged out!",
                                        open: true
                                    }
                                }}
                                    style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
