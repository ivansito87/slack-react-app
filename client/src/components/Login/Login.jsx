import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import classnames from "classnames";

import {
		Button,
		Card,
		CardHeader,
		CardBody,
		FormGroup,
		Form,
		Input,
		InputGroupAddon,
		InputGroupText,
		InputGroup,
		Container,
		Row,
		Col
} from "reactstrap";

import SimpleFooter from "../SimpleFooter/SimpleFooter.jsx";
// import Typist from "react-typist";

class Login extends Component {
		constructor(props) {
				super(props);
				this.state = {
						isRegistered: false,
						email: localStorage.getItem("email"),
						password: '',
						error: '',
						remChecked: true
				}
		}

		handleCheckbox = (event) => {
				//alert("alert!");
				// console.log(localStorage.getItem("email"));
				this.setState({remChecked: !this.state.remChecked});
		};

		// constructor(props) {
		// 	super(props);
		// 	this.state = {
		// 		isRegistered: false,
		// 		email: '',
		// 		password: '',
		// 		error: ''
		// 	}
		// };

		handleClick = event => {
				event.preventDefault();

				var payload = {
						"email": this.state.email,
						"password": this.state.password
				};
				console.log("Login values --> ", payload.email, payload.password);


				// axios.post("/user/login", payload)
				// 		.then((response) => {
				// 				console.log("response", response);
				// 				if (response.status === 200) {
				// 						console.log("Login successfull", response);
				// 						//render the full game
				// 						localStorage.setItem("id", response.data.id);
				// 						localStorage.setItem("token", response.data.token);
				// 						let firstName = response.data.first_name.charAt(0).toUpperCase() + response.data.first_name.slice(1);
				// 						let lastName = response.data.last_name.charAt(0).toUpperCase() + response.data.last_name.slice(1);
				// 						let fullName = firstName + " " + lastName;
				// 						localStorage.setItem("name", fullName);


				axios.post("/user/login", payload)
						.then((response) => {
								console.log("response status", response.status);
								if (response.status === 200) {
										console.log("Login successfull", response);
										this.setState({error: ""});
										//render the full game
										localStorage.setItem("id", response.data.id);
										localStorage.setItem("token", response.data.token);
										let firstName = response.data.first_name.charAt(0).toUpperCase() + response.data.first_name.slice(1);
										let lastName = response.data.last_name.charAt(0).toUpperCase() + response.data.last_name.slice(1);
										let fullName = firstName + " " + lastName;
										localStorage.setItem("name", fullName);
										console.log("remchecked", this.state.remChecked);
										this.state.remChecked ? localStorage.setItem("email", response.data.email) : localStorage.removeItem("email");

										const queryParams = new URLSearchParams(this.props.location.search);
										const referrer = queryParams.get("referrer");
										this.props.history.push(referrer || "/singleplayer");

								} else if (response.status === 401) {
										this.setState({error: "Email does not exist"});
								} else {
										this.setState({error: "Email does not exist"});
								}
						})
						.catch(error => {
								console.log("internal error ", error.message);
								this.setState({error: "Email or passsword is not correct"});
						});
		};

		redirectLogin = (event) => {
				this.props.history.push(`/register`);
		};

		render() {
				const userId = localStorage.getItem("token");
				if (userId) {
						this.props.history.push(`/singleplayer`);
				}

				return (
						<>
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
										<Container className="py-md">
												<Row className="row-grid justify-content-between align-items-center">
														<Col lg="6">
																{/*<Typist cursor={{show: false}}>
																		<span className="display-3 text-white">Welcome to<br/></span><span
																		className="text-darker display-1"> &#60;CodeDuel&#8725;&#62;<br/></span><span
																		className="display-4">The place where you achieve mastery through challenge</span>
																		<Typist.Backspace count={9} delay={200}/>
																		<span className="display-2 text-darker"> typing </span>
																		<Typist.Backspace delay={50}/>
																		<span> <p className="lead text-white">
										As you complete higher levels in Codeduel, you enhance your typing skills so you can take them to the real world.
                                    </p></span>
																</Typist>*/}
																<div className="btn-wrapper">
																		<Button
																				className="btn-white shadow-lg--hover"
																				color="success"
																				to="/register"
																				tag={Link}
																				onClick={(event) => this.redirectLogin()}
																		>
																				Create New Account
																		</Button>
																</div>
														</Col>
														<Col className="mb-lg-auto" lg="5">
																<div className="transform-perspective-right">
																		<Card className="bg-secondary shadow border-0">
																				<CardHeader className="bg-white pb-5">
																						<div className="text-muted text-center mb-3">
																								<small>Sign in with</small>
																						</div>
																						<div className="btn-wrapper text-center">
																								<Button
																										className="btn-neutral btn-icon shadow-lg--hover"
																										color="default"
																										href="#ivan"
																										onClick={e => e.preventDefault()}
																								>
																								<span className="btn-inner--icon mr-1">
																										<img
																												alt="..."
																												src={require("../../images/github.svg")}
																										/>
																								</span>
																										<span className="btn-inner--text">Github</span>
																								</Button>
																								<Button
																										className="btn-neutral btn-icon shadow-lg--hover"
																										color="default"
																										href="#ivan"
																										onClick={e => e.preventDefault()}
																								>
																							  <span className="btn-inner--icon mr-1">
																										<img
																												alt="..."
																												src={require("../../images/google.svg")}
																										/>
																							  </span>
																										<span className="btn-inner--text">Google</span>
																								</Button>
																						</div>
																				</CardHeader>
																				<CardBody className="px-lg-5 py-lg-5">
																						<div className="text-center text-muted mb-4">
																								{this.state.error ? <p className="text-danger">{this.state.error}</p> :
																										<p>Or sign in with credentials</p>}
																						</div>

																						<Form role="form">
																								<FormGroup
																										className={classnames("mb-3", {
																												focused: this.state.emailFocused
																										})}
																								>
																										<InputGroup className="input-group-alternative">
																												<InputGroupAddon addonType="prepend">
																														<InputGroupText>
																																<i className="ni ni-email-83"/>
																														</InputGroupText>
																												</InputGroupAddon>
																												<Input
																														placeholder="Email"
																														type="email"
																														onFocus={e =>
																																this.setState({emailFocused: true})
																														}
																														onBlur={e =>
																																this.setState({emailFocused: false})
																														}
																														defaultValue={this.state.remChecked ? localStorage.getItem("email") || " " : ""}
																														onChange={(event, newValue) => this.setState({email: event.target.value})}
																												/>
																										</InputGroup>
																								</FormGroup>
																								<FormGroup
																										className={classnames({
																												focused: this.state.passwordFocused
																										})}
																								>
																										<InputGroup className="input-group-alternative">
																												<InputGroupAddon addonType="prepend">
																														<InputGroupText>
																																<i className="ni ni-lock-circle-open"/>
																														</InputGroupText>
																												</InputGroupAddon>
																												<Input
																														placeholder="Password"
																														type="password"
																														autoComplete="off"
																														onFocus={e =>
																																this.setState({passwordFocused: true})
																														}
																														onBlur={e =>
																																this.setState({passwordFocused: false})
																														}
																														onChange={(event, newValue) => this.setState({password: event.target.value})}
																												/>
																										</InputGroup>
																								</FormGroup>
																								<div
																										className="custom-control custom-control-alternative custom-checkbox">
																										<input
																												className="custom-control-input"
																												id="customCheckLogin2"
																												type="checkbox"
																												checked={this.state.remChecked}
																												onChange={this.handleCheckbox}
																										/>
																										<label
																												className="custom-control-label"
																												htmlFor="customCheckLogin2"
																										>
																												<span className="text-center text-muted mb-4">Remember me</span>
																										</label>
																								</div>
																								<div className="text-center">
																										<Button
																												className="my-4 shadow-lg--hover"
																												color="primary"
																												type="button"
																												onClick={this.handleClick}
																										>
																												Sign in
																										</Button>
																								</div>
																						</Form>
																				</CardBody>
																		</Card>
																</div>
														</Col>
												</Row>
										</Container>
								</section>
								<SimpleFooter/>
						</>
				);
		}
}

export default Login;
