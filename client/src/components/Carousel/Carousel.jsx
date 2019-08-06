import React from "react";
// import Typist from "react-typist";


// reactstrap components
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
    {
        src: "https://cdn.dribbble.com/users/17301/screenshots/3564585/late-night-coding.png",
        altText: "",
        caption: "Coding Bootcamp 2019",
        header: "Georgia Tech"
     },
    {
        src: "https://cdn.dribbble.com/users/416610/screenshots/4801105/coding_desk_flat_vector_ui_ux_design_illustration_motion_animation_gif2.gif",
        altText: "",
        caption: "Coding Bootcamp 2019",
        header: "Georgia Tech"
    },
    {
        src: "https://cdn-images-1.medium.com/max/1200/1*1msCRn-wDUzuGtI1yPUbAA.gif\n",
        altText: "",
        caption: "",
        header: ""
    }
];

class Carousel extends React.Component {
    render() {
        return (
            <>
                <section >
                    <div>
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <Container className="py-md">
                        <Row className="justify-content-between align-items-center">
                            <Col className="mb-5 mb-lg-0" lg="5">
                                {/*<Typist cursor={{ show: false }}>
                                    <h1 className="text-white font-weight-light">
                                        Typing Code </h1>
                                    <Typist.Delay ms={500} />
                                    <br />
                                    <p className="lead text-white mt-4">
                                        A basic skill that is often forgotten but nevertheless critical to us as a
                                        Web Developers is the ability to type quick. CodeDuel is here to help you master this skill.</p>
                                </Typist>*/}
                            </Col>
                            <Col className="mb-lg-auto" lg="6">
                                <div className="rounded shadow-lg--hover overflow-hidden transform-perspective-right">
                                    <UncontrolledCarousel items={items} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

export default Carousel;
