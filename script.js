document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const idadeElement = document.getElementById('idade');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.dataset.theme = savedTheme;
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.dataset.theme;
        const newTheme = currentTheme === 'light' ? '' : 'light';
        
        root.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    });

    // Calculate and update age
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Set your birth date here (YYYY-MM-DD format)
    const birthDate = '2006-05-06';
    const age = calculateAge(birthDate);
    idadeElement.textContent = `Tenho ${age} anos e estou estudando programação.`;

    // Update age when date changes (at midnight)
    function scheduleAgeUpdate() {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow - now;

        setTimeout(() => {
            const newAge = calculateAge(birthDate);
            idadeElement.textContent = `Tenho ${newAge} anos e estou estudando programação.`;
            scheduleAgeUpdate(); // Schedule next update
        }, timeUntilMidnight);
    }

    scheduleAgeUpdate();
});


const themeIcon = document.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
    themeIcon.textContent = themeIcon.textContent === '🌓' ? '🌙' : '🌓';
});


