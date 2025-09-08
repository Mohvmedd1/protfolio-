document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');

    // Select all animated elements
    const animatedElements = document.querySelectorAll('.animate__animated');

    // Function to re-trigger animations
    function retriggerAnimations() {
        animatedElements.forEach(el => {
            const classes = Array.from(el.classList).filter(cls => cls.startsWith('animate__'));
            el.classList.remove(...classes); // Remove all animate classes
            // Force reflow
            void el.offsetWidth; 
            el.classList.add(...classes); // Add them back
        });
    }

    // Set dark mode as default if no theme is saved or if light mode was saved
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'dark') { // Default to dark if no theme or explicitly dark
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon'); // Ensure sun icon is shown for dark mode
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark'); // Save dark mode as default
    } else { // If light mode was explicitly saved
        document.body.classList.add('light-mode');
        icon.classList.remove('fa-sun'); // Ensure moon icon is shown for light mode
        icon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        // Toggle between dark-mode and light-mode
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        retriggerAnimations(); // Re-trigger animations after theme change
    });
});