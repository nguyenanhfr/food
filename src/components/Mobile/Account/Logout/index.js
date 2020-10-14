import React, { Component } from "react";

import { connect } from "react-redux";
import { logoutUser } from "../../../../services/user/actions";
import ConfirmLogout from "./ConfirmLogout";

class Logout extends Component {
	state = {
		confirmLogoutPopupOpen: false,
	};

	openConfirmLogout = () => {
		this.setState({ confirmLogoutPopupOpen: true });
	};

	render() {
		return (
			<React.Fragment>
				<ConfirmLogout
					confirmLogoutOpen={this.state.confirmLogoutPopupOpen}
					handleLogout={() => this.props.logoutUser()}
				/>
				<div className="block-content block-content-full bg-white" onClick={this.openConfirmLogout}>
					<div className="display-flex">
						<div className="flex-auto logout-text">{localStorage.getItem("accountLogout")}</div>
						<div className="flex-auto text-right">
							<i className="si si-power logout-icon" />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = () => ({});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Logout);
