import React from 'react'

export default function Home() {
  return (
    <div>
        <section id="home">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                          <h1 className="display-4 fw-bolder mb-4 text-center text-white">Presenting Activ Health Platinum-Enhanced Plan</h1>
                          <p className="lead text-center fs-4 mb-5 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quidem sint. Nihil, vitae. Ipsam iusto saepe veritatis ex distinctio est doloremque culpa id illo cumque eos dolores, reprehenderit excepturi nulla!</p>
                          <div className='buttons d-flex  justify-content-center'>
                            <button className='btn btn-light me-4 rounded-pill px-4 py-2'>Get Quote</button>
                              <button className='btn btn-outline-light  rounded-pill px-4 py-2'>Our Service</button>
                          </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
