/*
import React from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
//import Grid from '@material-ui/core/Grid';
import CodeDrils from '../../library/js/CodeDrils';
//import LinearProgress from '@material-ui/core/LinearProgress';

import StartGameBtn from '../StartGameBtn/StartGameBtn';

class GameStart extends React.Component {
    compTimeInterval = null;
    // Don't do this!
    state = {
        isGameStart: false,
        isGameEnd: true,
        usrCharCount: 0,    //count the number of correct char typing by user
        compCharCount: 0,   //number of char typing by computer
        compSpeed: 1000,
        level: 1,
        testIndex: -1, //drills index
        GameStatistics:"",
        editors: {     //editor value
            codeChallenge: "",
            userEditor: "",
            computerDisplay: ""
        },
        totalCharTestCount: 0 //length of codeChallenge without space.
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
            editors[inputName] = inputValue
            let numChar = this.state.usrCharCount;
            if (inputName === "userEditor") {
                numChar = this.compareInput(inputValue);
            }
            this.setState({ editors, usrCharCount: numChar });
        }
    };

    gameStatus() {
        //basic game status: checking user again computer!!!
        if (this.state.usrCharCount === this.state.totalCharTestCount && !this.state.isGameEnd) {
            clearInterval(this.compTimeInterval);
            this.setState({isGameStart:false, isGameEnd:true, GameStatistics:"user", level: this.state.level+1});
        } else if (this.state.editors.computerDisplay.length === this.state.editors.codeChallenge.length  && !this.state.isGameEnd) {
            this.setState({isGameStart:false, isGameEnd:true, GameStatistics:"Jacob Lamont"});
            clearInterval(this.compTimeInterval);
        }
    }

    gameInitialization = (isGameStart) => {

        let testInd = 0;
        if(this.state.testIndex === -1 ) {
            testInd = 0;
        }else if (this.state.testIndex < CodeDrils.length - 1) {
            if(this.state.GameStatistics==="Jacob Lamont"){
                testInd = this.state.testIndex;
            }else{
                testInd = this.state.testIndex + 1;
            }

        }else{
            testInd = 0;
        }

        this.setState({
            isGameStart: isGameStart,
            isGameEnd: false,
            usrCharCount: 0,    //count the number of correct char typing by user
            compCharCount: 0,   //number of char typing by computer
            testIndex: testInd,
            GameStatistics:"",
            editors: {     //editor value
                codeChallenge: CodeDrils[testInd],
                userEditor: "",
                computerDisplay: ""
            },
            totalCharTestCount: this.lengthStr(CodeDrils[testInd].replace(/\s/g, ''))
        });
    }

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

    }


    //this function should call when start
    computerTyping = () => {

        console.log("this.state.isGameEnd", this.state.isGameEnd)
        if (!this.state.isGameStart && this.state.editors.codeChallenge && !this.state.isGameEnd) {
            //clear also when user win
            clearInterval(this.compTimeInterval);
            console.log("clearTimeout");
            return "";
        } else {
            this.compTimeInterval = setInterval(() => {
                // console.log("Inside computerTyping: setTimeOut");
                const editors = Object.assign({}, this.state.editors);
                //get previous value of computerDisplay and add next character from codechallenge;
                let index = editors.computerDisplay.length;
                editors.computerDisplay = editors.codeChallenge.substr(0, index + 1);
                //get the number of characters type by computer without space
                //rememeber if would be great to count for computer with space for more accuracy!!!
                let compCount = this.lengthStr(editors.computerDisplay);
                //update state
                this.setState({ editors, compCharCount: compCount });
            }, 1000);

        }


    }

    //start game btn
    handleStartGameBtn = (e) => {
        //initialize the game here by loading the first drills
        this.gameInitialization(true);
        console.log("this.state.isGameStart:", this.state.isGameStart, this.state.editors.codeChallenge);
        this.computerTyping();
    }

    // componentDidMount() {
    //     this.gameInitialization();
    // }
    componentDidUpdate() {

        this.gameStatus();
        //inside game status check when game end and stop any one to keep typing.
        //reset the start button to true.
    }


    displayStartBtn = ()=>{
        let renderstartbtn = "";
        if(!this.state.isGameStart){
            renderstartbtn = <StartGameBtn onClick={this.handleStartGameBtn} />
        }else{
            renderstartbtn = <h2>Timer here!</h2>
        }
        return renderstartbtn;
    };


    render() {
        const editorValues = this.state.editors;

        return (
            <>
                {this.displayStartBtn()}
                <Grid item xs={12} sm={12} md={12} m={2}>
                    <div component="h1" variant="h2" align="center" color="textPrimary" style={{ fontFamily: 'Roboto Mono', marginBottom: "10px" }}>
                        <h1 color="textPrimary" > {this.state.GameStatistics} </h1>
                        <h1 color="textPrimary" >Level {this.state.level} </h1>

                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <div>
                        <p style={{ marginBottom: '0px' }}>User progress</p>
                        <LinearProgress variant="determinate" value={(this.state.usrCharCount / this.state.totalCharTestCount) * 100} style={{ marginBottom: '15px' }} />
                        <p style={{ marginBottom: '0px' }}>Computer progress</p>
                        <LinearProgress color="secondary" variant="determinate" value={(this.state.editors.computerDisplay.length / this.state.editors.codeChallenge.length) * 100} style={{ marginBottom: '15px' }} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} m={2}>
                    <div style={{ marginBottom: "10px" }}>
                        <CodeEditor
                            name="codeChallenge"
                            readOnly={true}
                            value={editorValues.codeChallenge}
                        />
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} m={2}>
                    <div style={{ marginRight: "5px" }}>
                        <CodeEditor
                            readOnly={false}
                            value={editorValues.userEditor}
                            name="userEditor"
                            onChange={this.handleChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} m={2}>
                    <div style={{ marginLeft: "5px" }}>
                        <CodeEditor
                            readOnly={true}
                            value={editorValues.computerDisplay}
                            name="computerDisplay"
                             />
                    </div>
                </Grid>
            </>);
    }
}

export default GameStart;
*/
