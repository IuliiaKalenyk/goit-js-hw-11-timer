

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.isActive = false;
    this.selector = selector;
    this.targetDate = targetDate;
    this.timer = document.querySelector(this.selector),
    this.refs = {
  
  days: this.timer.querySelector('[data-value="days"]'),
  hours: this.timer.querySelector('[data-value="hours"]'),
  mins: this.timer.querySelector('[data-value="mins"]'),
  secs: this.timer.querySelector('[data-value="secs"]'),
};
console.log(this.refs.days);
  }
  start() {
    if(this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = getTimeComponents(deltaTime);
      
      this.updateClockface(time);
    }, 1000);
  }
  stop() {
    clearInterval(intervalId);
    this.isActive = false;
  }
  updateClockface({ days, hours, mins, secs }) {
  this.refs.days.textContent = `${days}`;
  this.refs.hours.textContent = `${hours}`;
  this.refs.mins.textContent = `${mins}`;
  this.refs.secs.textContent = `${secs}`;
}
};

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}


function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

 timer.start();