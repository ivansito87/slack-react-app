import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import "./FooterPage.css";
// import classes from '../Style';
// import Button from "@material-ui/core/Button";

function FooterPage (){
    return(
        <header className='navbar' style={{marginBottom: "0px", fontFamily: 'Roboto Mono' }}>
            <div className='navbar__title navbar__item'>&#60;&#8725;Codeduel&#62;</div>
            <Typography variant="h4" align="right" gutterBottom>
                &#10635;Tank you for using our app&#10636;
            </Typography>
            <p className='navbar__item' style={{ fontFamily: 'Roboto Mono', marginRight: "10px" }} color={window.innerWidth > 959 ? "transparent" : "white"}>.</p>
            </header>

    )
}
export default FooterPage;
