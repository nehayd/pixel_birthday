const manishImg = document.querySelector('.manish');
const giftBox = document.querySelector('.gift-box');
const cat = document.querySelector('.cat');
const basket = document.querySelector('.basket');
const frame1 = new Image();
frame1.src = './assets/giftBox/pixil-frame-1.png';

// --- Frames ---
const blinkingFrames = [
  './assets/manish/pixil-frame-0.png',
  './assets/manish/pixil-frame-1.png',
  './assets/manish/pixil-frame-2.png',
  './assets/manish/pixil-frame-3.png',
  './assets/manish/pixil-frame-0.png',
  './assets/manish/pixil-frame-1.png',
  './assets/manish/pixil-frame-2.png',
  './assets/manish/pixil-frame-3.png',
  './assets/manish/pixil-frame-0.png',
  './assets/manish/pixil-frame-1.png',
  './assets/manish/pixil-frame-2.png',
  './assets/manish/pixil-frame-3.png',
];
const wavingFrames = [
  './assets/manish/pixil-frame-4.png',
  './assets/manish/pixil-frame-5.png',
  './assets/manish/pixil-frame-6.png',
  './assets/manish/pixil-frame-7.png'
];
const laughFrames = [
  './assets/manish/pixil-frame-8.png',
  './assets/manish/pixil-frame-9.png',
  './assets/manish/pixil-frame-10.png',
  './assets/manish/pixil-frame-11.png'
];

// --- Cat frames ---
const catFrames = [
  './assets/cat+balloons/pixil-frame-0.png',
  './assets/cat+balloons/pixil-frame-1.png',
  './assets/cat+balloons/pixil-frame-2.png'
];

// --- State ---
let isLaughing = false;
let blinkIndex = 0;
let waveIndex = 0;
let laughIndex = 0;
let catFrameIndex = 0;

// --- Animate Manish ---
function animateManish() {
  if (isLaughing) {
    manishImg.src = laughFrames[laughIndex];
    laughIndex = (laughIndex + 1) % laughFrames.length;
    setTimeout(animateManish, 150); // fast laugh
  } else {
    // Blinking frames
    if (blinkIndex < blinkingFrames.length) {
      manishImg.src = blinkingFrames[blinkIndex];
      blinkIndex++;
      setTimeout(animateManish, 400); // blinking fast
    } else {
      // Waving frames
      manishImg.src = wavingFrames[waveIndex];
      waveIndex = (waveIndex + 1) % wavingFrames.length;
      if (waveIndex === 0) blinkIndex = 0; // reset blink cycle
      setTimeout(animateManish, 400); // waving slower
    }
  }
}
animateManish(); // start animation

// --- Cat animation loop ---
setInterval(() => {
  catFrameIndex = (catFrameIndex + 1) % catFrames.length;
  cat.src = catFrames[catFrameIndex];
}, 300);

// --- Basket click triggers cat floating ---
basket.addEventListener('click', () => {
  cat.style.transform = 'translate(-50%, -300%)';
});

// --- Gift box click ---
giftBox.addEventListener('click', () => {
  giftBox.src = frame1.src; // show open gift box
  launchConfetti();         // start confetti

  // Start laughing
  isLaughing = true;
  laughIndex = 0;

  // Stop laughing after 15 seconds
  const laughDuration = 10000; // 10 seconds
  setTimeout(() => {
    isLaughing = false; // resume normal animation
  }, laughDuration);
});


// --- Confetti function ---
function launchConfetti() {
  const totalToStick = 50;     // max on ground
  let landedCount = 0;
  const totalFalling = 700;    // total confetti
  const screenHeight = window.innerHeight;
  const bottom20Start = screenHeight * 0.8;

  for (let i = 0; i < totalFalling; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.backgroundColor = '#FFFF00'; // bright yellow
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = 1000;
    document.body.appendChild(confetti);

    let top = -10;

    function fall() {
      top += 6 + Math.random() * 4;
      confetti.style.top = top + 'px';
      confetti.style.left = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 2 + 'px';

      // Landing logic
      if (top >= bottom20Start && landedCount < totalToStick) {
        if (Math.random() < 0.3) {
          const finalTop = bottom20Start + Math.random() * (screenHeight - bottom20Start);
          confetti.style.top = finalTop + 'px';
          confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
          confetti.style.opacity = 1;
          confetti.style.backgroundColor = '#FFFF00';
          landedCount++;
          return;
        }
      }

      // Fade mid-air
      if (top < bottom20Start || landedCount >= totalToStick) {
        confetti.style.opacity = parseFloat(confetti.style.opacity || 1) - 0.01;
      }

      if (top > screenHeight) {
        confetti.remove();
        return;
      }

      requestAnimationFrame(fall);
    }

    setTimeout(() => requestAnimationFrame(fall), Math.random() * 1000); // stagger
  }
}
