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

  // Stop laughing after 5 seconds
  const laughDuration = 15000; // 5 seconds
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

const cake = document.querySelector('.cake');

// Cake frames
const cakeFrames = [
  './assets/cake/pixil-frame-0.png',
  './assets/cake/pixil-frame-1.png',
  './assets/cake/pixil-frame-2.png'
];

let cakeFrameIndex = 0;
let isSpecialFrame = false; // toggles between normal loop and clicked frame

const normalCakeFrameRate = 400; // speed of normal loop
let cakeInterval;

// Function to start looping first two frames
function startCakeLoop() {
  clearInterval(cakeInterval);
  isSpecialFrame = false;
  cakeFrameIndex = 0;
  cakeInterval = setInterval(() => {
    cakeFrameIndex = (cakeFrameIndex + 1) % 2; // only 0 and 1
    cake.src = cakeFrames[cakeFrameIndex];
  }, normalCakeFrameRate);
}

// Function to show special frame
function showSpecialFrame() {
  clearInterval(cakeInterval);
  isSpecialFrame = true;
  cake.src = cakeFrames[2]; // third frame
}

// Start normal animation initially
startCakeLoop();

// Click toggle
cake.addEventListener('click', () => {
  if (isSpecialFrame) {
    startCakeLoop(); // go back to looping 0 and 1
  } else {
    showSpecialFrame(); // show frame 2
  }
});

// --- Neha animation setup ---
const nehaImg = document.querySelector('.neha');

// Idle frames (0–3)
const nehaIdleFrames = [
  './assets/neha/pixil-frame-0.png',
  './assets/neha/pixil-frame-1.png',
  './assets/neha/pixil-frame-2.png',
  './assets/neha/pixil-frame-3.png'
];

// Click frames (4–6)
const nehaClickFrames = [
  './assets/neha/pixil-frame-4.png',
  './assets/neha/pixil-frame-5.png',
  './assets/neha/pixil-frame-6.png'
];

// --- State ---
let nehaIdleIndex = 0;
let nehaClickIndex = 0;
let isNehaClicked = false;

// --- Animation function ---
function animateNeha() {
  if (isNehaClicked) {
    // Play click frames
    nehaImg.src = nehaClickFrames[nehaClickIndex];
    nehaClickIndex++;

    if (nehaClickIndex >= nehaClickFrames.length) {
      // After last click frame, reset to idle loop
      isNehaClicked = false;
      nehaClickIndex = 0;
    }
    setTimeout(animateNeha, 300); // speed of click animation
  } else {
    // Idle loop
    nehaImg.src = nehaIdleFrames[nehaIdleIndex];
    nehaIdleIndex = (nehaIdleIndex + 1) % nehaIdleFrames.length;
    setTimeout(animateNeha, 400); // speed of idle loop
  }
}

// --- Start animation ---
animateNeha();

// --- Click triggers click frames ---
nehaImg.addEventListener('click', () => {
  isNehaClicked = true;
  nehaClickIndex = 0;
});

const happyFrames = [
  './assets/happy/pixil-frame-0.png',
  './assets/happy/pixil-frame-1.png',
  './assets/happy/pixil-frame-0.png',
  './assets/happy/pixil-frame-1.png',
  './assets/happy/pixil-frame-0.png',
  './assets/happy/pixil-frame-1.png',
  './assets/happy/pixil-frame-0.png',
  './assets/happy/pixil-frame-1.png'
];

const birthdayFrames = [
  './assets/birthday/pixil-frame-0.png',
  './assets/birthday/pixil-frame-1.png',
  './assets/birthday/pixil-frame-0.png',
  './assets/birthday/pixil-frame-1.png',
  './assets/birthday/pixil-frame-0.png',
  './assets/birthday/pixil-frame-1.png',
  './assets/birthday/pixil-frame-0.png',
  './assets/birthday/pixil-frame-1.png'
];

function showPixelText(frames, topPercent, duration = 15000, leftPercent = 50, width = 150) {
  const preloaded = frames.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const imgEl = document.createElement('img');
  imgEl.src = frames[0];
  imgEl.classList.add('pixel-text');

  imgEl.style.position = 'fixed';
  imgEl.style.left = `${leftPercent}%`;
  imgEl.style.top = `${topPercent}%`;
  imgEl.style.transform = 'translate(-50%, -50%)';
  imgEl.style.opacity = '0';
  imgEl.style.transition = 'opacity 0.5s';
  imgEl.style.imageRendering = 'pixelated';
  imgEl.style.zIndex = '20';
  imgEl.style.pointerEvents = 'none';
  imgEl.style.width = `${width}px`; // make it smaller
  imgEl.style.height = 'auto';      // maintain aspect ratio

  document.body.appendChild(imgEl);

  // Fade in
  setTimeout(() => { imgEl.style.opacity = '1'; }, 50);

  // Animate frames smoothly at 500ms per frame
  let frameIndex = 0;
  const frameInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % frames.length;
    imgEl.src = frames[frameIndex];
  }, 500);

  // Fade out and remove after duration
  setTimeout(() => {
    clearInterval(frameInterval);
    imgEl.style.opacity = '0';
    setTimeout(() => imgEl.remove(), 500);
  }, duration);
}

// Gift box click
// Preload audio
const happyBirthdaySong = new Audio('./assets/audio/happy_birthday_piano.mp3'); // update path

giftBox.addEventListener('click', () => {
  giftBox.src = frame1.src;   
  launchConfetti();
  isLaughing = true;
  laughIndex = 0;

  // Play Happy Birthday song
  happyBirthdaySong.currentTime = 0; // start from beginning
  happyBirthdaySong.volume = 1;       // ensure full volume
  happyBirthdaySong.play();

  // HAPPY slightly upper-left
  showPixelText(happyFrames, 30, 15000, 20, 1000); // top 30%, left 20%, width 1000px

  // BIRTHDAY a bit upper-left of center
  setTimeout(() => {
    showPixelText(birthdayFrames, 40, 15000, 25, 1000); // top 40%, left 25%, width 1000px
  }, 300);

  // Stop laughing after 5 seconds
  setTimeout(() => { isLaughing = false; }, 15000);

  // Fade out music after 7 seconds (matching text duration)
  setTimeout(() => {
    let fadeAudio = setInterval(() => {
      if (happyBirthdaySong.volume > 0.05) {
        happyBirthdaySong.volume -= 0.05; // reduce volume gradually
      } else {
        happyBirthdaySong.pause();
        happyBirthdaySong.volume = 1; // reset for next click
        clearInterval(fadeAudio);
      }
    }, 100); // fade steps every 100ms
  }, 15000); // start fading after 15 seconds
});

