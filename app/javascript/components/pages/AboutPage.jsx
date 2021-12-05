import React from 'react';
import leadershipmember_1 from 'images/leadershipmember_1.jpg';
import leadershipmember_2 from 'images/leadershipmember_2.jpg';
import leadershipmember_3 from 'images/leadershipmember_3.jpg';

const AboutPage = (props) => {

    const AboutHeader = {
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif"
    }

    return (
        <>
            <div style={AboutHeader}>
                <h1>About Page</h1>
            </div>

            <div className="about-wrapper">

                <h4>About Us</h4>
                <p>SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <br></br><br></br>
                
                <h4>Leadership</h4>

                <h5>Bob</h5>
                <img alt="leadershipmember_1" className="photoStyle" src={leadershipmember_1} />
                <p>SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <br></br><br></br>

                <h5>Joe</h5>
                <img alt="leadershipmember_2" className="photoStyle" src={leadershipmember_2} />
                <p>SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <br></br><br></br>

                <h5>Sue</h5>
                <img alt="leadershipmember_3" className="photoStyle" src={leadershipmember_3} />
                <p>SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <br></br><br></br>

            </div>
        </>
    );
}

export default AboutPage;