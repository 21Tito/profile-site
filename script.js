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
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Add modal close button listener
document.querySelector('.close-button').addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Update form submission handler
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log('Sending form data:', formData);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log('Server response:', result);
        
        if (response.ok) {
            e.target.reset();
            showModal(); // Show success modal instead of alert
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message'); // Keep alert for errors
    }
});