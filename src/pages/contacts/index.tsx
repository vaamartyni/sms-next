// app/contacts/not-found.tsx
import styles from "./page.module.scss";

export default function ContactsPage() {
    const googleMapsUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094317!2d144.955651315504!3d-37.81731344202116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727baf44a7b71d!2sVictoria%20Market%2C%20Melbourne!5e0!3m2!1sen!2sau!4v1620604965892!5m2!1sen!2sau"; // Example URL, replace with your Google Maps URL.

    return (
        <div className={styles.container}>
            {/* Left Side: Contact Information */}
            <div className={styles.contact}>
                <h2 className={styles.title}>Contact Us</h2>
                <p>
                    <strong>Phone:</strong> +1-234-567-890
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@company.com">info@company.com</a>
                </p>
                <p>
                    <strong>WhatsApp:</strong> +1-234-567-890
                </p>
                <p>
                    <strong>Company Number:</strong> 123-456-789
                </p>
            </div>

            {/* Right Side: Google Maps */}
            <div className={styles.map}>
                <iframe
                    src={googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}
