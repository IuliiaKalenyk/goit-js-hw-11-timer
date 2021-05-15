refs = {
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};
console.log(refs.timer);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.isActive = false;
    this.selector = selector;
    this.targetDate = targetDate;
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
      
      this.selector(time);
    }, 1000);
  }
  stop() {
    clearInterval(intervalId);
    this.isActive = false;
  }
};

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}
function updateClockface({ days, hours, mins, secs }) {
  refs.timer.textContent = `${days}days:${hours}hours:${mins}mins:${secs}secs`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = new CountdownTimer({
  selector: updateClockface,
  targetDate: new Date('Jul 17, 2021'),
});

 timer.start();