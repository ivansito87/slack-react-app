import React from 'react';
// import Grid from '@material-ui/core/Grid';
import classes from '../Style';
import "./Main.css"
import axios from "axios";
import DemoNavbar from '../NavBar/navbar';
import SimpleFooter from "../SimpleFooter/SimpleFooter";
import NewGameStart from '../GameStart/NewGameStart'
// import Typist from "react-typist";
import {
		Container,
		Row,
		Col
} from "reactstrap";

class Main extends React.Component {
		state = {
				loggin: false
		};

		handleLogout = event => {
				event.preventDefault();
				const self = this;
				axios.get("/user/logout")
						.then(function (response) {
								// console.log(response);
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
								<DemoNavbar handleLogout={this.handleLogout}/>
								<section className="section section-lg section-shaped">
										<div className="shape shape-style-1 shape-default bg-gradient-gray-dark">
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
																				<Typist.Backspace count={5} delay={1000}/>
																				<span className="display-1 text-white"> Code? </span>
																				<Typist.Backspace delay={10}/>
																		</Typist>*/}
																		<p className="lead text-white">
																				Challenge yourself or a friend on <span
																				className="text-darker font-weight-bold display-4">&#60;CodeDuel&#8725;&#62;</span><br/> created
																				by <span
																				className="text-darker font-weight-bold">Ivan Rendon </span>and <span
																				className="text-darker font-weight-bold">Samuel Djiani </span>to strengthen your
																				typing skills. In order to help you master your current language of choice, or
																				get better typing a new one.
																		</p>
																</Col>
														</Row>
												</div>
										</Container>
										<Container className="container-fluid">
												<NewGameStart/>
										</Container>
										<Container className="py-md">
												<main>
														<div className={classes.heroContent}>
														</div>
														<Container className={classes.cardGrid} fixed="true">
																{/*<Grid container justify="center" m={3}>
																</Grid>*/}
														</Container>
												</main>
										</Container>
								</section>
								<SimpleFooter/>
						</>
				)
		}
}

export default Main;
