import React from "react";
const Navbar=()=>{
    return (
<div>
            <nav class="navbar navbar-expand-lg navbar-light shadow">
                <div class="container">
                   
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Service</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>
                           
                        </ul>
                        <a class="navbar-brand fw-bolder fs-4 mx-auto " href="#">Navbar</a>
                        {/* <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                        <button className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                            <i className="fa fa-sign-in me-2"></i>Login</button>
                        <button className="btn btn-outline-primary ms-2 px-4 rounded-pill"> <i className="fa fa-user-plus me-2"></i>Register</button>
                    </div>
                </div>
            </nav>
</div>
    )
}
export default Navbar