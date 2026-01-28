document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    function navigateTo(targetId) {
        // Update Buttons
        navBtns.forEach(btn => {
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Pages
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    // Initial Load
    navigateTo('home');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.target);
        });
    });

    // Make navigateTo global so the CTA button can use it
    window.navigateTo = navigateTo;


    // --- GAME LOGIC (Bug Squash V5) ---
    const totalBugs = 5;
    let squashedBugs = 0;
    const scoreDisplay = document.getElementById('score-counter');
    const victoryModal = document.getElementById('victory-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const bugs = document.querySelectorAll('.hidden-object'); // Selects all .bug elements

    bugs.forEach(bug => {
        bug.addEventListener('click', function () {
            // If already squashed, ignore
            if (this.style.pointerEvents === 'none') return;

            // Mark as squashed
            squashedBugs++;
            scoreDisplay.textContent = squashedBugs;

            // Visual feedback - SQUASH IT!
            this.classList.add('squashed');

            // Remove completely after animation to prevent blocking text
            setTimeout(() => {
                this.style.display = 'none';
            }, 300); // Matches CSS animation duration

            // Check win condition
            if (squashedBugs === totalBugs) {
                setTimeout(() => {
                    showVictory();
                }, 600);
            }
        });
    });

    function showVictory() {
        victoryModal.classList.remove('hidden');
        // Update modal text for bugs
        victoryModal.querySelector('h2').textContent = "👾 SYSTEM SECURE! 👾";
        victoryModal.querySelector('p').innerHTML = "The system is now stable.<br><br>Thank you for exploring my digital world. I hope you found it as fun to visit as I did to build!";
    }

    closeModalBtn.addEventListener('click', () => {
        victoryModal.classList.add('hidden');
    });

    // Helper: Initialize game state
    if (document.getElementById('total-bugs')) {
        document.getElementById('total-bugs').textContent = totalBugs;
    }
});
