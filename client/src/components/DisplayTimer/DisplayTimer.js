import React from 'react'

class DisplayTimer extends React.Component{
    state= {
        clockRunning:false,
        timer: 0,

        
    }

    timeConverter(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - minutes * 60;
      
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
      
        if (minutes === 0) {
          minutes = "00";
        } else if (minutes < 10) {
          minutes = "0" + minutes;
        }
      
        return minutes + ":" + seconds;
      }
      TimeInterval = null;
    startClock = ()=>{
        this.TimeInterval = setInterval(() => {
            this.setState({timer: this.state+1});
        }, 1);
    }

    stopClock = ()=>{
        clearInterval(this.TimeInterval);
    }
    reset = () =>{
        this.setState({timer:0});
    }

    render(){
        return(
            <h1>{this.timeConverter(this.state.timer)}</h1>
        )
    }
}

export default DisplayTimer;