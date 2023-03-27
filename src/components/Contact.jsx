import React from 'react'
import { useState } from 'react'

export default function Contact() {
    const [msg, setMsg] = useState({
        name: "",
        email: "",
        phNum: "",
        message: ""
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setMsg(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, phNum, message } = msg;

        try {
            const res = await fetch('/message', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phNum, message })
            });

            if (res.status === 400 || !res) {
                window.alert('Message not sent')
            } else {
                window.alert('Message sent');
                setMsg({
                    name: '',
                    email: '',
                    phNum: '',
                    message: ''
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <section id="contact">
                <div className="container my-5 py-5">
                    <div className="row mb-5">
                        <div className="col-12">
                            <h3 className="fs-5 text-center mb-0">Contact Us</h3>
                            <h1 className="display-6 text-center mb-4">Have Some<b>Question?</b>Services</h1>
                            <hr className='w-25 mx-auto' />
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <img src="/images/contact.jpg" alt="contact" className='w-75' />
                            </div>
                            <div className='col-md-6'>
                                <form onSubmit={handleSubmit} method='POST'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="department" className="form-label">Department</label>
                                            <select className="form-control" id="department" required>
                                                <option value="">Choose Department</option>
                                                <option value="1">Department 1</option>
                                                <option value="2">Department 2</option>
                                                <option value="3">Department 3</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="datetime" className="form-label">Date and Time</label>
                                            <input type="datetime-local" className="form-control" id="datetime" required />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-shadow">
                                        <label htmlFor="name" className="form-label">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Your Name"
                                            name='name' value={msg.name} onChange={handleInput}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 form-shadow">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="name@example.com"
                                            name='email' value={msg.email} onChange={handleInput}
                                            required
                                        />
                                    </div>

                                  <div className="mb-3 form-shadow">
                                      <label htmlFor="exampleInputNumber1" className="form-label">
                                          Phone Number
                                      </label>
                                      <input
                                          type="tel"
                                          className="form-control"
                                          id="exampleInputNumber1"
                                          placeholder="+91 675489021"
                                          name='phNum' value={msg.phNum} onChange={handleInput}
                                      />
                                  </div>

                                  <div className="mb-3 form-shadow">
                                      <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                          Your Message
                                      </label>
                                      <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="3"
                                          placeholder="Enter your Message"
                                          name='message' value={msg.message} onChange={handleInput}
                                      ></textarea>
                                  </div>

                                  <button type="submit" className="btn btn-outline-primary">
                                      Send Message <i className="fa fa-paper-plane ms-2 "></i>
                                  </button>
                              </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
