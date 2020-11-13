import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Card, CardContent, Box } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChangeValue(newValue);
    };

    return (
        <Box mt={5}>
            <Card>
                <CardContent>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Profile" maxwidth="true" />
                        <Tab label="Update Information" maxwidth="true" />
                        <Tab label="Change Password" maxwidth="true" />
                    </Tabs>
                </CardContent>
            </Card>
        </Box>
    );
}
