document.addEventListener('DOMContentLoaded', () => {
    console.log('JS file loaded');
    const circlesContainer = document.querySelector('.circles-container');
    const circleData = [
        'Avalon', 'Werewolf', 'Azul', 'Exploding Kittens', 'Uno',
        'Salem', 'Code Names', 'Catan', 'Duel', 'Carcassonne',
        'Coup', 'Hanabi', 'Splendor', 'Secret Hitler', 'Ticket to Ride',
        'Pandemic', 'The Mind', 'Monopoly Deal',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45'
    ];

    const minSize = 50;
    const maxSize = 100;
    const minSpacing = 5;

    function createCircle(brand, size, isEnlarge) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        if (isEnlarge) {
            circle.classList.add('hover-enlarge');
        } else {
            circle.classList.add('hover-color');
        }
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.dataset.brand = brand;
        return circle;
    }

    function getRandomColor(existingColors) {
        const letters = '0123456789ABCDEF';
        let color;
        do {
            color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (existingColors.includes(color));
        return color;
    }

    function initializeCircles() {
        const circles = [];
        const existingColors = [];

        circleData.forEach(brand => {
            const size = Math.random() * (maxSize - minSize) + minSize;
            const isEnlarge = isNaN(parseInt(brand)); // Board game circles
            const circle = createCircle(brand, size, isEnlarge);

            if (!isEnlarge) {
                // Numbered circles
                const color = getRandomColor(existingColors);
                circle.style.setProperty('--hover-color', color); // Set hover color
                existingColors.push(color); // Track used colors
            }

            circlesContainer.appendChild(circle);
            circles.push(circle);
        });

        placeCircles(circles);
    }

    function placeCircles(circles) {
        const containerRect = circlesContainer.getBoundingClientRect();

        circles.forEach(circle => {
            let placed = false;

            while (!placed) {
                const size = parseFloat(circle.style.width);
                const x = Math.random() * (containerRect.width - size);
                const y = Math.random() * (containerRect.height - size);

                if (!isOverlap(circle, x, y, size)) {
                    circle.style.left = `${x}px`;
                    circle.style.top = `${y}px`;
                    placed = true;
                }
            }
        });
    }

    function isOverlap(circle, x, y, size) {
        const rect1 = { left: x, right: x + size, top: y, bottom: y + size };
        const circles = document.querySelectorAll('.circle');

        for (const other of circles) {
            if (other === circle) continue;
            const otherSize = parseFloat(window.getComputedStyle(other).width);
            const rect2 = {
                left: parseFloat(other.style.left),
                right: parseFloat(other.style.left) + otherSize,
                top: parseFloat(other.style.top),
                bottom: parseFloat(other.style.top) + otherSize,
            };
            if (
                rect1.left < rect2.right + minSpacing &&
                rect1.right > rect2.left - minSpacing &&
                rect1.top < rect2.bottom + minSpacing &&
                rect1.bottom > rect2.top - minSpacing
            ) {
                return true;
            }
        }
        return false;
    }

    initializeCircles();

    let timeout;
    const switchDelay = 10000; // 10 seconds

    // Function to switch the background image
    function switchBackground() {
        document.body.classList.add('background-switch');
    }

    // Function to reset the background image and inactivity timer
    function resetInactivityTimer() {
        document.body.classList.remove('background-switch');
        clearTimeout(timeout);
        timeout = setTimeout(switchBackground, switchDelay);
    }

    // Initialize the inactivity timer
    resetInactivityTimer();

    // Event listeners to reset the timer on mouse movement and interactions
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    // Handle hover effects for circles
    document.querySelectorAll('.circle').forEach(circle => {
        circle.addEventListener('mouseover', () => {
            if (!circle.classList.contains('hover-color')) {
                circle.style.transform = 'scale(1.5)';
            }
        });
        circle.addEventListener('mouseout', () => {
            if (!circle.classList.contains('hover-color')) {
                circle.style.transform = 'scale(1)';
            }
        });
    });

    const specialImages = [
        document.getElementById("special-image-1"),
        document.getElementById("special-image-2"),
        document.getElementById("special-image-3"),
        document.getElementById("special-image-4"),
        document.getElementById("special-image-5"),
        document.getElementById("special-image-6")
    ];
    const originalContent = document.getElementById("original-content");

    // Show and hide images in sequence
    function showImagesInSequence(images, interval) {
        let currentIndex = 0;

        function showNextImage() {
            if (currentIndex > 0) {
                images[currentIndex - 1].style.display = "none";
            } else {
                originalContent.style.display = "none";
            }

            if (currentIndex < images.length) {
                images[currentIndex].style.display = "block";
                currentIndex++;
                setTimeout(showNextImage, interval);
            } else {
                images[currentIndex - 1].style.display = "none";
                originalContent.style.display = "block";
            }
        }

        showNextImage();
    }

    // Start the sequence
    showImagesInSequence(specialImages, 3000); // Show each image for 3 seconds
});
