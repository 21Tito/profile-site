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
    // Prevent form submission from reloading the page
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Replace the existing submit handler
        form.addEventListener('submit', handleSubmit);
    }
});

// Separate function for form handling
async function handleSubmit(event) {
    event.preventDefault();  // Prevent form submission
    event.stopPropagation(); // Stop event bubbling
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (response.ok) {
            event.target.reset(); // Clear the form
            showModal();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message');
    }
    
    return false; // Prevent default form behavior
}