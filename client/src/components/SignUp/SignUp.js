import React from 'react'
import "./SignUp.css"

export function SignUp(props) {


    return (
        <body>
            <div className="container">
                <section id="content">
                    <form action="">
                        <h1>SignUp</h1>
                        <div>
                            <input type="text" placeholder="Username" required="" id="username" />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" required="" id="password" />
                        </div>
                        <div>
                            <input type="password" placeholder="Forgot Password" required="" id="password" />
                        </div>
                        <div>
                            <input type="text" placeholder="Email" required="" id="email" />
                        </div>
                        <div>
                            <input type="submit" value="Registrat" />
                            <a href="#">Login</a>
                        </div>
                    </form>
                </section>
            </div>
        </body>
    )
}
