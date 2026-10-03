
document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const sendButton = document.getElementById("sendButton");


    // ==========================================
    // CHECK FORM
    // ==========================================

    if (!contactForm) {
        console.error("Contact form not found.");
        return;
    }


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!name || !email || !message) {

            formStatus.textContent =
                "Please fill in all fields.";

            return;
        }


        // ==========================================
        // EMAIL VALIDATION
        // ==========================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            formStatus.textContent =
                "Please enter a valid email address.";

            return;
        }


        // ==========================================
        // LOADING
        // ==========================================

        sendButton.disabled = true;

        sendButton.textContent =
            "Sending...";

        formStatus.textContent =
            "Sending your message...";


        try {

            // ==========================================
            // SEND DATA TO EXPRESS SERVER
            // ==========================================

            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );


            // ==========================================
            // GET SERVER RESPONSE
            // ==========================================

            const result = await response.json();


            // ==========================================
            // SUCCESS
            // ==========================================

            if (response.ok && result.success) {

                formStatus.textContent =
                    "✓ Message sent successfully!";

                contactForm.reset();

            }


            // ==========================================
            // SERVER ERROR
            // ==========================================

            else {

                formStatus.textContent =
                    result.message ||
                    "Unable to send your message.";

            }


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            formStatus.textContent =
                "Unable to connect to the server.";

        }


        // ==========================================
        // RESET BUTTON
        // ==========================================

        sendButton.disabled = false;

        sendButton.textContent =
            "Send Message →";

    });

});
