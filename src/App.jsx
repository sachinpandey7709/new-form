/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Swal from 'sweetalert2';

function App() {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Adding the required access key for API
        formData.append("access_key", "dd27f20d-751e-4900-b1d4-1cc64219be19");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const res = await response.json();

            if (res.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: res.message || "Something went wrong. Please try again.",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "An error occurred while sending the message.",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <section className="contact">
                <h2>Contact Me!</h2>

                <form onSubmit={onSubmit}>
                    <div className="input-box">
                        <div className="input-field field">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="item"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="input-field field">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="item"
                                autoComplete="off"
                                required
                                title="Please enter a valid email"
                            />
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="input-field field">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                className="item"
                                autoComplete="off"
                                required
                                pattern="^[0-9]{10}$"
                                title="Please enter a valid 10-digit phone number"
                            />
                        </div>

                        <div className="input-field field">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                className="item"
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>

                    <div className="textarea-field field">
                        <textarea
                            name="message"
                            cols="30"
                            rows="10"
                            placeholder="Your Message"
                            className="item"
                            autoComplete="off"
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Send Message!</button>
                </form>
            </section>
        </div>
    );
}

export default App;