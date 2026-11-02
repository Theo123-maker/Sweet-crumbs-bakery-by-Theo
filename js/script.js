
/* =========================================
   SWEET CRUMBS BAKERY - PART 3 JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. PRODUCT SEARCH
    const searchInput = document.getElementById("productSearch");
    const productCards = document.querySelectorAll(".product-card");
    const noProductsMessage = document.getElementById("noProducts");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            productCards.forEach(function (card) {
                const productText = card.textContent.toLowerCase();
                const matches = productText.includes(searchTerm);

                card.hidden = !matches;

                if (matches) visibleCount++;
            });

            if (noProductsMessage) {
                noProductsMessage.hidden = visibleCount !== 0;
            }
        });
    }

    // 2. IMAGE LIGHTBOX
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    document.querySelectorAll(".gallery-image").forEach(function (image) {
        image.addEventListener("click", function () {
            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
            document.body.style.overflow = "hidden";

            if (closeLightbox) closeLightbox.focus();
        });
    });

    function hideLightbox() {
        if (!lightbox) return;

        lightbox.hidden = true;
        document.body.style.overflow = "";
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", hideLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) hideLightbox();
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") hideLightbox();
    });

    // 3. FORM VALIDATION AND RESPONSE
    document.querySelectorAll(".validated-form").forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const messageBox = form.querySelector(".form-message");

            // Use built-in HTML validation first.
            if (!form.checkValidity()) {
                form.reportValidity();

                if (messageBox) {
                    messageBox.textContent =
                        "Please check the highlighted fields and complete the form correctly.";
                    messageBox.className = "form-message error";
                }

                return;
            }

            if (form.id === "enquiryForm") {
                const product = form.elements.product.value;
                const quantity = form.elements.quantity.value;

                if (messageBox) {
                    messageBox.textContent =
                        "Thank you for your enquiry about " + product +
                        ". Requested quantity: " + quantity +
                        ". Please contact the bakery to confirm prices and availability.";
                    messageBox.className = "form-message success";
                }
            } else if (form.id === "contactForm") {
                const name = form.elements.name.value.trim();

                if (messageBox) {
                    messageBox.textContent =
                        "Thank you, " + name +
                        ". Your message has been checked. Select the email button below to send it to the bakery.";
                    messageBox.className = "form-message success";
                }

                const emailButton = form.querySelector(".email-button");
                if (emailButton) emailButton.hidden = false;
            }
        });
    });

    // 4. PREPARE A GENERAL CONTACT EMAIL
    const contactForm = document.getElementById("contactForm");
    const emailButton = document.querySelector(".email-button");

    if (contactForm && emailButton) {
        emailButton.addEventListener("click", function () {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const data = new FormData(contactForm);
            const name = data.get("name");
            const senderEmail = data.get("email");
            const subject = data.get("subject");
            const message = data.get("message");

            const recipient = contactForm.dataset.recipient;

            if (!recipient || recipient === "YOUR-EMAIL-HERE") {
                alert("Please configure the bakery's recipient email address in contact.html first.");
                return;
            }

            const body =
                "Name: " + name + "\n" +
                "Email: " + senderEmail + "\n\n" +
                "Message:\n" + message;

            const mailto =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mailto;
        });
    }

    // 5. FOOTER YEAR
    document.querySelectorAll(".current-year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

});
