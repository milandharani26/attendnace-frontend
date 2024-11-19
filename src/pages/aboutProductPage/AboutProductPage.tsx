// import { CheckCircle, Clock, Lock, Smartphone, Users, UserCheck } from "lucide-react";
// import ButtonCustom from "../../components/button/Button";
// import { Card, CardContent, CardHeader } from "@mui/material";
// import './aboutProductPage.scss'

// const AboutProductPage = () => {
//     return (
//         <div className="container">
//             <header className="header">
//                 <a className="logo" href="#">
//                     <UserCheck className="icon" />
//                     <span className="sr-only">AI Face Attendance</span>
//                 </a>
//                 <nav className="nav">
//                     <a className="nav-item" href="#features">Features</a>
//                     <a className="nav-item" href="#how-it-works">How It Works</a>
//                     <a className="nav-item" href="#benefits">Benefits</a>
//                 </nav>
//             </header>
//             <main>
//                 <section className="hero">
//                     <div className="container">
//                         <div className="hero-content">
//                             <h1 className="hero-title">AI-Powered Face Attendance System</h1>
//                             <p className="hero-description">
//                                 Revolutionize your attendance tracking with our cutting-edge facial recognition technology.
//                                 Accurate, efficient, and secure.
//                             </p>
//                             <div className="ButtonCustoms">
//                                 <ButtonCustom>Get Started</ButtonCustom>
//                                 <ButtonCustom variant="outline">Learn More</ButtonCustom>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <section id="features" className="features">
//                     <div className="container">
//                         <h2 className="section-title">Key Features</h2>
//                         <div className="features-grid">
//                             <Card>
//                                 <CardHeader>
//                                     Facial Recognition
//                                 </CardHeader>
//                                 <CardContent>Advanced AI algorithms for accurate face detection and matching.</CardContent>
//                             </Card>
//                             <Card>
//                                 <CardHeader>
//                                     Real-time Tracking
//                                 </CardHeader>
//                                 <CardContent>Instant attendance logging as employees enter or exit.</CardContent>
//                             </Card>
//                             <Card>
//                                 <CardHeader>
//                                     Cloud Integration
//                                 </CardHeader>
//                                 <CardContent>Secure cloud storage for attendance data with easy access.</CardContent>
//                             </Card>
//                             <Card>
//                                 <CardHeader>
//                                     Mobile App
//                                 </CardHeader>
//                                 <CardContent>Manage attendance on-the-go with our user-friendly mobile application.</CardContent>
//                             </Card>
//                             <Card>
//                                 <CardHeader>
//                                     Customizable Reports
//                                 </CardHeader>
//                                 <CardContent>Generate detailed attendance reports tailored to your needs.</CardContent>
//                             </Card>
//                             <Card>
//                                 <CardHeader>
//                                     Multi-location Support
//                                 </CardHeader>
//                                 <CardContent>Ideal for businesses with multiple offices or branches.</CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </section>
//                 <section id="how-it-works" className="how-it-works">
//                     <div className="container">
//                         <h2 className="section-title">How It Works</h2>
//                         <div className="how-it-works-grid">
//                             <div className="how-it-works-item">
//                                 <div className="icon-wrapper">
//                                     <UserCheck className="icon" />
//                                 </div>
//                                 <h3 className="how-it-works-title">Face Detection</h3>
//                                 <p className="how-it-works-description">Our system detects and analyzes facial features as employees approach.</p>
//                             </div>
//                             <div className="how-it-works-item">
//                                 <div className="icon-wrapper">
//                                     <CheckCircle className="icon" />
//                                 </div>
//                                 <h3 className="how-it-works-title">Matching & Verification</h3>
//                                 <p className="how-it-works-description">Detected faces are matched against the employee database for verification.</p>
//                             </div>
//                             <div className="how-it-works-item">
//                                 <div className="icon-wrapper">
//                                     <Clock className="icon" />
//                                 </div>
//                                 <h3 className="how-it-works-title">Attendance Logging</h3>
//                                 <p className="how-it-works-description">Upon successful matching, attendance is logged with precise timestamp.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <section id="benefits" className="benefits">
//                     <div className="container">
//                         <h2 className="section-title">Benefits for Your Business</h2>
//                         <div className="benefits-grid">
//                             <div className="benefit-item">
//                                 <Clock className="icon" />
//                                 <div className="benefit-item-details">
//                                     <h3 className="benefit-title">Time Savings</h3>
//                                     <p className="benefit-description">Eliminate manual attendance tracking and save valuable time for your HR team.</p>
//                                 </div>
//                             </div>
//                             <div className="benefit-item">
//                                 <Lock className="icon" />
//                                 <div className="benefit-item-details">
//                                     <h3 className="benefit-title">Enhanced Security</h3>
//                                     <p className="benefit-description">Prevent buddy punching and ensure only authorized personnel can access your premises.</p>
//                                 </div>
//                             </div>
//                             <div className="benefit-item">
//                                 <Smartphone className="icon" />
//                                 <div className="benefit-item-details">
//                                     <h3 className="benefit-title">Remote Management</h3>
//                                     <p className="benefit-description">Access attendance data and manage your workforce from anywhere, anytime.</p>
//                                 </div>
//                             </div>
//                             <div className="benefit-item">
//                                 <Users className="icon" />
//                                 <div className="benefit-item-details">
//                                     <h3 className="benefit-title">Improved Compliance</h3>
//                                     <p className="benefit-description">Ensure accurate time tracking for better compliance with labor laws and regulations.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <section className="cta">
//                     <div className="container">
//                         <div className="cta-content">
//                             <h2 className="cta-title">Ready to Modernize Your Attendance System?</h2>
//                             <p className="cta-description">Join the growing number of businesses benefiting from our AI-powered face attendance solution.</p>
//                             <ButtonCustom size="lg">Get Started Today</ButtonCustom>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <footer className="footer">
//                 <p className="footer-text">© 2024 AI Face Attendance. All rights reserved.</p>
//                 <nav className="footer-nav">
//                     <a className="footer-nav-item" href="#">Terms of Service</a>
//                     <a className="footer-nav-item" href="#">Privacy</a>
//                 </nav>
//             </footer>
//         </div>
//     );
// };

// export default AboutProductPage;



// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader,  } from "@/components/ui/card"
import { CheckCircle, Clock, Lock, Smartphone, Users, UserCheck } from "lucide-react"
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material"
import './aboutProductPage.scss'

export default function AboutProductPage() {
    return (
        <div className="container">
            <header className="header">
                <a className="header__link" href="#">
                    <UserCheck className="header__icon" />
                    <span className="sr-only">AI Face Attendance</span>
                </a>
                <nav className="nav">
                    <a className="nav__link" href="#features">Features</a>
                    <a className="nav__link" href="#how-it-works">How It Works</a>
                    <a className="nav__link" href="#benefits">Benefits</a>
                </nav>
            </header>

            <main className="main">
                <section className="hero">
                    <div className="hero__container">
                        <div className="hero__content">
                            <Typography className="hero__title" variant="h2" sx={{ fontWeight: "800" }}>AI-Powered Face Attendance System</Typography>
                            <p className="hero__description">
                                Revolutionize your attendance tracking with our cutting-edge facial recognition technology.
                                Accurate, efficient, and secure.
                            </p>
                            <div className="hero__buttons">
                                <Button>Get Started</Button>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <div className="features__container">
                        <Typography className="features__title" variant="h3" sx={{ fontWeight: "700", marginBottom: "30px" }}>Key Features</Typography>
                        <div className="features__grid">
                            <Card>
                                <CardHeader>
                                    <>Facial Recognition</>
                                </CardHeader>
                                <CardContent>Advanced AI algorithms for accurate face detection and matching.</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <>Real-time Tracking</>
                                </CardHeader>
                                <CardContent>Instant attendance logging as employees enter or exit.</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <>Cloud Integration</>
                                </CardHeader>
                                <CardContent>Secure cloud storage for attendance data with easy access.</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <>Mobile App</>
                                </CardHeader>
                                <CardContent>Manage attendance on-the-go with our user-friendly mobile application.</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <>Customizable Reports</>
                                </CardHeader>
                                <CardContent>Generate detailed attendance reports tailored to your needs.</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <>Multi-location Support</>
                                </CardHeader>
                                <CardContent>Ideal for businesses with multiple offices or branches.</CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="how-it-works">
                    <div className="how-it-works__container">
                        <Typography className="how-it-works__title" variant="h3" sx={{ fontWeight: "700", marginBottom: "30px" }}>How It Works</Typography>
                        <div className="how-it-works__grid">
                            <div className="how-it-works__item">
                                <div className="icon-container">
                                    <UserCheck className="how-it-works__icon" />
                                </div>
                                <h3 className="how-it-works__subtitle">Face Detection</h3>
                                <p className="how-it-works__description">Our system detects and analyzes facial features as employees approach.</p>
                            </div>
                            <div className="how-it-works__item">
                                <div className="icon-container">
                                    <CheckCircle className="how-it-works__icon" />
                                </div>
                                <h3 className="how-it-works__subtitle">Matching & Verification</h3>
                                <p className="how-it-works__description">Detected faces are matched against the employee database for verification.</p>
                            </div>
                            <div className="how-it-works__item">
                                <div className="icon-container">
                                    <Clock className="how-it-works__icon" />
                                </div>
                                <h3 className="how-it-works__subtitle">Attendance Logging</h3>
                                <p className="how-it-works__description">Upon successful matching, attendance is logged with precise timestamp.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="benefits">
                    <div className="benefits__container">
                        <h2 className="benefits__title">Benefits for Your Business</h2>
                        <div className="benefits__grid">
                            <div className="benefits__item">
                                <Clock className="benefits__icon" />
                                <div>
                                    <h3 className="benefits__subtitle">Time Savings</h3>
                                    <p className="benefits__description">Eliminate manual attendance tracking and save valuable time for your HR team.</p>
                                </div>
                            </div>
                            <div className="benefits__item">
                                <Lock className="benefits__icon" />
                                <div>
                                    <h3 className="benefits__subtitle">Enhanced Security</h3>
                                    <p className="benefits__description">Prevent buddy punching and ensure only authorized personnel can access your premises.</p>
                                </div>
                            </div>
                            <div className="benefits__item">
                                <Smartphone className="benefits__icon" />
                                <div>
                                    <h3 className="benefits__subtitle">Remote Management</h3>
                                    <p className="benefits__description">Access attendance data and manage your workforce from anywhere, anytime.</p>
                                </div>
                            </div>
                            <div className="benefits__item">
                                <Users className="benefits__icon" />
                                <div>
                                    <h3 className="benefits__subtitle">Improved Compliance</h3>
                                    <p className="benefits__description">Ensure accurate time tracking for better compliance with labor laws and regulations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta__container">
                        <div className="cta__content">
                            <h2 className="cta__title">Ready to Modernize Your Attendance System?</h2>
                            <p className="cta__description">Join the growing number of businesses benefiting from our AI-powered face attendance solution.</p>
                            <Button size="lg">Get Started Today</Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p className="footer__text">© 2024 AI Face Attendance. All rights reserved.</p>
                <nav className="footer__nav">
                    <a className="footer__link" href="#">Terms of Service</a>
                    <a className="footer__link" href="#">Privacy</a>
                </nav>
            </footer>
        </div>
    )
}

