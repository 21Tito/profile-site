document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
        window.location.href = '/index.html';
        return;
    }

    // Display username
    document.getElementById('memberName').textContent = username;

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/index.html';
    });

    // Verify token and fetch member data
    fetch('https://portfolio-server-xxxx.onrender.com/api/members', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            throw new Error('Invalid token');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = '/index.html';
    });
}); 