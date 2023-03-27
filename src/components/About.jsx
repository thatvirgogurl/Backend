import React from 'react'

export default function About() {
  return (
    <div>
        <section id="about">
            <div className='container my-5 py-5'>
                <div className="row">
                    <div className="col-md-6">
                        <img src='/images/image1.jpg' alt='not loaded' className='w-75 mt-5'></img>
                        </div>
                        <div className='col-md-6'>
                        <h3 className="fs-5 mb-0">About Us</h3>
                        <h1 className='display-6 mb-2'>Who<b>We</b>Are</h1>
                        <hr className='w-50'/>
                        <p className='lead mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et rem voluptatem quas, voluptatibus dolor totam architecto blanditiis quisquam! Fugiat corporis ab quaerat culpa consequuntur. Adipisci ipsam, dicta fugiat harum asperiores necessitatibus, deleniti quae repellendus consectetur aliquid repudiandae a aspernatur at assumenda rerum modi quam commodi delectus! Perspiciatis, architecto veniam!</p>
                        <button className='btn  btn-primary rounded-pill px-4 py-2'>Get Started</button>
                          <button className='btn  btn-outline-primary rounded-pill px-4 py-2 ms-2'>Contact Us</button>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}
