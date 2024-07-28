// Create the 3D globe
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-background').appendChild(renderer.domElement);

// Create globe
const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0x3366ff,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x3366ff,
    transparent: true,
    opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();

// Scroll animations
const sections = document.querySelectorAll('section');

function animateOnScroll() {
    const scrollPosition = window.pageYOffset;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Animate the globe and particles based on scroll position
            const progress = (scrollPosition - sectionTop) / (sectionBottom - sectionTop);
            globe.rotation.y = progress * Math.PI * 2;
            particlesMesh.rotation.y = progress * Math.PI;
            
            // Fade in the section content
            gsap.to(section, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else {
            // Fade out the section content
            gsap.to(section, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out' });
        }
    });
    
}

// Initial setup
sections.forEach((section) => {
    gsap.set(section, { opacity: 0, y: 50 });
});

// Event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Run initial animation
animateOnScroll();


// function sendMessage(name, email, message) {
//     alert("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);
//     // You can replace the above alert with your submission logic
// }

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const form = event.target;
    const name = form['form[name]'].value;
    const email = form['form[email]'].value;
    const message = form['form[message]'].value;
    const success = document.getElementById('success_message');
    try {
        sendMessage(name, email, message);
        form.reset();
        success.style.display = "block";
        setTimeout(() => {success.style.display = "none";}, 3000);
        
    } catch (error) {
        console.log("Error:", error);
        
    }
    // Call sendMessage with the form values

}

function sendMessage(name, email, message) {
    try {
        fetch('https://sheetdb.io/api/v1/fk907ewrigjim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'Name': name,
                        'Email': email,
                        "Message": message,
                        'TimeStamp': new Date().toLocaleString()
                    }
                ]
            })
        })
          .then((response) => response.json())
          .then((data) => {
                console.log('Success:')
            });
    } catch (error) {
        console.log("Error:", error);   
    }
}



// Partners
document.addEventListener('DOMContentLoaded', () => {
    const partners = [
      { src: './partners/highcha.png', alt: 'Special Partner 1' },
      { src: './partners/spholiday.png', alt: 'Special Partner 2' },
      { src: './partners/ushaescort.png', alt: 'Special Partner 3' },
      { src: './partners/partner1.png', alt: 'Partner 1' },
      { src: './partners/partner2.png', alt: 'Partner 2' },
      { src: './partners/partner3.png', alt: 'Partner 3' },
      { src: './partners/partner4.png', alt: 'Partner 4' },
      { src: './partners/partner5.png', alt: 'Partner 5' },
      { src: './partners/partner6.png', alt: 'Partner 6' },
      { src: './partners/partner7.png', alt: 'Partner 7' },
      { src: './partners/partner8.png', alt: 'Partner 8' },
      { src: './partners/partner9.png', alt: 'Partner 9' },
      { src: './partners/partner10.png', alt: 'Partner 10' },
      { src: './partners/partner11.png', alt: 'Partner 11' },
    ];
  
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
  
    function createLogoElement(partner) {
      const logoDiv = document.createElement('div');
      logoDiv.className = 'partner-logo';
      const img = document.createElement('img');
      img.src = partner.src;
      img.alt = partner.alt;
      logoDiv.appendChild(img);
      return logoDiv;
    }
  
    function populateStrip(strip, isReverse = false) {
      const partnersCopy = isReverse ? [...partners].reverse() : [...partners];
      partnersCopy.forEach(partner => {
        strip.appendChild(createLogoElement(partner));
      });
      // Clone and append again for seamless looping
      partnersCopy.forEach(partner => {
        strip.appendChild(createLogoElement(partner));
      });
    }
  
    populateStrip(scrollLeft);
    populateStrip(scrollRight, true);
  
    function startAnimation(strip, direction) {
      let scrollAmount = 0;
      const step = 1; // Adjust for speed
      const interval = 100; // Adjust for smoothness
  
      function scroll() {
        scrollAmount += step;
        if (scrollAmount >= strip.scrollWidth / 2) {
          scrollAmount = 0;
        }
        strip.style.transform = `translateX(${direction * scrollAmount}px)`;
        requestAnimationFrame(scroll);
      }
  
      scroll();
    }
  
    startAnimation(scrollLeft, -1);
    startAnimation(scrollRight, 1);
  });


  // Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidePanel = document.querySelector('.side-panel');
    const sidePanelLinks = document.querySelectorAll('.side-panel ul li a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        sidePanel.classList.toggle('active');
    });

    // Close side panel when a link is clicked
    sidePanelLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            sidePanel.classList.remove('active');
        });
    });

    // Close side panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidePanel.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            sidePanel.classList.remove('active');
        }
    });
});