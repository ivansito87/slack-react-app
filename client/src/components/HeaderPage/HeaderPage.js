import React from 'react';
import Button from '@material-ui/core/Button';
import "./HeaderPage.css";


function HeaderPage(props){
    return (
        <header className='navbar'>
            <div className='navbar__title navbar__item'>&#60;Codeduel&#62;</div>
            <Button className='navbar__item buttonLink' style={{ marginRight: "10px" }}>&#60;Speed&#8725;&#62;</Button>
            <Button className='navbar__item buttonLink' style={{ marginRight: "10px" }}>Single-player</Button>
            <Button className='navbar__item buttonLink' style={{ marginRight: "10px" }}>Multi-player</Button>
            <Button className='navbar__item buttonLink' style={{ marginRight: "10px" }} onClick={props.handleLogout}>Logout</Button>
        </header>

    )
}

export default HeaderPage;
