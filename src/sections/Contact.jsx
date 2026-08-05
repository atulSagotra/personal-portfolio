import React, { useState } from "react";
import axios from "axios";
import keys from "../emailKeys";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, message: "" });

    const data = {
      service_id: keys.SERVICE_ID,
      template_id: keys.TEMPLATE_ID,
      user_id: keys.PUBLIC_KEY,
      template_params: {
        ...formData,
      },
    };

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send/", data)
      .then((response) => {
        setStatus({
          submitting: false,
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", phone_number: "", message: "" });
      })
      .catch((error) => {
        setStatus({
          submitting: false,
          success: false,
          message: error.message || "Failed to send message. Please try again later.",
        });
      });
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="contact-container">
        <div className="contact-info glass-card">
          <h3 className="info-title">Contact Channels</h3>
          <p className="info-subtitle">
            Let's build something amazing together! Reach out to discuss new opportunities or just to say hello.
          </p>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon"><FaEnvelope /></span>
              <div className="info-text">
                <span className="info-label">Email</span>
                <a href="mailto:atulsagotra10@gmail.com" className="info-value">atulsagotra10@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><FaPhoneAlt /></span>
              <div className="info-text">
                <span className="info-label">Phone</span>
                <span className="info-value">+91-XXXXXXXXXX (available on request)</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><FaMapMarkerAlt /></span>
              <div className="info-text">
                <span className="info-label">Location</span>
                <span className="info-value">Jammu & Kashmir, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper glass-card">
          <form className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_number" className="form-label">Phone Number</label>
                <input
                  required
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                required
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Atul, I'd love to chat about..."
                rows="4"
                className="form-textarea"
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-status ${status.success ? "success" : "error"}`}>
                {status.success ? <FaCheckCircle /> : <FaExclamationCircle />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className="btn btn-primary btn-submit"
            >
              {status.submitting ? "Sending..." : (
                <>
                  Send Message <FaPaperPlane style={{ marginLeft: "8px" }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
