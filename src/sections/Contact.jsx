"use client";

import React, { useState } from "react";
import axios from "axios";
import keys from "../emailKeys";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Magnetic from "../components/Magnetic";

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
      <h2 className="section-title">Contact // Communication Link</h2>
      
      <div className="asymmetric-grid contact-container" style={{ marginTop: "3.5rem" }}>
        
        {/* Left Column: Coordinates / Channels */}
        <div className="glass-card" style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          {/* Tech Corners */}
          <div className="grid-corner corner-tl"></div>
          <div className="grid-corner corner-tr"></div>
          <div className="grid-corner corner-bl"></div>
          <div className="grid-corner corner-br"></div>

          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "750", fontFamily: "var(--font-mono)", color: "var(--fg-color)", marginBottom: "1rem" }}>
              // CHANNELS_COORDINATES
            </h3>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "3rem" }}>
              Have an idea, project, or open role? Reach out directly and let's engineer something premium.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
              
              {/* Channel 1 */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--primary-glow)",
                  color: "var(--primary-color)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  border: "1px solid rgba(99, 102, 241, 0.15)"
                }}>
                  <FaEnvelope />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.68rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</span>
                  <a href="mailto:atulsagotra774@gmail.com" className="inline-link" style={{ fontSize: "1rem", fontWeight: 700 }}>atulsagotra774@gmail.com</a>
                </div>
              </div>

              {/* Channel 2 */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--primary-glow)",
                  color: "var(--primary-color)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  border: "1px solid rgba(99, 102, 241, 0.15)"
                }}>
                  <FaMapMarkerAlt />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.68rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Location</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--fg-color)" }}>Brampton, Ontario, Canada</span>
                </div>
              </div>

            </div>
          </div>

          <div style={{ marginTop: "3.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.04)", paddingTop: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
              <span className="status-indicator"></span>
              STATUS: OPEN TO CONTRACTS & FULL-TIME
            </span>
          </div>

        </div>

        {/* Right Column: Mini Form */}
        <div className="glass-card" style={{ padding: "3rem 2.5rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          {/* Tech Corners */}
          <div className="grid-corner corner-tl"></div>
          <div className="grid-corner corner-tr"></div>
          <div className="grid-corner corner-bl"></div>
          <div className="grid-corner corner-br"></div>

          <form className="contact-form" onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              <label htmlFor="name" className="form-label">Full Name</label>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div className="form-group">
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
                <label htmlFor="email" className="form-label">Email Address</label>
              </div>

              <div className="form-group">
                <input
                  required
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  placeholder=" "
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="form-input"
                />
                <label htmlFor="phone_number" className="form-label">Phone Number</label>
              </div>
            </div>

            <div className="form-group">
              <textarea
                required
                id="message"
                name="message"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="form-textarea"
                style={{ resize: "none" }}
              ></textarea>
              <label htmlFor="message" className="form-label">Message details</label>
            </div>

            {status.message && (
              <div className={`form-status ${status.success ? "success" : "error"}`}>
                {status.success ? <FaCheckCircle /> : <FaExclamationCircle />}
                <span style={{ fontSize: "0.85rem" }}>{status.message}</span>
              </div>
            )}

            <Magnetic scale={0.15}>
              <button
                type="submit"
                disabled={status.submitting}
                className="btn btn-primary btn-submit interactive-node"
                style={{ width: "auto" }}
              >
                {status.submitting ? "Sending..." : (
                  <>
                    Send Coordinates <FaPaperPlane style={{ marginLeft: "8px" }} />
                  </>
                )}
              </button>
            </Magnetic>
          </form>
        </div>

      </div>
    </section>
  );
}
