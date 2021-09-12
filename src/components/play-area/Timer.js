import React, { Component } from 'react'

export default class Timer extends Component {
    constructor() {
      super();
      this.state = {seconds: 0}
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
  
    componentDidMount(){
        this.setState({ seconds: this.props.seconds});
    }
 
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1
      this.setState({seconds})
      
      // Check if we're at zero.
      if (this.state.seconds == 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
        this.startTimer()
        return(
            <div>
            {this.state.seconds}
            </div>
        );
    }
  }