import React from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import CodeDrils from '../../library/js/CodeDrils';
import Instructions from '../../library/js/Instructions';
import Modals from "../Modal/Modal";
// import ReactCountdownClock from 'react-countdown-clock';
import {
		Progress,
		Row,
		Button,
		Col,
} from "reactstrap";

class NewGameStartSocket extends React.Component {
		compTimeInterval = null;
		contestTimeInterval = null;

		state = {
				isGameStart: false,
				isGameEnd: true,
				isCountDown: true,
				progressBarPlayer2: 0,  //PLayer 2 typing characters
				isOpen: false,
				timeTyping: 0,
				usrCharCount: 0,    //Player1 the number of correct char typing by user
				compCharCount: 0,   //number of char typing by computer
				compSpeed: 800,
				player1: this.props.users[0].name,
				player2: this.props.users[1].name,
				level: 1,
				instIndex: -1,
				testIndex: -1, //drills index
				GameStatistics: "",
				editors: {     //editor value
						codeChallenge: "",
						userEditor: "",
						computerDisplay: "",
						secondUserInput: ""
				},
				totalCharTestCount: 0, //length of codeChallenge without space.
				bReset: true,
				bReset2: true
		};


		lengthStr(str) {
				let strlen = 0;
				for (let i = 0; i < str.length; i++) {
						strlen++;
				}
				return strlen;
		}

		handleChange = (inputName) => {
				return (inputValue) => {
						const editors = Object.assign({}, this.state.editors);
						editors[inputName] = inputValue;
						let numChar = this.state.usrCharCount;
						if (inputName === "userEditor") {
								// console.log("userEditor being used")
								numChar = this.compareInput(inputValue);
								this.emitInput(inputValue, numChar);
						}
						this.setState({editors, usrCharCount: numChar});
				}
		};


		emitInput(data, numChar) {
				this.props._socket.emit("userInput", {
						room: this.props.room,
						input: data,
						barProgress: numChar
				});
		}

		gameStatus() {
				//basic game status: checking user again computer!!!
				// console.log("value of progressbar " + this.state.progressBarPlayer2)
				if ((this.state.usrCharCount === this.state.totalCharTestCount && !this.state.isGameEnd)) {
						// console.log("player 2 Wins!!!");
						this.props._socket.emit('EndGame', {
								room: this.props.room,
								player: this.props.player,
								isGameEnded: true,

						});

						clearInterval(this.compTimeInterval);
						clearInterval(this.contestTimeInterval);
						let cSpeed = (this.state.compSpeed > 200) ? this.state.compSpeed - 100 : this.state.compSpeed
						this.setState({
								isGameStart: false,
								isOpen: true,
								isGameEnd: true,
								GameStatistics: this.state.player2,
								level: this.state.level + 1,
								compSpeed: cSpeed,
								bReset2: true
						});


				} else if ((this.state.progressBarPlayer2 === this.state.totalCharTestCount && !this.state.isGameEnd)) {
						// console.log("player 1 Wins!!!");
						this.props._socket.emit('EndGame', {
								room: this.props.room,
								player: this.props.player,
								isGameEnded: true,

						});

						clearInterval(this.compTimeInterval);
						clearInterval(this.contestTimeInterval);
						let cSpeed = (this.state.compSpeed > 200) ? this.state.compSpeed - 100 : this.state.compSpeed
						this.setState({
								isGameStart: false,
								isOpen: true,
								isGameEnd: true,
								GameStatistics: this.state.player1,
								level: this.state.level + 1,
								compSpeed: cSpeed,
								bReset2: true
						});


				} else if (this.state.editors.computerDisplay.length === this.state.editors.codeChallenge.length && !this.state.isGameEnd) {
						// console.log("Jacob Wins!!!");
						this.props._socket.emit('EndGame', {
								room: this.props.room,
								player: this.props.player,
								computerwins: true,
								isGameEnded: true
						});


						this.setState({
								isGameStart: false,
								isOpen: true,
								// level: this.state.level + 1,
								isGameEnd: true,
								GameStatistics: "Jacob Lamont",
								bReset2: true
						});
						clearInterval(this.compTimeInterval);
						clearInterval(this.contestTimeInterval);
				}


				if (this.state.bReset2 && (this.props.isGameEnded || this.props.computerWins)) {
						// console.log("inside game end for other player bReset2");
						if (this.props.computerWins) {
								this.setState({
										isGameStart: false,
										isOpen: true,
										// level: this.state.level + 1,
										isGameEnd: true,
										//GameStatistics: "Jacob Lamont"
								});
								clearInterval(this.compTimeInterval);
								clearInterval(this.contestTimeInterval);

						} else {
								clearInterval(this.compTimeInterval);
								clearInterval(this.contestTimeInterval);
								let cSpeed = (this.state.compSpeed > 200) ? this.state.compSpeed - 100 : this.state.compSpeed
								this.setState({
										isGameStart: false,
										isOpen: true,
										isGameEnd: true,
										//GameStatistics: localStorage.getItem("name"),
										// level: this.state.level + 1,
										compSpeed: cSpeed
								});
						}

						this.setState({bReset2: false, bReset: true});

				}

		}

		gameInitialization = (isGameStart) => {
				let instructionsInd = 0;
				let testInd = 0;

				if (this.state.testIndex === -1) {
						instructionsInd = 0;
						testInd = 0;
				} else if (this.state.testIndex < CodeDrils.length - 1) {
						if (this.state.GameStatistics === "Jacob Lamont") {
								instructionsInd = this.state.instIndex;
								testInd = this.state.testIndex;
						} else {
								instructionsInd = this.state.instIndex + 1;
								testInd = this.state.testIndex + 1;
						}

				} else {
						testInd = 0;
				}

				this.setState({
						isGameStart: isGameStart,
						isGameEnd: false,
						isCountDown: true,
						timeTyping: 0,
						usrCharCount: 0,    //count the number of correct char typing by user
						compCharCount: 0,   //number of char typing by computer
						instIndex: instructionsInd,
						testIndex: testInd,
						GameStatistics: "",
						progressBarPlayer2: 0,
						editors: {     //editor value
								codeChallenge: CodeDrils[testInd],
								codeInstructions: Instructions[instructionsInd],
								userEditor: "",
								computerDisplay: ""
						},
						totalCharTestCount: this.lengthStr(CodeDrils[testInd].replace(/\s/g, ''))
				});
		};

		compareInput = (usrCode) => {
				let nospaceusrcode = usrCode.replace(/\s/g, '');
				let codeLen = this.lengthStr(nospaceusrcode);
				let nospacecomp = this.state.editors.codeChallenge.replace(/\s/g, '');
				let comCode = nospacecomp.substr(0, codeLen);
				let num = 0;
				for (let i = 0; i < codeLen; i++) {
						if (comCode[i] === nospaceusrcode[i]) {
								num++;
						}
				}
				return num;

		};


		//this function should call when start
		computerTyping = () => {

				// console.log("this.state.isGameEnd", this.state.isGameEnd)
				if (!this.state.isGameStart && this.state.editors.codeChallenge && !this.state.isGameEnd) {
						//clear also when user win
						clearInterval(this.compTimeInterval);
						// console.log("clearTimeout");
						return "";
				} else {
						this.compTimeInterval = setInterval(() => {
								// console.log("Inside computerTyping: setTimeOut");
								const editors = Object.assign({}, this.state.editors);
								//get previous value of computerDisplay and add next character from code challenge;
								let index = editors.computerDisplay.length;
								editors.computerDisplay = editors.codeChallenge.substr(0, index + 1);
								//get the number of characters type by computer without space
								//remember if would be great to count for computer with space for more accuracy!!!
								let compCount = this.lengthStr(editors.computerDisplay);
								//update state
								this.setState({editors, compCharCount: compCount});
						}, this.state.compSpeed);

				}


		};

		//start game btn
		//start game btn
		handleStartGameBtn = (e) => {
				//initialize the game here by loading the first drills
				this.setState({bReset: true, bReset2: false, GameStatistics: ""});
				this.props._socket.emit('StartGame', {
						room: this.props.room,
						player: this.props.player,
						isGameStarted: true
				});

				this.gameInitialization(true);

		};

		CountDownCompleted = () => {
				this.setState({isCountDown: false});
				this.computerTyping();
				this.checkTime();
		}

		checkTime = () => {
				this.contestTimeInterval = setInterval(() => {
						this.setState({timeTyping: this.state.timeTyping + 1});
				}, 10);
		}

		componentDidMount() {
				// this._socket = io("http://127.0.0.1:3001");
				this.props._socket.on("secondUserInput", data => {
						const editors = Object.assign({}, this.state.editors);
						editors.secondUserInput = data.codeInput
						console.log("progess bar from server", data.barProgress);
						this.setState({editors, progressBarPlayer2: data.barProgress});
				});
		}

		componentWillUnmount() {
				// this.props._socket.disconnect();
		}

		componentDidUpdate() {

				this.gameStatus();
				//inside game status check when game end and stop any one to keep typing.
				//reset the start button to true.
		}

		timeConverter(t) {
				var seconds = Math.floor(t / 100);
				var ms = t - seconds * 100;
				var minutes = Math.floor(seconds / 60);
				seconds = seconds - minutes * 60;


				if (seconds < 10) {
						seconds = "0" + seconds;
				}

				if (minutes === 0) {
						minutes = "00";
				} else if (minutes < 10) {
						minutes = "0" + minutes;
				}

				return minutes + ":" + seconds + ":" + ms;
		}


		displayStartBtn = () => {
				//console.log("bReset Value: " + this.state.bReset);
				if (this.state.bReset && this.props.isGameStarted && !this.state.isGameStart) {
						console.log("need to init game for other player...")
						this.gameInitialization(true);
						this.setState({isOpen: false, bReset: false, bReset2: false, GameStatistics: ""});
				}
				let renderstartbtn = "";
				if (!this.state.isGameStart) {
						renderstartbtn = <Button
								className="btn-white btn-icon mb-3 mb-sm-0 text-capitalize shadow-lg--hover bg-gradient-gray"
								size="lg"
								target="_blank"
								onClick={this.handleStartGameBtn}><span className="btn-inner--text">&#60;Start&#8725;&#62;</span>

						</Button>
				} else {
						if (this.state.isCountDown) {
								/*renderstartbtn = <ReactCountdownClock
										seconds={3}
										color="#182525"
										alpha={0.8}
										size={70}
										onComplete={this.CountDownCompleted}/>*/
						} else {
								renderstartbtn =
										<h3 className="h4 text-darker font-weight-bold mb-4 text-center">Time: {this.timeConverter(this.state.timeTyping)} </h3>
						}

				}
				return renderstartbtn;
		};

		toggleModal = () => {
				this.setState({
						isOpen: !this.state.isOpen
				});
		};

		redirectLogin = (event) => {
				this.history.push(`/multiplayer`);

		};

		render() {
				const editorValues = this.state.editors;
				return (
						<>
								{/*<div className="btn-wrapper mt-1 text-center">
										{this.displayStartBtn()}
								</div>*/}
								<Row className="justify-content-center mt-md">
										<Col lg="12">
												<Row>
														<Col lg="5">
																<h3 className="h4 text-black-50 font-weight-bold mb-4 text-center">Current
																		Level: <span className="display-4 text-white"><br/>{this.state.level}</span></h3>
														</Col>
														<Col lg="2">
																<div className="btn-wrapper mt-1 text-center">
																		{this.displayStartBtn()}
																</div>
														</Col>
														<Col lg="5">
																<h3 className="h4 text-black-50 font-weight-bold mb-4 text-center">Winner: <span
																		className="display-4 text-white"><br/> {this.state.GameStatistics}</span></h3>
														</Col>
												</Row>
												<Row>
														<Col lg="6">
																{/*<h3 className="h4 text-black-50 font-weight-bold mb-4 text-center">Current
																		Level: {this.state.level} </h3>*/}
																<div className="progress-wrapper">
																		<div className="progress-info progress-bar-animated">
																				<div className="progress-label-secondary">
																						<span className="text-darker font-weight-bold">Typing Challenge</span>
																				</div>
																				<div className="progress-percentage">
																						<span className="text-white">Challenge Number {this.state.level}</span>
																				</div>
																		</div>
																		<Progress max="100" value="100" color="success"/>
																</div>
																<CodeEditor
																		placeHolder={"Your challenge will appear when you click start..."}
																		className="rounded"
																		name="codeChallenge"
																		readOnly={true}
																		dragEnabled={false}
																		enableSnippets={false}
																		value={editorValues.codeChallenge}
																/>
														</Col>
														<Col lg="6">
																<div className="progress-wrapper">
																		<div className="progress-info progress-bar-animated">
																				<div className="progress-label-secondary">
                                            <span
		                                            className="text-darker font-weight-bold">{this.state.player2}</span>
																				</div>
																				<div className="progress-percentage">
                                            <span
		                                            className="text-white">{Math.floor((this.state.usrCharCount / this.state.totalCharTestCount) * 100)}%</span>
																				</div>
																		</div>
																		<Progress max="100"
																		          value={(this.state.usrCharCount / this.state.totalCharTestCount) * 100}
																		          color="danger"/>
																</div>
																<CodeEditor
																		placeHolder={"Feel free to chat while you wait..."}
																		readOnly={false}
																		value={editorValues.userEditor}
																		name="userEditor"
																		onChange={this.handleChange}
																/>
														</Col>
												</Row>
										</Col>
								</Row>
								<Row className="justify-content-center mt-1">
										<Col lg="12">
												<Row>
														<Col lg="6">
																<div className="mb-1">
																		{/*<h3 className="h4 text-black-50 font-weight-bold mb-4 text-center">Winner: {this.state.GameStatistics} </h3>*/}
																		<div className="progress-wrapper">
																				<div className="progress-info progress-bar-animated">
																						<div className="progress-label-secondary">
																								<span
																										className="text-darker font-weight-bold"> {this.state.player1} </span>
																						</div>
																						<div className="progress-percentage">
                                                <span
		                                                className="text-white">{Math.floor((this.state.progressBarPlayer2 / this.state.totalCharTestCount) * 100)}%</span>
																						</div>
																				</div>
																				<Progress max="100"
																				          value={(this.state.progressBarPlayer2 / this.state.totalCharTestCount) * 100}
																				          color="warning"/>
																		</div>
																</div>
																<CodeEditor
																		placeHolder={"Feel free to chat while you wait..."}
																		name="secondUserInput"
																		readOnly={true}
																		value={editorValues.secondUserInput}
																/>
														</Col>
														<Col lg="6">
																<div className="mb-1">
																		{/*<h3 className="h4 text-black-50 font-weight-bold mb-4 text-center">Winner: {this.state.GameStatistics} </h3>*/}
																		<div className="progress-wrapper">
																				<div className="progress-info progress-bar-animated">
																						<div className="progress-label-secondary">
																								<span className="text-darker font-weight-bold"> Jacob Lamont </span>
																						</div>
																						<div className="progress-percentage">
                                                <span
		                                                className="text-white">{Math.floor((this.state.editors.computerDisplay.length / this.state.editors.codeChallenge.length) * 100)}%</span>
																						</div>
																				</div>
																				<Progress max="100"
																				          value={(this.state.editors.computerDisplay.length / this.state.editors.codeChallenge.length) * 100}
																				          color="warning"/>
																		</div>
																</div>
																<CodeEditor
																		placeHolder={"I am the best Typist in the world..."}
																		name="computerDisplay"
																		readOnly={true}
																		value={editorValues.computerDisplay}
																/>
														</Col>
												</Row>
										</Col>
								</Row>
								{this.state.isOpen &&
								<Modals winner={this.state.GameStatistics} level={this.state.level}
								        timeTyping={this.timeConverter(this.state.timeTyping)} togglemodal={this.toggleModal}
								        myref={false}/>}
						</>
				);
		}
}

export default NewGameStartSocket;
