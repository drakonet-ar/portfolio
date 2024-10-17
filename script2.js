/*
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

// Parámetros de capas
const layers = [
  { fontSize: 26, speed: 1.5, opacity: 1.0 },  // Más cerca
  { fontSize: 20, speed: 1.2, opacity: 0.75 }, // Intermedia
  { fontSize: 14, speed: 0.8, opacity: 0.5 }   // Más lejos
];

const rainDrops = layers.map(layer => {
  const columns = canvas.width / layer.fontSize;
  return Array.from({ length: columns }, () => Math.floor(Math.random() * canvas.height / layer.fontSize));
});

const draw = () => {
  // Limpiar el canvas con un ligero desvanecimiento (más oscuro para más realismo de profundidad)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  layers.forEach((layer, layerIndex) => {
    ctx.font = layer.fontSize + 'px monospace';

    for (let i = 0; i < rainDrops[layerIndex].length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      const x = i * layer.fontSize;
      const y = rainDrops[layerIndex][i] * layer.fontSize;

      // Color con opacidad según la capa
      const green = Math.floor(255 * (1 - y / canvas.height));
      ctx.fillStyle = `rgba(0, ${green}, 0, ${layer.opacity})`;

      // Dibujar el texto
      ctx.fillText(text, x, y);

      // Restablecer la gota si se sale de la pantalla, con una pequeña probabilidad
      if (y > canvas.height && Math.random() > 0.975) {
        rainDrops[layerIndex][i] = 0;
      }

      // Movimiento de las gotas, más rápido en capas cercanas
      rainDrops[layerIndex][i] += layer.speed;
    }
  });
};

// Ejecutar el efecto continuamente
setInterval(draw, 30);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Recalcular las columnas para cada capa
  layers.forEach((layer, layerIndex) => {
    const columns = canvas.width / layer.fontSize;
    rainDrops[layerIndex] = Array.from({ length: columns }, () => Math.floor(Math.random() * canvas.height / layer.fontSize));
  });
});  
*/

// ***************************************************************************************************************************************************************************
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    const x = i * fontSize;
    const y = rainDrops[i] * fontSize;

    // Calculate color based on y position
    const green = Math.floor(255 * (1 - y / canvas.height));
    const blue = Math.floor(255 * (y / canvas.height));
    ctx.fillStyle = `rgb(0, ${green}, 0)`;

    ctx.font = fontSize + 'px monospace';
    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ***************************************************************************************************************************************************************************

// Smooth scrolling and section visibility
const content = document.querySelector('.content');
const sections = document.querySelectorAll('.section');
const header = document.getElementById('main-header');
const navLinks = document.querySelectorAll('#main-header nav ul li a');

let currentSection = 0;
let isScrolling = false;

// Variables para manejo de toque
let startY = 0;
let endY = 0;

// Función para desplazamiento con rueda del mouse
content.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!isScrolling) {
        isScrolling = true;
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (e.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }
        updateSectionVisibility();
        content.scrollTo({
            top: currentSection * window.innerHeight,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
});

// Funciones para manejar los eventos táctiles (toque)
content.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

content.addEventListener('touchmove', (e) => {
    endY = e.touches[0].clientY;
});

content.addEventListener('touchend', () => {
    const distanceY = startY - endY;
    if (!isScrolling) {
        isScrolling = true;
        // Desplazamiento hacia arriba
        if (distanceY > 50 && currentSection < sections.length - 1) {
            currentSection++;
        }
        // Desplazamiento hacia abajo
        else if (distanceY < -50 && currentSection > 0) {
            currentSection--;
        }
        updateSectionVisibility();
        content.scrollTo({
            top: currentSection * window.innerHeight,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
});

function updateSectionVisibility() {
    sections.forEach((section, index) => {
        if (index === currentSection) {
            section.classList.add('active');
            navLinks[index].classList.add('active');
        } else {
            section.classList.remove('active');
            navLinks[index].classList.remove('active');
        }
    });
}


/*
// Smooth scrolling and section visibility
const content = document.querySelector('.content');
const sections = document.querySelectorAll('.section');
const header = document.getElementById('main-header');
const navLinks = document.querySelectorAll('#main-header nav ul li a');

let currentSection = 0;
let isScrolling = false;

content.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!isScrolling) {
        isScrolling = true;
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (e.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }
        updateSectionVisibility();
        content.scrollTo({
            top: currentSection * window.innerHeight,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
});

function updateSectionVisibility() {
    sections.forEach((section, index) => {
        if (index === currentSection) {
            section.classList.add('active');
            navLinks[index].classList.add('active');
        } else {
            section.classList.remove('active');
            navLinks[index].classList.remove('active');
        }
    });
}
*/

// ***************************************************************************************************************************************************************************
// Header visibility
let isHeaderVisible = false;
let headerTimeout;

function showHeader() {
    if (!isHeaderVisible) {
        header.classList.remove('hidden');
        isHeaderVisible = true;
    }
}

function hideHeader() {
    if (isHeaderVisible) {
        header.classList.add('hidden');
        isHeaderVisible = false;
    }
}

// Update header visibility based on mouse position and scroll position
function updateHeaderVisibility(e) {
    const headerHeight = header.offsetHeight;
    const isMouseInHeaderArea = e.clientY < headerHeight;
    const isAtTop = content.scrollTop < headerHeight;

    if (isMouseInHeaderArea) {
        showHeader();
        clearTimeout(headerTimeout);
    } else {
        if (isAtTop) {
            hideHeader();
        } else {
            clearTimeout(headerTimeout);
            headerTimeout = setTimeout(hideHeader, 3000);
        }
    }
}

document.addEventListener('mousemove', updateHeaderVisibility);

content.addEventListener('scroll', () => {
    updateHeaderVisibility({ clientY: 0 }); // Simulate mouse position outside header area
});

// ***************************************************************************************************************************************************************************
// Burger menu
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('#main-header nav');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    nav.classList.toggle('open');
});

// Close the menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('open');
        nav.classList.remove('open');
    });
});

// Modify the existing updateHeaderVisibility function
function updateHeaderVisibility(e) {
    const headerHeight = header.offsetHeight;
    const isMouseInHeaderArea = e.clientY < headerHeight;
    const isAtTop = content.scrollTop < headerHeight;

    if (window.innerWidth <= 1020) {
        // Always show header on mobile
        showHeader();
    } else {
        if (isMouseInHeaderArea) {
            showHeader();
            clearTimeout(headerTimeout);
        } else {
            if (isAtTop) {
                hideHeader();
            } else {
                clearTimeout(headerTimeout);
                headerTimeout = setTimeout(hideHeader, 3000);
            }
        }
    }
}

// Add resize event listener to handle responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) {
        burgerMenu.classList.remove('open');
        nav.classList.remove('open');
    }
    updateHeaderVisibility({ clientY: 0 });
});

// ***************************************************************************************************************************************************************************
// Smooth scrolling for nav links
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentSection = index;
        updateSectionVisibility();
        content.scrollTo({
            top: currentSection * window.innerHeight,
            behavior: 'smooth'
        });
    });
});

// ***************************************************************************************************************************************************************************

// Typing animation for About section
const typingText = document.getElementById('typing-text');
const textToType = "Hello! I'm a passionate web developer with a keen interest in creating innovative and user-friendly digital experiences. With a strong foundation in front-end technologies and a growing expertise in back-end development, I'm always eager to take on new challenges and push the boundaries of what's possible on the web. I'm currently seeking opportunities to collaborate on exciting projects that make a positive impact. Whether it's a startup looking for a dedicated developer or an established company in need of fresh perspectives, I'm ready to bring my skills and enthusiasm to the table.";

let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}



// Start typing animation when About section becomes active
const aboutSection = document.getElementById('about-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && charIndex === 0) {
            typeText();
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);


// ***************************************************************************************************************************************************************************
// FORMS:
// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Handle newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for subscribing to my newsletter!');
    newsletterForm.reset();
});


// ***************************************************************************************************************************************************************************
// Initialize the first section as active
updateSectionVisibility();