// Wait for the entire HTML document to be loaded before running any script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selection ---
    const startButton = document.getElementById('start-button');
    const container = document.querySelector('.container');
    const audioControls = document.querySelector('.audio-controls');
    const audio = document.getElementById('birthday-song');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeControl = document.getElementById('volume');
    const nextButton = document.querySelector('.next-button'); 

    // --- Dynamic Content Setup from config.js ---
    const mainTitle = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');

    // Join the title lines with <br> and set it. We use innerHTML because we want the browser to render the <br> tag.
    mainTitle.innerHTML = config.titleLines.join('<br>');
    
    // Set the subtitle text. textContent is safer here as we don't need any HTML.
    // We also need to re-add the cursor span programmatically.
    subtitle.textContent = config.subtitleText;
    subtitle.insertAdjacentHTML('beforeend', '<span class="cursor"></span>');

    // Set the audio source from the config file
    audio.src = config.audioFile;

    // --- State ---
    let isPlaying = false;

    // --- Event Listeners ---
    startButton.addEventListener('click', startExperience);
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeControl.addEventListener('input', setVolume);
    nextButton.addEventListener('click', goToNextPage); // Added event listener for the next button

    // --- Functions ---
    function startExperience() {
        gsap.to(startButton, { 
            opacity: 0, 
            scale: 0.5, 
            duration: 0.5, 
            ease: 'power2.in',
            onComplete: () => startButton.style.display = 'none' 
        });

        audio.play().catch(error => console.log("Audio play failed:", error));

        const tl = gsap.timeline({ delay: 0.5 }); 

        tl.to([container, audioControls], { 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out',
            onStart: () => {
                container.style.pointerEvents = 'auto';
                audioControls.style.pointerEvents = 'auto';
            }
        })
        .to('h1', { opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }, "-=0.5")
        .to('.typewriter-container', { opacity: 1, duration: 0.5, onComplete: () => {
            document.querySelector('.typewriter-text').style.animation = 'typewriter 3s steps(50) forwards';
        }}, "-=1") 
        .to('.next-button', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

        startAnimations();
    }

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    audio.onplaying = function() {
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="play-icon">⏸️</i>';
    };
    
    audio.onpause = function() {
      isPlaying = false;
      playPauseBtn.innerHTML = '<i class="play-icon">▶️</i>';
    };

    function setVolume() {
        audio.volume = volumeControl.value;
    }

    // Initialize volume
    setVolume();

    function goToNextPage() {
        gsap.to(container, { 
            opacity: 0,
            duration: 0.5,
            ease: 'power1.in',
            onComplete: () => {
                window.location.href = config.navigation.indexPageNext; 
            }
        });
    }
    
    function startAnimations() {
        // This function can stay the same for now
        createFloatingElements();
        setInterval(createFloatingElements, 5000);
    
        gsap.to('h1', {
            textShadow: "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 20, 147, 0.6)",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
        });
    }

    function createFloatingElements() {
        const colors = ['#FF1493', '#8A2BE2', '#FFD700', '#FF4500', '#00BFFF', '#32CD32'];
        const elements = ['confetti', 'balloon', 'heart', 'star'];
        const confettiShapes = ['▲', '■', '●', '★', '♥', '♦', '✦', '✧'];
        const count = Math.random() > 0.5 ? 50 : 25;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                const elementType = elements[Math.floor(Math.random() * elements.length)];
                element.className = elementType;
                element.style.left = Math.random() * 100 + 'vw';
                element.style.top = -30 + 'px';
                
                if (elementType === 'confetti') {
                    element.innerHTML = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                    element.style.color = colors[Math.floor(Math.random() * colors.length)];
                    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
                } else if (elementType === 'balloon') {
                    element.innerHTML = '🎈';
                    element.style.fontSize = (Math.random() * 30 + 20) + 'px';
                } else if (elementType === 'heart') {
                    element.innerHTML = '❤️';
                    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
                } else if (elementType === 'star') {
                    element.innerHTML = '✨';
                    element.style.fontSize = (Math.random() * 15 + 10) + 'px';
                }
                
                document.body.appendChild(element);
                
                gsap.to(element, {
                    y: window.innerHeight + 100,
                    x: `+=${Math.random() * 200 - 100}`,
                    rotation: Math.random() * 720 - 360,
                    duration: Math.random() * 10 + 5,
                    ease: "power1.out",
                    onComplete: () => element.remove()
                });
            }, i * 100); 
        }
    }
});