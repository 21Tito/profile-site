// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const form = document.getElementById('contactForm');
    
    if (form) {
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
                const response = await fetch('http://localhost:3001/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
    }

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