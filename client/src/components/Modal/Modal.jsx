import React from "react";

import {
    Button,
    Modal,
} from "reactstrap";

class Modals extends React.Component {

    render() {
        return (
            <>
                <Modal
                    className="modal-dialog-centered modal-success"
                    contentClassName="bg-gradient-gray"
                    isOpen={true}
                >
                    <div className="modal-header">
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <h3 className=" mt-4 text-darker display-3">Congratulations <br/><span
                                className="display-2 text-white font-weight-bold"> {this.props.winner}</span> You are
                                the
                                best typist in the world!<br/><span
                                    className="text-white display-3">Get ready to start<br/>Level: {this.props.level}</span>
                            </h3>
                            <h3 className=" mt-4 text-darker display-4">Your Time: {this.props.timeTyping} </h3>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white shadow-lg--hover" color="default" type="button"
                            data-dismiss="modal"
                            href={this.props.myref ? "/multiplayer" : ""}
                            onClick={ this.props.myref ? "" : this.props.togglemodal}
                        >
                            Ok, Sweet!
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }

}

export default Modals;