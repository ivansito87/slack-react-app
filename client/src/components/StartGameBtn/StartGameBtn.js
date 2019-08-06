import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classes from '../Style';

function StartGameBtn(props) {


    return (
        <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={props.onClick}>
                        Start
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default StartGameBtn;