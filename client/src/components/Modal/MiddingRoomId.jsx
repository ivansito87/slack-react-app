import React from "react";

import {
		Button,
		Modal,
} from "reactstrap";

class MissingRoomId extends React.Component {

		render() {
				return (
						<>
								<Modal
										className="modal-dialog-centered modal-danger"
										contentClassName="bg-gradient-gray"
										isOpen={true}
								>
										<div className="modal-header">
												<h4 className="modal-title text-uppercase text-dark" id="modal-title-notification">
														Your attention is required
												</h4>
										</div>
										<div className="modal-body">
												<div className="py-3 text-center text-black-50">
														<h4 className="heading mt-4">PLease Enter a Room id provided<br/>OR<br/>Create a New Room</h4>
												</div>
										</div>
										<div className="modal-footer">

												<Button
														className="btn-white" color="default" type="button"
														data-dismiss="modal"
														onClick={this.props.toggleModal}
												>
														Ok, Got it
												</Button>
										</div>
								</Modal>
						</>
				);
		}

}

export default MissingRoomId;


