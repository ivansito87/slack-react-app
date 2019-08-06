import React, {Component} from "react";
import axios from "axios";
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
		Col,
} from "reactstrap";
import SimpleFooter from "../SimpleFooter/SimpleFooter.jsx";
// import Typist from "react-typist";

class Register extends Component {

		constructor(props) {
				super(props);
				this.state = {
						first_name: "",
						last_name: "",
						email: "",
						password: "",
						comfirmPassword: "",
						error: ""

				};
		}


		handleClick = event => {
				event.preventDefault();

			/*	console.log(
						"Register values --> ",
						this.state.first_name,
						this.state.last_name,
						this.state.email,
						this.state.password
				);*/

				// this.error_last_name = !this.state.last_name?<FormFeedback invalid>First name required!</FormFeedback>: <FormFeedback ></FormFeedback>
				// this.error_first_name = !this.state.first_name?<FormFeedback invalid>First name required!</FormFeedback>: <FormFeedback ></FormFeedback>
				// this.error_email = !this.state.email?<FormFeedback invalid>email required!</FormFeedback>: <FormFeedback ></FormFeedback>
				// this.error_password = !this.state.password?<FormFeedback invalid>password required!</FormFeedback>: <FormFeedback ></FormFeedback>

				if (!this.state.last_name || !this.state.first_name || !this.state.email || !this.state.password || !this.state.comfirmPassword) {
						this.setState({error: "Please, fill out the form!"});
						return
				}

				const emailChecker = new RegExp(/^.+@.+\..+$/g);
				if (!emailChecker.test(this.state.email)) {
						this.setState({error: "Invalid Email address!"});
						return
				}

				if (this.state.password.length < 6) {
						this.setState({error: "Password should be at lease 6 characters long!"});
						return
				}

				if (this.state.password !== this.state.comfirmPassword) {
						this.setState({error: "Password does not Match!"});
						return
				}


				//check for unique email
				axios.get("/user/" + this.state.email)
						.then((dbUer) => {
								console.log("dbUer ", dbUer);
								if (dbUer.data) {
										this.setState({error: "email already taken!"});
										return Promise.reject({message: 'Email already taken'});
								}
								return Promise.resolve();
						})
						.then(() => {
								this.setState({error: ""});
								//var self = this;
								var newUser = {
										first_name: this.state.first_name,
										last_name: this.state.last_name,
										email: this.state.email,
										password: this.state.password
								};

								return axios.post("/user/register", newUser)

						})
						.then((response) => {
								if (response.status === 200) {
										console.log("checked passed 5")
										localStorage.setItem("email", this.state.email);
										this.props.history.push(`/login`);
										console.log("user added successfully");
								} else {
										console.log(response);
								}
						})
						.catch((error) => {
								console.log("error in register!");
								console.log(error);
						});
		};

		render() {
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
																		<span className="display-3 text-white">Create a new account at</span><span
																		className="text-darker display-1"> &#60;CodeDuel&#8725;&#62;<br/></span><span
																		className="display-4">Challenge your friends. Master your current language of
                                    choice, or expand your understanding of a all</span>
																		<Typist.Backspace count={3} delay={200}/>
																		<span className="display-4"> new one </span>
																		<Typist.Backspace delay={50}/>
																		<span> <p className="display-4">
                                        Enhance your typing skills so you can take them to the<br/> nightclub.
                                    </p></span>
																		<Typist.Backspace count={10} delay={50}/>
																		<span> <p className="display-4">
                                        the real world.
                                    </p></span>
																</Typist>*/}
																<div className="btn-wrapper">
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
																										className="btn-neutral btn-icon"
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
																										className="btn-neutral btn-icon"
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
																										<p>Create Free Account</p>}
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
																														placeholder="First Name"
																														type="text"
																														onFocus={e =>
																																this.setState({emailFocused: true})
																														}
																														onBlur={e =>
																																this.setState({emailFocused: false})
																														}
																														onChange={(event) =>
																																this.setState({first_name: event.target.value})
																														}
																														invalid
																												/>

																										</InputGroup>
																								</FormGroup>
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
																														placeholder="Last Name"
																														type="text"
																														onFocus={e =>
																																this.setState({emailFocused: true})
																														}
																														onBlur={e =>
																																this.setState({emailFocused: false})
																														}
																														onChange={(event) =>
																																this.setState({last_name: event.target.value})
																														}
																												/>

																										</InputGroup>
																								</FormGroup>
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
																														type="text"
																														onFocus={e =>
																																this.setState({emailFocused: true})
																														}
																														onBlur={e =>
																																this.setState({emailFocused: false})
																														}
																														onChange={(event) => this.setState({email: event.target.value})}
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
																														onChange={(event) =>
																																this.setState({password: event.target.value})
																														}
																												/>
																										</InputGroup>
																								</FormGroup>
																								<FormGroup
																										className={classnames({
																												focused: this.state.comfirmPasswordFocused
																										})}
																								>
																										<InputGroup className="input-group-alternative">
																												<InputGroupAddon addonType="prepend">
																														<InputGroupText>
																																<i className="ni ni-lock-circle-open"/>
																														</InputGroupText>
																												</InputGroupAddon>
																												<Input
																														placeholder="comfirm Password"
																														type="password"
																														autoComplete="off"
																														onFocus={e =>
																																this.setState({comfirmPasswordFocused: true})
																														}
																														onBlur={e =>
																																this.setState({comfirmPasswordFocused: false})
																														}
																														onChange={(event) =>
																																this.setState({comfirmPassword: event.target.value})
																														}
																												/>
																										</InputGroup>
																								</FormGroup>
																								<div className="text-center">
																										<Button
																												className="my-4"
																												color="success"
																												type="button"
																												onClick={this.handleClick}
																										>
																												Create Account
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

export default Register;
