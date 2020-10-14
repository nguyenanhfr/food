import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

class CustomCssProvider extends Component {
	render() {
		return (
			<React.Fragment>
				{localStorage.getItem("customCSS") !== null && (
					<Helmet>
						<style type="text/css">{localStorage.getItem("customCSS")}</style>
					</Helmet>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	settings: state.settings.settings,
});

export default connect(
	mapStateToProps,
	{}
)(CustomCssProvider);
