// Dark mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// Scroll animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// Initialize EmailJS - Replace with your EmailJS Public Key
// Get your keys from: https://www.emailjs.com/
// See EMAIL_SETUP.md for detailed instructions
const EMAILJS_PUBLIC_KEY = "OYFZNNzy_GO6LK-8o"; // Replace with your EmailJS Public Key
const EMAILJS_SERVICE_ID = "service_vgvkyyx"; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = "template_1w8awmx"; // Replace with your EmailJS Template ID

(function() {
    // Check if EmailJS is loaded and configured
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "OYFZNNzy_GO6LK-8o") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Contact form submission - Using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                user_name: document.getElementById('user_name').value.trim(),
                user_email: document.getElementById('user_email').value.trim(),
                message: document.getElementById('message').value.trim(),
                to_email: 'seymaagorur@hotmail.com'
            };
            
            // Validate form
            if (!formData.user_name || !formData.user_email || !formData.message) {
                formMessage.textContent = 'Lütfen tüm alanları doldurun.';
                formMessage.className = 'form-message error';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Gönderiliyor...';
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Check if EmailJS is configured
            if (typeof emailjs === 'undefined' || 
                EMAILJS_PUBLIC_KEY === "OYFZNNzy_GO6LK-8o" ||
                EMAILJS_SERVICE_ID === "service_vgvkyyx" ||
                EMAILJS_TEMPLATE_ID === "template_1w8awmx") {
                // EmailJS not configured - use fallback mailto
                const subject = encodeURIComponent('İletişim Formu - ' + formData.user_name);
                const body = encodeURIComponent(
                    'Ad Soyad: ' + formData.user_name + '\n\n' +
                    'E-posta: ' + formData.user_email + '\n\n' +
                    'Mesaj:\n' + formData.message
                );
                window.location.href = 'mailto:seymaagorur@hotmail.com?subject=' + subject + '&body=' + body;
                
                formMessage.textContent = 'E-posta istemciniz açılıyor. Lütfen mesajınızı gönderin.';
                formMessage.className = 'form-message';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Gönder';
                return;
            }
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: formData.user_name,
                from_email: formData.user_email,
                message: formData.message,
                to_email: formData.to_email,
                reply_to: formData.user_email
            })
            .then(function() {
                // Success
                formMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                submitBtn.textContent = 'Gönder';
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, function(error) {
                // Error
                formMessage.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan seymaagorur@hotmail.com adresine e-posta gönderin.';
                formMessage.className = 'form-message error';
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                submitBtn.disabled = false;
            });
        });
    }
});