// assets/js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    // Default configuration for all animations
    const sr = ScrollReveal({
        distance: '50px',   // How far the element moves
        duration: 1000,     // Animation duration in ms
        easing: 'ease-in-out', // Animation timing function
        reset: false        // Animations only happen once
    });

    // Animate the main header text
    sr.reveal('.header-text h1', {
        origin: 'top',
    });
    sr.reveal('.header-text p', {
        origin: 'top',
        delay: 200 // A slight delay after the h1
    });

    // Animate the header buttons with a staggered effect
    sr.reveal('.header-button', {
        origin: 'bottom',
        delay: 400,
        interval: 150 // Reveals buttons one after the other
    });
    
    // Animate the "About Me" section
    sr.reveal('#about img', {
        origin: 'left',
        delay: 200
    });
    sr.reveal('#about h2', {
        origin: 'right',
    });
    sr.reveal('#about p', {
        origin: 'right',
        delay: 200
    });

    // Animate the "Projects" section
    sr.reveal('#projects h2, #projects p', {
        origin: 'top'
    });
    // Animate the project cards with a staggered effect
    sr.reveal('.project-card', {
        origin: 'bottom',
        interval: 200
    });

    // Animate the Chess section
    sr.reveal('#chess-game h2, #chess-game p', {
        origin: 'top'
    });
    sr.reveal('#board', {
        origin: 'bottom',
        delay: 200,
        scale: 0.9 // A subtle zoom-in effect
    });

    // Animate the Contact section
    sr.reveal('#contact h2, #contact p', {
        origin: 'top'
    });
    sr.reveal('#contact a', {
        origin: 'bottom',
        delay: 200,
        interval: 150
    });
});