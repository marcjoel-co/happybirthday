document.addEventListener("DOMContentLoaded", function () {
    // --- STEP 1: Select elements AFTER the page is loaded ---
    // Now this is guaranteed to work because all HTML exists.
    const candleContainer = document.getElementById("candleContainer");
    const wishMessageElement = document.getElementById("wishMessage");
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const confirmWishBtn = document.getElementById('confirm-wish-btn');
    const blowSound = document.getElementById('blow-sound');
    const backgroundMusic = document.getElementById('background-music');

    // --- STEP 2: Use the config file to set up the page ---
    let candlesBlown = 0;
    let allCandlesBlown = false;
    const totalCandles = config.cakePage.totalCandles; // Get data from config

    blowSound.src = config.audioFiles.blowSound;
    backgroundMusic.src = config.audioFiles.cakePage;
    backgroundMusic.volume = 0.3;

    // --- STEP 3: Attach all event listeners ---
    musicToggleBtn.addEventListener('click', toggleBackgroundMusic);
    backBtn.addEventListener('click', goBack);
    nextBtn.addEventListener('click', goNext);
    confirmWishBtn.addEventListener('click', closeWishMessage);

    backgroundMusic.onplay = () => musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
    backgroundMusic.onpause = () => musicToggleBtn.innerHTML = '<i class="fas fa-play"></i> Play Music';

    // --- Initial Setup ---
    createCandles();
    createConfetti();
// Function to toggle music playback
function toggleBackgroundMusic() {
if (backgroundMusic.paused) {
    backgroundMusic.play().catch(e => console.log("Music play was interrupted."));
} else {
    backgroundMusic.pause();
}
}


// Create candles for the cake
function createCandles() {
const candleContainer = document.getElementById("candleContainer");
candleContainer.innerHTML = ''; 
for (let i = 0; i < totalCandles; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    const flame = document.createElement("div");
    flame.className = "flame";
    const smoke = document.createElement("div");
    smoke.className = "smoke";
    candle.appendChild(flame);
    candle.appendChild(smoke);
    candleContainer.appendChild(candle);


    candle.addEventListener("click", function() { blowOutCandle.call(this); });
};
}

// Blow out a candle when interacted with
function blowOutCandle() {
if (!this.classList.contains("blown")) {
    
    blowSound.currentTime = 0; 
    blowSound.play();
    
    

    this.classList.add("blown");
    candlesBlown++;
    createSparkleEffect(this);

    
    if (candlesBlown === totalCandles && !allCandlesBlown) {
    allCandlesBlown = true;
    setTimeout(showWishMessage, 1000); // full second
    // Start background music on the first candle interaction if it's not already playing
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(e => console.log("Music play was interrupted."));
    }
    createBalloons();
    }
}
}


function createBalloons() {
const colors = ["#ff66b3", "#66ccff", "#ff9966", "#99ff66", "#cc99ff"];
const numBalloons = 100;
for (let i = 0; i < numBalloons; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.bottom = "-100px"; 
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDuration = `${15 + Math.random() * 10}s`;
    balloon.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(balloon);
}
}

function createConfetti() {
const colors = ["#ffcc00", "#ff66b3", "#66ccff", "#ff9966", "#99ff66"];
const numConfetti = 50;
for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.width = `${5 + Math.random() * 5}px`;
    confetti.style.height = `${5 + Math.random() * 10}px`;
    confetti.style.animationDuration = `${3 + Math.random() * 4}s`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(confetti);
}
}
// medjo eew
// function createDecorations() {
//   const cake = document.querySelector(".cake");
//   const colors = ["#0a173b", "#ffcc00", "#66ccff", "#ff9966", "#99ff66"];
//   const numDecorations = 10;

//   for (let i = 0; i < numDecorations; i++) {
//     const decoration = document.createElement("div");
//     decoration.className = "decoration";
//     decoration.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
//     decoration.style.top = `${-20 - Math.random() * 50}px`;
//     decoration.style.left = `${Math.random() * 100}%`;
//     cake.appendChild(decoration);
//   }
// }

function createSparkleEffect(candle) {
const numSparkles = 20;
const candleRect = candle.getBoundingClientRect();

for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    const x = candleRect.left + candleRect.width / 2;
    const y = candleRect.top;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    const angle = Math.random() * 360;
    const distance = Math.random() * 50;
    const endX = Math.cos(angle * Math.PI / 180) * distance;
    const endY = Math.sin(angle * Math.PI / 180) * distance;
    sparkle.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
    ], {
    duration: 500 + Math.random() * 500,
    easing: 'ease-out'
    });
    document.body.appendChild(sparkle);
    setTimeout(() => { sparkle.remove(); }, 1000);
}
}

function showWishMessage() {
document.getElementById("wish-title").textContent = config.cakePage.wishMessage.title;
document.getElementById("wish-subtitle").textContent = config.cakePage.wishMessage.subtitle;


document.getElementById("wishMessage").classList.add("show");
createFireworks();
}

function closeWishMessage() {
document.getElementById("wishMessage").classList.remove("show");
}

function createFireworks() {
const numFireworks = 10;
for (let i = 0; i < numFireworks; i++) {
    setTimeout(() => {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${10 + Math.random() * 80}%`;
    firework.style.top = `${10 + Math.random() * 60}%`;
    firework.style.backgroundColor = ['#0a173b', '#ffcc00', '#66ccff'][i % 3];
    firework.style.animation = `firework ${1 + Math.random()}s forwards`;
    document.body.appendChild(firework);
    setTimeout(() => { firework.remove(); }, 2000);
    }, i * 300);
}
}

function goBack() {
window.location.href = "index.html"; 
}

function goNext() {
window.location.href = "letter.html"; 
}

});
