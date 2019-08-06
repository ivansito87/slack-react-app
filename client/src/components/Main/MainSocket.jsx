import React from 'react';
// import Grid from '@material-ui/core/Grid';
import classes from '../Style';
import "./Main.css"
import axios from "axios";
import DemoNavbar from '../NavBar/navbar';
import SimpleFooter from "../SimpleFooter/SimpleFooter";
import NewGameStartSocket from '../GameStart/NewGameStartSocket'
// import Typist from "react-typist";
import {
    Container,
    Row,
    Col
} from "reactstrap";

class MainSocket extends React.Component {
    state = {
        loggin: false
    };


    handleLogout = event => {
        event.preventDefault();
        const self = this;
        axios.get("/user/logout")
            .then(function (response) {
                console.log(response);
                localStorage.removeItem("token");
                localStorage.removeItem('id');
                localStorage.removeItem("name");
                localStorage.removeItem("last_name");
                self.props.history.push(`/login`);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    componentDidMount = () => {
        let usrId = localStorage.getItem('id');
        if (!usrId) {
            this.props.history.push(`/login`);
        }
    };

    render() {
        return (
            <>
                <DemoNavbar handleLogout={this.handleLogout} handleMultiplayer={this.handleMultiplayer}/>
                <section className="section section-shaped section-sm">
                    <div className="shape shape-style-1 bg-gradient-gray">
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                    <Container className="shape-container d-flex align-items-center">
                        <div className="col px-0">
                            <Row className="align-items-center justify-content-center">
                                <Col className="text-center" lg="10">
                                    {/*<Typist cursor={{show: false}}>
                                        <span className="display-1 text-white"> How fast can you Type?</span>
                                        <Typist.Backspace count={5} delay={500}/>
                                        <span className="display-1 text-white"> Code? </span>
                                        <Typist.Backspace delay={10}/>
                                        <span> <p className="lead text-white">
                                            Challenge yourself or a friend on <span
                                            className="text-darker font-weight-bold display-4">&#60;CodeDuel&#8725;&#62;</span><br/> created by <span
                                            className="text-darker font-weight-bold">Ivan Rendon </span>and <span
                                            className="text-darker font-weight-bold">Samuel Djiani </span>to strengthen your typing skills. In order to help you master your current language of choice, or get better typing a new one.
                                    </p></span>
                                    </Typist>*/}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Container className="container-fluid">
                        <NewGameStartSocket/>
                    </Container>
                    <Container className="py-md">
                        <main>
                            <div className={classes.heroContent}>
                            </div>
                            <Container className={classes.cardGrid} fixed>
                                {/*<Grid container justify="center" m={3}>
                                </Grid>*/}
                            </Container>
                        </main>
                    </Container>
                    <div className="separator separator-bottom separator-skew">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon className="fill-white" points="2560 0 2560 100 0 100"/>
                        </svg>
                    </div>

                    <SimpleFooter/>
                </section>
            </>
        )
    }
}

export default MainSocket;
