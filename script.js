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