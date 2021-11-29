import React from 'react';
import HeroImage from 'images/iStock-1161561165.jpg';
import Carousel from 'react-material-ui-carousel'
import { Button, Typography, Paper } from '@mui/material';
import { Link } from "react-router-dom";

function Item(props)
{
    return (
        <Paper elevation={6}>            
            <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className='overlay'>
                        <img src={props.item.image} />
                    </div>
                    
                    <div className='shading overlay'></div>
                    
                    <div className='text'>
                        <Typography variant="h1">
                            {props.item.name}
                        </Typography>
                        
                        <Typography variant="h4">
                            {props.item.description}
                        </Typography>

                        <Button
                            variant="contained" 
                            color="secondary"
                            component={Link} 
                            to={String('/'+ props.item.link)} 
                            onClick={ () => {console.log(String('/'+ props.item.link), "button clicked.")} }
                        >
                            {props.item.button}
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

const HomePage = (props) => {

    var CarouselItems = [
        {
            name: "1000 Hours Meditated Total",
            description: "# of people expected at next session",
            button: "See Events",
            link: "events",
            image: HeroImage
        },
        {
            name: "About SKY@TAMU",
            description: "Learn all about SKY@TAMU",
            button: "Learn More",
            link: "members",
            image: HeroImage
        },
        {
            name: "User Testimonials",
            description: "View community testimonials",
            button: "See Testimonials",
            link: "home",
            image: HeroImage
        }
    ]

    return (
        <>
            <div draggable="false" className="carousel-swipe" style={{backgroundColor: "#c8a2c8ff"}}>
                <Carousel
                    swipe = {true}
                    autoPlay = {false}
                    interval = {false}
                    animation = {"slide"}
                    navButtonsAlwaysVisible = {true}
                    next={ (next, active) => { console.log(`we left ${active}, and are now at ${next}`); } }
                    prev={ (prev, active) => { console.log(`we left ${active}, and are now at ${prev}`); } } 

                >
                    { CarouselItems.map( (item, i) => <Item key={i} item={item} /> ) }
                </Carousel>
            </div>
            
            {/* <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className={'overlay'}>
                        <img src={HeroImage} />
                    </div>
                    <div className={'shading overlay'}>
                    </div>
                    <div className={'text'}>
                        <Typography variant="h1">
                            1000 Hours Meditated Total
                        </Typography>
                        <Button variant="contained" color="secondary" component={Link} to={'/events'}>See Events</Button>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default HomePage;