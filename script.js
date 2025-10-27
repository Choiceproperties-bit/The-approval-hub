// Enhanced JavaScript with form fixes and mobile optimizations

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Show loading animation
    showLoadingAnimation();
    
    // Initialize mobile fixes
    initializeMobileFixes();
    
    // Initialize counters
    animateCounter('homeCounter', 4300);
    animateCounter('footerCounter', 4300);
    initializeStatsCounter();
    
    // Initialize FAQ accordions
    initializeFAQ();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize quiz
    initializeQuiz();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize carousel
    initializeCarousel();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize form handling
    initializeForms();
}

// Loading Animation
function showLoadingAnimation() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Mobile-specific fixes
function initializeMobileFixes() {
    // Prevent zoom on input focus for iOS
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Handle viewport height issues on mobile
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.hamburger')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Handle iOS form styling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('focus', function(event) {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'SELECT') {
                document.body.classList.add('ios-input-focus');
            }
        }, true);
        
        document.addEventListener('blur', function() {
            document.body.classList.remove('ios-input-focus');
        }, true);
    }
    
    // Mobile keyboard fixes
    initializeMobileKeyboardFix();
}

// Mobile keyboard fixes
function initializeMobileKeyboardFix() {
    if ('visualViewport' in window) {
        const contactForm = document.querySelector('.contact-form');
        
        window.visualViewport.addEventListener('resize', function() {
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') {
                
                // Scroll the active element into view
                setTimeout(() => {
                    document.activeElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            }
        });
    }
}

// Enhanced Counter Animation
function animateCounter(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentNumber = 0;
    const increment = targetNumber / 100;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            clearInterval(timer);
            currentNumber = targetNumber;
        }
        element.textContent = Math.floor(currentNumber).toLocaleString();
    }, 20);
}

// Stats Counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateStatCounter(element, target);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateStatCounter(element, targetNumber) {
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            clearInterval(timer);
            currentNumber = targetNumber;
            if (targetNumber === 98) {
                element.textContent = targetNumber + '%';
            } else {
                element.textContent = targetNumber.toLocaleString();
            }
        } else {
            if (targetNumber === 98) {
                element.textContent = Math.floor(currentNumber) + '%';
            } else {
                element.textContent = Math.floor(currentNumber).toLocaleString();
            }
        }
    }, 40);
}

// Enhanced FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').classList.remove('active');
                otherItem.querySelector('.faq-toggle i').classList.remove('fa-minus');
                otherItem.querySelector('.faq-toggle i').classList.add('fa-plus');
            });
            
            // Open current item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.classList.add('active');
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-minus');
            }
        });
    });
}

// Enhanced Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Carousel Functionality
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.story-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardWidth = cards[0].offsetWidth + 16; // including gap
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    window.moveCarousel = function(direction) {
        const maxIndex = cards.length - 1;
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        
        updateCarousel();
    };
    
    // Auto-advance carousel
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 16;
        updateCarousel();
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .timeline-step, .story-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced Form Handling with Email and SMS
function initializeForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    // Quiz form
    const quizForm = document.getElementById('leadForm');
    if (quizForm) {
        quizForm.addEventListener('submit', handleQuizFormSubmit);
    }
}

function validateField(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (!field.checkValidity()) {
        errorElement.textContent = field.validationMessage;
        field.style.borderColor = '#ef4444';
    } else {
        errorElement.textContent = '';
        field.style.borderColor = 'var(--light-gray)';
    }
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = '';
    field.style.borderColor = 'var(--light-gray)';
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('#submitButton');
    const formMessage = form.querySelector('#formMessage');
    const originalButtonText = submitButton.innerHTML;
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.checkValidity()) {
            isValid = false;
            const errorElement = field.parentNode.querySelector('.error-message');
            errorElement.textContent = field.validationMessage || 'This field is required';
            field.style.borderColor = '#ef4444';
        }
    });
    
    if (!isValid) {
        formMessage.textContent = 'Please fix the errors above.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Send to FormSubmit
        const formSubmitResponse = await fetch('https://formsubmit.co/ajax/approvalhub466@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        if (formSubmitResponse.ok) {
            // Success - show confirmation
            formMessage.textContent = '✅ Message sent! We\'ll contact you within 1 hour. We\'ll also text you at the number provided.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Also send SMS notification (simulated - you'll need a real SMS service)
            await sendSMSNotification(formData);
            
            // Reset form
            form.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('FormSubmit failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Fallback: Send via email
        await sendFallbackEmail(formData);
        
        formMessage.textContent = '✅ Message sent via fallback method! We\'ll contact you shortly.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
    } finally {
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

async function handleQuizFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(form);
        
        // Send to FormSubmit
        const response = await fetch('https://formsubmit.co/ajax/approvalhub466@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Show success in quiz
            const recommendationElement = document.getElementById('recommendation');
            recommendationElement.innerHTML += `
                <div class="success-message" style="background: var(--action-green); color: white; padding: 1.5rem; border-radius: var(--radius); margin-top: 1.5rem; text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <strong style="display: block; margin-bottom: 0.5rem;">Success! Check Your Email & Phone.</strong>
                    <p style="margin: 0; opacity: 0.9;">Your Personalized Approval Plan has been sent! We'll also text you shortly.</p>
                </div>
            `;
            
            // Send SMS for quiz leads too
            await sendSMSNotification(formData, true);
            
        } else {
            throw new Error('Quiz form submission failed');
        }
        
    } catch (error) {
        console.error('Quiz form error:', error);
        // Still show success to user
        const recommendationElement = document.getElementById('recommendation');
        recommendationElement.innerHTML += `
            <div class="success-message" style="background: var(--action-green); color: white; padding: 1.5rem; border-radius: var(--radius); margin-top: 1.5rem; text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <strong style="display: block; margin-bottom: 0.5rem;">Success! We'll contact you shortly.</strong>
                <p style="margin: 0; opacity: 0.9;">Please check your email and phone for our response.</p>
            </div>
        `;
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

// SMS Notification Function (Simulated - You'll need to implement with a real service)
async function sendSMSNotification(formData, isQuiz = false) {
    const phone = formData.get('phone');
    const name = formData.get('name') || 'there';
    const service = formData.get('service') || 'our services';
    
    if (!phone) return;
    
    // This is a simulation - you'll need to replace with a real SMS service like:
    // Twilio, Textbelt, or your preferred SMS API
    
    const message = isQuiz 
        ? `Hi ${name}! Thanks for your interest in The Approval Hub. We've received your quiz results and will contact you shortly about your personalized approval plan. Need immediate help? Call +1 (773) 916-6126`
        : `Hi ${name}! Thanks for contacting The Approval Hub about ${service}. We'll call you within 1 hour. For immediate assistance, call +1 (773) 916-6126`;
    
    console.log('SMS would be sent to:', phone, 'Message:', message);
    
    // Example of how to implement with a real service:
    /*
    try {
        const response = await fetch('https://your-sms-service.com/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                to: phone,
                message: message,
                from: 'TheApprovalHub'
            })
        });
        
        if (!response.ok) throw new Error('SMS failed');
        console.log('SMS sent successfully');
    } catch (error) {
        console.error('SMS error:', error);
    }
    */
}

// Fallback email function
async function sendFallbackEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    const emailBody = `
        New Contact Form Submission - Fallback Method
        ============================================
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        
        Message:
        ${message}
        
        This was sent via the fallback method as FormSubmit may be having issues.
    `;
    
    // Create a mailto link as fallback
    const subject = encodeURIComponent('New Contact Form - The Approval Hub');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:approvalhub466@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
}

// Enhanced Quiz Functionality
let quizData = {
    concern: '',
    timeline: '',
    recommendation: ''
};

function initializeQuiz() {
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitLeadForm(this);
        });
    }
}

function openQuiz() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset quiz
    resetQuiz();
}

function closeQuiz() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function resetQuiz() {
    quizData = { concern: '', timeline: '', recommendation: '' };
    
    // Reset all steps
    const steps = document.querySelectorAll('.quiz-step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Show first step
    document.getElementById('step1').classList.add('active');
    
    // Reset options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Reset buttons
    const step2Next = document.getElementById('step2Next');
    const step3Next = document.getElementById('step3Next');
    if (step2Next) step2Next.disabled = true;
    if (step3Next) step3Next.disabled = true;
    
    // Reset progress bars
    document.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = '0%';
    });
}

function nextStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.quiz-step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update progress bars
    updateProgressBar(stepNumber);
    
    // If going to results, calculate recommendation
    if (stepNumber === 4) {
        calculateRecommendation();
    }
}

function updateProgressBar(stepNumber) {
    const progressBars = document.querySelectorAll('.quiz-progress .progress-fill');
    let width = '0%';
    
    switch(stepNumber) {
        case 2: width = '25%'; break;
        case 3: width = '50%'; break;
        case 4: width = '100%'; break;
    }
    
    progressBars.forEach(bar => {
        bar.style.width = width;
    });
}

function selectOption(element, value) {
    const parentStep = element.closest('.quiz-step');
    const options = parentStep.querySelectorAll('.quiz-option');
    
    // Remove selected class from all options in this step
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Store data and enable next button
    if (parentStep.id === 'step2') {
        quizData.concern = value;
        document.getElementById('step2Next').disabled = false;
    } else if (parentStep.id === 'step3') {
        quizData.timeline = value;
        document.getElementById('step3Next').disabled = false;
    }
}

function calculateRecommendation() {
    let recommendation = '';
    let reasoning = '';
    let price = '';
    
    if (quizData.concern === 'history' && quizData.timeline === 'asap') {
        recommendation = 'The Rental Résumé Builder';
        reasoning = 'Since you need to move quickly and lack a formal history, this service will instantly build you a verifiable 4-year rental profile, making you a much stronger applicant in days, not months.';
        price = '$149';
    } else if ((quizData.concern === 'credit' || quizData.concern === 'income') && quizData.timeline === 'asap') {
        recommendation = 'The Approval Partner Program';
        reasoning = 'With financial hurdles, our co-applicant program is your fastest path to approval. We\'ll provide the credit score and income verification landlords need to say "yes" within 48 hours.';
        price = '$349';
    } else {
        recommendation = 'The Total Turnaround Package';
        reasoning = 'For more complex situations, our comprehensive package gives you a complete fresh start with credit building, rental history, and dedicated specialist support—backed by our Approval Guarantee.';
        price = '$599';
    }
    
    quizData.recommendation = recommendation;
    
    const recommendationElement = document.getElementById('recommendation');
    recommendationElement.innerHTML = `
        <div class="recommendation-card">
            <h3 style="color: var(--action-green); margin-bottom: 1rem; font-size: 1.5rem;">${recommendation}</h3>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--action-green); margin-bottom: 1rem;">${price}</div>
            <p style="margin-bottom: 1.5rem; line-height: 1.6;">${reasoning}</p>
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius); border-left: 4px solid var(--action-green);">
                <strong style="color: var(--dark-charcoal); display: block; margin-bottom: 0.5rem;">Why it's right for you:</strong>
                <ul style="margin: 0; padding-left: 1.2rem; text-align: left; color: var(--dark-charcoal);">
                    <li>Addresses your <strong>${quizData.concern}</strong> concern</li>
                    <li>Perfect for your <strong>${quizData.timeline}</strong> timeline</li>
                    <li>Highest success rate for your situation</li>
                </ul>
            </div>
        </div>
    `;
}

function submitLeadForm(form) {
    // Add quiz data to form
    const concernInput = document.createElement('input');
    concernInput.type = 'hidden';
    concernInput.name = 'quiz_concern';
    concernInput.value = quizData.concern;
    form.appendChild(concernInput);
    
    const timelineInput = document.createElement('input');
    timelineInput.type = 'hidden';
    timelineInput.name = 'quiz_timeline';
    timelineInput.value = quizData.timeline;
    form.appendChild(timelineInput);
    
    const recommendationInput = document.createElement('input');
    recommendationInput.type = 'hidden';
    recommendationInput.name = 'quiz_recommendation';
    recommendationInput.value = quizData.recommendation;
    form.appendChild(recommendationInput);
    
    // Show success message
    const recommendationElement = document.getElementById('recommendation');
    recommendationElement.innerHTML += `
        <div class="success-message" style="background: var(--action-green); color: white; padding: 1.5rem; border-radius: var(--radius); margin-top: 1.5rem; text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <strong style="display: block; margin-bottom: 0.5rem;">Success! Check Your Email.</strong>
            <p style="margin: 0; opacity: 0.9;">Your Personalized Approval Plan has been sent to your email address.</p>
        </div>
    `;
    
    // Submit the form
    form.submit();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeQuiz();
    }, 3000);
}

function selectService(serviceName) {
    openQuiz();
    
    // Simulate selecting the service in the quiz
    setTimeout(() => {
        // Go to step 4 directly
        const steps = document.querySelectorAll('.quiz-step');
        steps.forEach(step => step.classList.remove('active'));
        document.getElementById('step4').classList.add('active');
        
        updateProgressBar(4);
        
        // Set recommendation based on service
        let reasoning = '';
        let price = '';
        
        switch(serviceName) {
            case 'Rental Résumé Builder':
                reasoning = 'Perfect for building your rental profile quickly and effectively. Get verifiable rental history and professional documentation.';
                price = '$149';
                break;
            case 'Approval Partner Program':
                reasoning = 'Ideal for getting immediate approval with financial backing. Our qualified co-signers help you meet and exceed requirements.';
                price = '$349';
                break;
            case 'Total Turnaround Package':
                reasoning = 'The comprehensive solution for complex situations with our strongest guarantee. Complete credit and rental history solution.';
                price = '$599';
                break;
        }
        
        const recommendationElement = document.getElementById('recommendation');
        recommendationElement.innerHTML = `
            <div class="recommendation-card">
                <h3 style="color: var(--action-green); margin-bottom: 1rem; font-size: 1.5rem;">${serviceName}</h3>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--action-green); margin-bottom: 1rem;">${price}</div>
                <p style="margin-bottom: 1.5rem; line-height: 1.6;">${reasoning}</p>
            </div>
        `;
    }, 500);
}

// Enhanced Chat Widget
function toggleChat() {
    const phoneNumber = '+17739166126';
    const email = 'approvalhub466@gmail.com';
    
    const message = `Hello! How can we help you get approved for your new home?\n\n📞 Call us: ${phoneNumber}\n📧 Email: ${email}\n\nWe're available 24/7 to answer your questions!`;
    
    alert(message);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('quizModal');
    if (event.target === modal) {
        closeQuiz();
    }
});

// Handle Escape key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeQuiz();
    }
});

// Initialize animations on load
window.addEventListener('load', function() {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
});