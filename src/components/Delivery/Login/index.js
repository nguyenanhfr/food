import React, { Component } from "react";

import Meta from "../../helpers/meta";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getSettings } from "../../../services/settings/actions";
import { loginDeliveryUser } from "../../../services/Delivery/user/actions";
import { getAllLanguages } from "../../../services/languages/actions";
import { getSingleLanguageData } from "../../../services/languages/actions";
import Loading from "../../helpers/loading";

class Login extends Component {
	state = {
		loading: false,
		email: "",
		password: "",
		error: false,
	};
	static contextTypes = {
		router: () => null,
	};
	componentDidMount() {
		this.props.getSettings();

		// setTimeout(() => {
		// 	this.setState({ error: false });
		// }, 380);

		this.props.getAllLanguages();
	}

	handleOnChange = (event) => {
		// console.log(event.target.value);
		this.props.getSingleLanguageData(event.target.value);
		localStorage.setItem("userPreferedLanguage", event.target.value);
	};

	handleInputEmail = (event) => {
		this.setState({ email: event.target.value });
	};
	handleInputPassword = (event) => {
		this.setState({ password: event.target.value });
	};

	handleLogin = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		this.props.loginDeliveryUser(this.state.email, this.state.password);
	};

	componentWillReceiveProps(nextProps) {
		const { delivery_user } = this.props;
		if (delivery_user !== nextProps.delivery_user) {
			this.setState({ loading: false });
			if (nextProps.delivery_user.success === false) {
				this.setState({ error: true });
			}
		}
		if (nextProps.delivery_user.success) {
			// this.context.router.push("/delivery");
		}

		if (this.props.languages !== nextProps.languages) {
			if (localStorage.getItem("userPreferedLanguage")) {
				this.props.getSingleLanguageData(localStorage.getItem("userPreferedLanguage"));
			} else {
				if (nextProps.languages.length) {
					// console.log("NEXT", nextProps.languages);
					const id = nextProps.languages.filter((lang) => lang.is_default === 1)[0].id;
					this.props.getSingleLanguageData(id);
				}
			}
		}
	}

	render() {
		if (window.innerWidth > 768) {
			return <Redirect to="/" />;
		}
		const { delivery_user } = this.props;
		if (delivery_user.success) {
			return (
				//redirect to account page
				<Redirect to={"/delivery"} />
			);
		}

		return (
			<React.Fragment>
				<Meta
					seotitle="Login"
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={localStorage.getItem("seoOgTitle")}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={localStorage.getItem("seoTwitterTitle")}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>
				{this.state.error && (
					<div className="auth-error">
						<div className="error-shake">{localStorage.getItem("emailPassDonotMatch")}</div>
					</div>
				)}
				{this.state.loading && <Loading />}
				<div style={{ backgroundColor: "#f2f4f9" }}>
					<div className="input-group">
						<div className="input-group-prepend">
							<div style={{ height: "3.5rem" }} />
						</div>
					</div>
					<img
						src="/assets/img/login-header.png"
						className="login-image pull-right mr-15"
						alt="login-header"
					/>
					<div className="login-texts px-15 mt-50 pb-20">
						<span className="login-title">{localStorage.getItem("loginLoginTitle")}</span>
						<br />
						<span className="login-subtitle">{localStorage.getItem("loginLoginSubTitle")}</span>
					</div>
				</div>
				<div className="height-70 bg-white">
					<form onSubmit={this.handleLogin}>
						<div className="form-group px-15 pt-30">
							<label className="col-12 edit-address-input-label">
								{localStorage.getItem("loginLoginEmailLabel")}
							</label>
							<div className="col-md-9 pb-5">
								<input
									type="text"
									name="email"
									onChange={this.handleInputEmail}
									className="form-control edit-address-input"
								/>
							</div>
							<label className="col-12 edit-address-input-label">
								{localStorage.getItem("loginLoginPasswordLabel")}
							</label>
							<div className="col-md-9">
								<input
									type="password"
									name="password"
									onChange={this.handleInputPassword}
									className="form-control edit-address-input"
								/>
							</div>
						</div>
						<div className="mt-20 px-15 pt-15 button-block">
							<button
								type="submit"
								className="btn btn-main"
								style={{ backgroundColor: localStorage.getItem("storeColor") }}
							>
								{localStorage.getItem("loginLoginTitle")}
							</button>
						</div>
					</form>

					{this.props.languages && this.props.languages.length > 1 && (
						<div className="mt-100 d-flex align-items-center justify-content-center">
							<div className="mr-2">{localStorage.getItem("changeLanguageText")}</div>
							<select
								onChange={this.handleOnChange}
								defaultValue={
									localStorage.getItem("userPreferedLanguage")
										? localStorage.getItem("userPreferedLanguage")
										: this.props.languages.filter((lang) => lang.is_default === 1)[0].id
								}
								className="form-control language-select"
							>
								{this.props.languages.map((language) => (
									<option value={language.id} key={language.id}>
										{language.language_name}
									</option>
								))}
							</select>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	delivery_user: state.delivery_user.delivery_user,
	languages: state.languages.languages,
	language: state.languages.language,
});

export default connect(
	mapStateToProps,
	{ loginDeliveryUser, getSettings, getAllLanguages, getSingleLanguageData }
)(Login);
