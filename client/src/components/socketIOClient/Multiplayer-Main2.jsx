import React from 'react';
//import Grid from '@material-ui/core/Grid';
import classes from '../Style';
import "../Main/Main.css";
import axios from "axios";
import DemoNavbar from '../NavBar/navbar';
import SimpleFooter from "../SimpleFooter/SimpleFooter";
import classnames from "classnames";
import {UncontrolledAlert} from "reactstrap";
import MissingRoomId from "../Modal/MiddingRoomId";

import {
		Container,
		Row,
		Col,
		Button,
		Input,
		InputGroupAddon,
		InputGroupText,
		InputGroup,
		FormGroup
} from "reactstrap";
import NewGameStartSocket from '../GameStart/NewGameStartSocket';
import Carousel from '../Carousel/Carousel';
import RoomFullModal from "../Modal/RoomFullModal";

const io = require('socket.io-client');
const socket = io.connect('/');

let carousel = true;
let carouseHide = true;

// const socket = io.connect('http://localhost:3001');

class Main2 extends React.Component {

		state = {
				alerts: false,
				message: "",
				initGame: false,
				room: "",
				users: [],
				isGameStarted: false,
				isGameEnded: false,
				player: "",
				computerWins: false,
				joinRoomId: "",
				isOpen: false,
				isOpenFull: false

		};

		alerts(chicken) {
				return (
						<UncontrolledAlert color="success" fade={chicken}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2"/>
          </span>
								<span className="alert-inner--text ml-1">
            <strong>Success!</strong> This is a success alert—check it out!
          </span>
						</UncontrolledAlert>
				)
		};

		constructor(props) {
				super(props);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.handleJoinSubmit = this.handleJoinSubmit.bind(this);

				this.input = React.createRef();
				this.inputJoin = React.createRef();
				this.inputName = React.createRef();
		}

		handleLogout = event => {
				socket.emit('Logout', {room: this.state.room, player: this.state.player, isLogout: true});
				event.preventDefault();
				const self = this;
				axios.get("/user/logout")
						.then(function (response) {
								socket.disconnect();
								socket.close();
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

		redirectSignOut = (event) => {
				socket.disconnect();
				socket.close();
				this.props.history.push(`/singleplayer`);
		};

		componentDidMount = () => {
				let usrName = localStorage.getItem('name');
				socket.on('err', (data) => {
						// console.log("Room is full Modal");
						carousel = true;
						this.setState({isOpenFull: true});

				});
				socket.on('player2', (data) => {
						if (data.isLogout) this.redirectSignOut();
						if (data.message === 'You, have Joined the room is successfully!') carouseHide = false;
						// console.log('on player2...' + " start game " + data.isGameStarted + " end game " + data.isGameEnded);
						const messageData = `Hello, ${usrName}`;
						this.setState({
								message: messageData,
								initGame: true,
								player: "player2",
								isGameStarted: data.isGameStarted,
								isGameEnded: data.isGameEnded,
								computerWins: data.computerwins,
								users: data.users
						});
				});

				socket.on('player1', (data) => {
						if (data.isLogout) this.redirectSignOut();
						carouseHide = false;
						// console.log('on player1...' + " start game " + data.isGameStarted + " end game " + data.isGameEnded);
						const message1 = `Hello, ${usrName}`;
						this.setState({
								message: message1,
								initGame: true,
								player: "player1",
								isGameStarted: data.isGameStarted,
								isGameEnded: data.isGameEnded,
								computerWins: data.computerwins,
								users: data.users
						});
				});

		};

		handleJoinSubmit(event) {
				event.preventDefault();

				// const name = this.inputName.current.value;
				const name = localStorage.getItem("name");
				// const roomId = this.inputJoin.current.value;
				const roomId = this.state.joinRoomId;
				// console.log("room id console", roomId);

				if (!roomId) {
						this.setState({alerts: true,
						isOpen: true});
						// alert("yay!");
						return;
				}
				carousel = false;
				this.setState({
						room: roomId
				});
				socket.emit('joinGame', {name, room: roomId});
		}


		handleSubmit(event) {
				//         alert('A name was submitted: ' + this.input.current.value);
				event.preventDefault();
				// const name = this.input.current.value;
				// if (!name) {
				//     alert('Please enter your name.');
				//     return;
				// }
				carousel = false;
				const name = localStorage.getItem("name");

				socket.emit('createGame', {name});
				socket.on('newGame', (data) => {
						const messageData =
								`Welcome, ${data.name}. Please ask your friend to enter Room Number:
                  |${data.room}| Waiting for player 2...`;

						this.setState({message: messageData, initGame: false, room: data.room});

				});
		}

		componentWillReceiveProps(nextProps) {
				console.log("emit messages please");
		}

		toggleModal = () => {
				this.setState({
						isOpen: !this.state.isOpen
				});
		};

		toggleModalFull = () => {
				this.setState({
						isOpenFull: !this.state.isOpenFull
				});
		};

		render() {

				return (
						<>
								<DemoNavbar handleLogout={this.handleLogout}/>
								<section className="section section-shaped section-md">
										<div className="shape shape-style-1 bg-gradient-gray-dark">
												<span/>
												<span/>
												<span/>
												<span/>
												<span/>
												<span/>
												<span/>
												<span/>
										</div>
										<Container className="shape-container">
												<Row>
														<Col lg="12" md="12" sm="12">
																{this.state.isOpen &&	<MissingRoomId toggleModal={this.toggleModal}/>}
														</Col>
												</Row>
												<Row>
														<Col lg="12" md="12" sm="12">
																{this.state.isOpenFull &&	<RoomFullModal toggleModal={this.toggleModalFull}/>}
														</Col>
												</Row>
												<Row className="text-center">
														<Col className="text-md-center">
																<h3 className="font-weight-bold text-black-50 text-center"><code
																		className="text-black-50 text-center" id="textFromMessage">{this.state.message}</code>
																</h3>
														</Col>
												</Row>
												{carousel && <Row>
														<Col lg="2" sm="6">
																<Button
																		className="btn-icon mb-3 mb-sm-0 shadow-lg--hover bg-gradient-gray"
																		color="neutral"

																		size="md"
																		onClick={this.handleSubmit}
																>
                                    <span className="btn-inner--text">
                                        <span className="text-dark" role="img">Create Room &#10133;</span>

                                    </span>
																</Button>
														</Col>
														<Col lg="3" sm="6" className="align-middle">
																<h5 className="text-right pt-2 text-black-50 font-weight-bold">Or Enter room Id:</h5>
														</Col>
														<Col lg="5" sm="6">
																<FormGroup
																		className={classnames({
																				focused: this.state.birthdayAltFocused
																		})}
																		onSubmit={this.handleJoinSubmit}
																>
																		<InputGroup className="input-group-alternative mb-4">
																				<Input
																						placeholder="ex: cjxic9rdc00007yqy90o3cins"
																						type="text"
																						onFocus={e =>
																								this.setState({birthdayAltFocused: true})
																						}
																						onBlur={e =>
																								this.setState({birthdayAltFocused: false})
																						}
																						onChange={(event) =>
																								this.setState({joinRoomId: event.target.value})
																						}
																				/>
																				<InputGroupAddon addonType="append">
																						<InputGroupText>
																						</InputGroupText>
																				</InputGroupAddon>
																		</InputGroup>
																</FormGroup>
														</Col>
														<Col lg="2" sm="6">
																<Button
																		className="btn-icon mb-3 mb-sm-0 shadow-lg--hover"
																		color="success"
																		size="md"
																		onClick={this.handleJoinSubmit}
																>
																<span className="btn-inner--text ">
																		<span className="text-darker mr-1">&ensp;&#10133;&ensp;Join Room</span>

                                </span>
																</Button>
														</Col>
												</Row>}
										</Container>
										<Container className="container-fluid">
												{carouseHide && <Carousel/>}
										</Container>
										<Container className="container-fluid">
												{this.state.initGame &&
												<NewGameStartSocket room={this.state.room} _socket={socket} player={this.state.player}
												                    isGameStarted={this.state.isGameStarted}
												                    isGameEnded={this.state.isGameEnded} computerWins={this.state.computerWins}
												                    users={this.state.users}/>}
										</Container>
										<Container className="py-md">
												<main>
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

export default Main2;
