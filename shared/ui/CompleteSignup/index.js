import * as React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "../Login/Button";
import * as actions from "./actions";

export class CompleteSignup extends React.Component {
	state = {
		signUpNotComplete: false
	};

	handleClickContinue = async event => {
		event.preventDefault();
		try {
			await this.props.validateSignup();
		} catch (error) {
			if (error === "USER_NOT_ON_TEAM" || error === "NOT_CONFIRMED") {
				this.setState({ signUpNotComplete: true });
			} else this.props.goToLogin();
		}
	};

	handleClickSignin = event => {
		event.preventDefault();
		this.props.goToLogin();
	};

	handleClickSignup = event => {
		event.preventDefault();
		this.props.startSignup();
	};

	render() {
		return (
			<div id="continue-page">
				<form id="continue-form" className="standard-form" onSubmit={this.submitCredentials}>
					<fieldset className="form-body">
						<h2>CodeStream</h2>
						{this.state.signUpNotComplete ? (
							<p>
								Please complete <a onClick={this.handleClickSignup}>Sign Up in your browser</a>{" "}
								before continuing.
							</p>
						) : (
							<FormattedMessage id={"signup.complete.main"}>
								{text => <p>{text}</p>}
							</FormattedMessage>
						)}

						<div id="controls">
							<div className="button-group">
								<Button onClick={this.handleClickContinue} className="control-button">
									<FormattedMessage id="signup.complete.button" />
								</Button>
							</div>
							<div className="footer">
								<p>
									<a onClick={this.handleClickSignin}>Cancel</a>
								</p>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(CompleteSignup);
