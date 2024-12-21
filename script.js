document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('https://portfolio-server-nnkf.onrender.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (data.success) {
                    form.reset();
                    const modal = document.getElementById('successModal');
                    modal.style.display = 'block';
                    modal.classList.add('show');
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            }
            
            return false;
        };
    }

    // Modal close handlers
    const modal = document.getElementById('successModal');
    const closeButton = document.querySelector('.close-button');

    if (closeButton) {
        closeButton.onclick = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        };
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    };

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            username: document.getElementById('signupUsername').value,
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value
        };

        try {
            const response = await fetch('https://portfolio-server-nnkf.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Account created successfully! Please login.');
                signupForm.reset();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating account. Please try again.');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };

        try {
            const response = await fetch('https://portfolio-server-xxxx.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                window.location.href = '/members.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in. Please try again.');
        }
    });
});

function checkSecret() {
    const secretInput = document.getElementById('secretCode');
    const secretContent = document.getElementById('secretContent');
    
    if (secretInput.value === 'password') {
        secretContent.style.display = 'block';
        secretInput.value = ''; // Clear the input
        
        // Add a fun animation
        secretContent.style.opacity = '0';
        secretContent.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            secretContent.style.transition = 'all 0.5s ease';
            secretContent.style.opacity = '1';
            secretContent.style.transform = 'scale(1)';
        }, 100);
    } else {
        alert('Nice try! But that\'s not the secret code 😉');
        secretInput.value = ''; // Clear the input
    }
}