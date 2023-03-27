import React from 'react'

export default function Contact() {
  return (
    <div>
        <selection id="contact">
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
                            <img src="/images/contact.jpg" alt="contact" className='w-75'/>
                        </div>
                        <div className='col-md-6'>
                              <form action="">
                                  <div class="row">
                                      <div class="col-md-6">
                                          <label for="department" class="form-label">Department</label>
                                          <select class="form-control" id="department" required>
                                              <option value="">Choose Department</option>
                                              <option value="1">Department 1</option>
                                              <option value="2">Department 2</option>
                                              <option value="3">Department 3</option>
                                          </select>
                                      </div>
                                      <div class="col-md-6">
                                          <label for="datetime" class="form-label">Date and Time</label>
                                          <input type="datetime-local" class="form-control" id="datetime" required/>
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
                                      />
                                  </div>

                                  <div className="mb-3 form-shadow">
                                      <label htmlFor="exampleInputNumber1" className="form-label">
                                          Phone Number
                                      </label>
                                      <input
                                          type="password"
                                          className="form-control"
                                          id="exampleInputNumber1"
                                          placeholder="+91 675489021"
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
        </selection>
    </div>
  )
}
