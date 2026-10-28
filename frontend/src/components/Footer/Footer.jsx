import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="left-content">
                    <img src={assets.logo} alt="" />
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/" target='_blank'>
                            <img src={assets.facebook_icon} />
                        </a>
                        <a href="https://www.twitter.com/" target='_blank'>
                            <img src={assets.twitter_icon} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/" target='_blank'>
                            <img src={assets.linkedin_icon} alt="" />
                        </a>
                    </div>
                </div>

                <div className="center-content">
                    <h2 className='footer-heading'>COMPANY</h2>
                    <ul className='list'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="right-content">
                    <h2 className='footer-heading'>GET IN TOUCH</h2>
                    <ul className='list'>
                        <li>+1-123-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>

            <hr />

            <p className="copyright">
                Copyright 2026 &copy; Tomato.com - All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer