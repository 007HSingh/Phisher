// Onboarding logic
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === n);
        });
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    function skipOnboarding() {
        localStorage.setItem('ws_onboarding_completed', 'true');
        window.close();
    }

    function openSettings() {
        chrome.runtime.openOptionsPage();
        localStorage.setItem('ws_onboarding_completed', 'true');
        window.close();
    }

    // Bind clicks by class
    document.querySelectorAll('.onboarding-next').forEach(el => {
        el.addEventListener('click', nextSlide);
    });

    document.querySelectorAll('.onboarding-prev').forEach(el => {
        el.addEventListener('click', previousSlide);
    });

    document.querySelectorAll('.onboarding-skip').forEach(el => {
        el.addEventListener('click', skipOnboarding);
    });

    document.querySelectorAll('.onboarding-settings').forEach(el => {
        el.addEventListener('click', openSettings);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') previousSlide();
    });
});
