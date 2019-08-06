import React from "react";

// reactstrap components
import {Col, Row, UncontrolledAlert} from "reactstrap";

class Alerts extends React.Component {
		render() {
				return (
						<>
								<div>
								<Row>
										<Col lg="12" md="12" sm="12">
								<UncontrolledAlert color="danger" fade={true}>
                    <span className="alert-inner--icon">
                    </span>
										<span className="alert-inner--text ml-1  text-white text-monospace text-uppercase">
                         <strong>Plaese enter room Id provided or create a new room to share</strong>
                         </span>
								</UncontrolledAlert>
										</Col>
								</Row>
								</div>
						</>
				);
		}
}

export default Alerts;
