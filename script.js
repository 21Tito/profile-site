// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // You can add your JavaScript code here
    console.log('Website loaded successfully!');
});

// Add this before closing body tag
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4
      },
      "move": {
        "enable": true,
        "speed": 6
      }
    }
  }
);
</script>

// Modal functions
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Modal close handlers
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('successModal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Make sure the DOM is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');

    // Add submit handler
    form.addEventListener('submit', async function(e) {
        // Prevent the default form submission
        e.preventDefault();
        e.stopPropagation();
        
        // Disable the submit button to prevent double submission
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Send the data
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Clear the form
                form.reset();
                
                // Show success modal
                const modal = document.getElementById('successModal');
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            // Re-enable the submit button
            submitButton.disabled = false;
        }
    });

    // Modal close handlers
    const modal = document.getElementById('successModal');
    const closeButton = document.querySelector('.close-button');

    // Close button handler
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
});