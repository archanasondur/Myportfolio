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


    // --- PROJECT MODAL LOGIC ---
    const projectModal = document.getElementById('project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal-btn');

    // Elements to populate
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalStack = document.getElementById('modal-stack');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');

    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent opening if clicking the bug (which has its own logic)
            if (e.target.classList.contains('bug')) return;

            const title = card.getAttribute('data-title');
            const subtitle = card.getAttribute('data-subtitle');
            const stack = card.getAttribute('data-stack');
            const description = card.getAttribute('data-description');
            const details = JSON.parse(card.getAttribute('data-details') || '[]');

            // Populate Modal
            modalTitle.textContent = title;
            modalSubtitle.textContent = subtitle;
            modalStack.textContent = "Stack: " + stack;
            modalDescription.textContent = description;

            // Clear and populate details list
            modalDetails.innerHTML = '';
            details.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalDetails.appendChild(li);
            });

            // Show Modal
            projectModal.classList.remove('hidden');
        });
    });

    if (closeProjectModalBtn) {
        closeProjectModalBtn.addEventListener('click', () => {
            projectModal.classList.add('hidden');
        });
    }

    // Close on click outside modal content
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.add('hidden');
        }
    });


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
