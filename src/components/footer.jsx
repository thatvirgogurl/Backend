 
import React from 'react';

export default function Footer() {
    return (
        <div>
            <footer className='footer text-grey'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6 '>
                            <h4 className='text-black'>NewLetter</h4>
                            <p>Subscribe us For Latest Update</p>
                            <div className='form-wrap' id='mc_embed_signup'>
                                <form target='_blank' action='#' method='get' className='form-inline'>
                                    <input className='form-control' type='email' name='email' placeholder='Your email' />
                                    <button className='click-btn btn btn-default'>Subscribe</button>
                                    <div style={{ position: 'absolute', left: '-5000px' }}>
                                        <input name='b_36c4fd991d266f23781ded980_aefe40901a' tabIndex='-1' value='' type='text' />
                                        <div className='info'></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='col-md-3 text-black'>
                            <h4> ABOUT US</h4>
                            <ul className='list-unstyled'>
                                <li><a href='#'>LEADERSHIP</a></li>
                                <li><a href='#'>GALLERY</a></li>
                                <li><a href='#'>BLOGS</a></li>
                                <li><a href='#'> NEWS & EVENT</a></li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h4>PRIVACY & TERMS</h4>
                            <ul className='list-unstyled'>
                                <li><a href='#'>TERMS AND USE</a></li>
                                <li><a href='#'>PRIVACY POLICY</a></li>
                                <li><a href='#'>DISCLAIMER</a></li>
                                <li><a href='#'>CONTACT US</a></li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h4>OUR SOLUTIONS</h4>
                            <ul className='list-unstyled'>
                                <li><a href='#'>ONSITE CLINIC</a></li>
                                <li><a href='#'>PREVENTIVE HEALTH CARE</a></li>
                                <li><a href='#'>WELLNESS PROGRAM</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="footer-bottom">
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} City Guide App-All Rights Reserved
                            </p>
                            <div className='col-lg-4 col-md-12 footer-social'>
                                <a href='#'><i className='fa fa-facebook'></i></a>
                                <a href='#'><i className='fa fa-twitter'></i></a>
                                <a href='#'><i className='fa fa-instagram'></i></a>
                                <a href='#'><i className='fa fa-google-plus'></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
