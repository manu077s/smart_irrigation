// Plant Monitoring System Clone - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .ecosystem-item, .use-case-card, .feature-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email && isValidEmail(email)) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    submitBtn.style.background = '#28a745';
                    this.querySelector('.newsletter-input').value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 2000);
                }, 1500);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        let timeoutId;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.transform = 'translateY(-10px)';
            
            requestAnimationFrame(() => {
                dropdownMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.transform = 'translateY(0)';
            });
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.transform = 'translateY(-10px)';
            
            timeoutId = setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 300);
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .product-card, .ecosystem-item, .use-case-card, .feature-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-primary') && !this.disabled) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Keyboard navigation for dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.dropdown-menu[style*="block"]');
            openDropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            padding: 2rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll handling logic here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for keyboard navigation
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #007bff !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyle);
    
    console.log('Plant Monitoring System Clone loaded successfully! 🌱');
});

// Feedback form handling (matches standalone widget behavior)
document.addEventListener('DOMContentLoaded', function() {
    const ajaxFeedbackForm = document.querySelector('.feedback-form');
    if (!ajaxFeedbackForm || ajaxFeedbackForm.dataset.ajax === 'false') {
        return;
    }

    const successAlert = 'Form submitted successfully!\n\nThank you! The form has been submitted successfully. We will reply to you soon!';

    ajaxFeedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        const formData = new FormData(this);

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const response = await fetch(this.action, {
                method: this.method || 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            await response.json();
            alert(successAlert);
            this.reset();
        } catch (error) {
            console.error('Feedback submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});

// IoT Framework Comparison Matrix
const frameworkData = [
    {
        framework: "Adafruit IO",
        latencyMs: "~200–500",
        deliverySuccessPct: "97–99%",
        reconnectionSec: "~2–5",
        maxThroughputMsgPerSec: "~5–20",
        encryption: "TLS/SSL (MQTT/HTTP)",
        dosHandling: "Good",
    },
    {
        framework: "ThingSpeak",
        latencyMs: "~300–800",
        deliverySuccessPct: "96–99%",
        reconnectionSec: "~3–7",
        maxThroughputMsgPerSec: "~5–15",
        encryption: "TLS/SSL (HTTPS/MQTT)",
        dosHandling: "Reasonable",
    },
    {
        framework: "Blynk Cloud",
        latencyMs: "~100–400",
        deliverySuccessPct: "98–99%",
        reconnectionSec: "~2–4",
        maxThroughputMsgPerSec: "~10–30",
        encryption: "TLS/SSL (App/Cloud)",
        dosHandling: "Good",
    },
    {
        framework: "Firebase RTDB",
        latencyMs: "~80–300",
        deliverySuccessPct: "99%+",
        reconnectionSec: "~2–5",
        maxThroughputMsgPerSec: "50+",
        encryption: "Strong TLS (Google)",
        dosHandling: "Very Strong",
    },
];

function createFrameworkTable() {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
        "Framework",
        "Latency (ms)",
        "Delivery Success (%)",
        "Reconnection Time (s)",
        "Max Throughput (msg/s)",
        "Encryption Strength",
        "DoS Handling (Resilient?)",
    ];
    headers.forEach((h) => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    frameworkData.forEach((row) => {
        const tr = document.createElement("tr");
        const cells = [
            row.framework,
            row.latencyMs,
            row.deliverySuccessPct,
            row.reconnectionSec,
            row.maxThroughputMsgPerSec,
            row.encryption,
            row.dosHandling,
        ];
        cells.forEach((c) => {
            const td = document.createElement("td");
            td.textContent = c;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.appendChild(table);

    const note = document.createElement("div");
    note.className = "metric-note";
    note.textContent = "Values are approximate and vary by plan, region, and payload size.";

    const frag = document.createDocumentFragment();
    frag.appendChild(wrap);
    frag.appendChild(note);
    return frag;
}

function toggleFrameworkMatrix() {
    const section = document.getElementById("matrixSection");
    const btn = document.getElementById("btnShowMatrix");
    if (!section || !btn) return;

    const isHidden = section.classList.contains("hidden");

    if (isHidden) {
        if (!section.dataset.rendered) {
            section.innerHTML = "";
            section.appendChild(createFrameworkTable());
            section.dataset.rendered = "true";
        }
        section.classList.remove("hidden");
        section.setAttribute("aria-hidden", "false");
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Comparison Matrix';
        
        // Scroll to matrix smoothly
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        section.classList.add("hidden");
        section.setAttribute("aria-hidden", "true");
        btn.innerHTML = '<i class="fas fa-table"></i> Get Comparison Matrix';
    }
}

// Initialize matrix functionality
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById("btnShowMatrix");
    if (btn) {
        btn.addEventListener("click", toggleFrameworkMatrix);
    }
});
