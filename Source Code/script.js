document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const progressBar = document.getElementById('progressBar');
    const particlesContainer = document.getElementById('particles');
    
    const phrases = [
        "Hello, World!",
        "Welcome to TypeMagic",
        "Where words come alive",
        "Dynamic typing experience",
        "Pure JavaScript magic",
        "Watch the particles dance",
        "Enjoy the show!",
        "Try adding your own phrases..."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBetweenPhrases = 1500;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        const currentLength = currentPhrase.length;
        
        // Update progress bar
        const progress = ((charIndex / currentLength) * 100) / phrases.length + 
                        (phraseIndex / phrases.length * 100);
        progressBar.style.width = `${progress}%`;
        
        if (!isDeleting && charIndex < currentLength) {
            // Typing
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = Math.random() * 50 + 70;
            createParticle();
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            deletingSpeed = Math.random() * 30 + 30;
        } else if (!isDeleting && charIndex === currentLength) {
            // Finished typing current phrase
            if (!isEnd) {
                isEnd = true;
                typingSpeed = pauseBetweenPhrases;
            } else {
                isDeleting = true;
                isEnd = false;
                typingSpeed = 500;
            }
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting current phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position near cursor
        const typewriterRect = typewriterElement.getBoundingClientRect();
        const x = typewriterRect.right - 10 + Math.random() * 20;
        const y = typewriterRect.top + typewriterRect.height / 2 + Math.random() * 20 - 10;
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = `rgba(76, 201, 240, ${opacity})`;
        
        particlesContainer.appendChild(particle);
        
        // Animate particle
        const animationDuration = Math.random() * 2000 + 1000;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: opacity 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: animationDuration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
    
    // Initialize effect
    setTimeout(typeWriter, 1000);
    
    // Interactive particles
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 1;
            const opacity = Math.random() * 0.5 + 0.2;
            
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = `rgba(161, 182, 255, ${opacity})`;
            
            particlesContainer.appendChild(particle);
            
            const animationDuration = Math.random() * 1500 + 500;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 30 + 10;
            
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: opacity 
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: animationDuration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    });
});
