class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 10);
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } 
    else {
      this.timeRemaining = this.timeRemaining - 0.01; // RHS is directly passed as an argument to timeRemaining because timeRemaining is a setter function
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  }

  pause = () => {
    clearInterval(this.interval);
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {       
    this.durationInput.value = time.toFixed(2); // rounds of to 2 digits
  }
}
