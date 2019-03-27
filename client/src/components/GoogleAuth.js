import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '1026764604256-vbuebuvshs95m4e3sfjdob0ei4vsc5ki.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
                //console.log(this.auth)
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onSignedInClick = () => {
		this.auth.signIn(this.auth.currentUser.get().getId());
	}

	onSignedOutClick = () => {
		this.auth.signOut();	
	}

	renderAuthButton() {
        if(this.props.isSignedIn) {
			return (
				<button onClick={this.onSignedOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else if(this.props.isSignedIn === null) {
			return null;
		} else {
			return (
				<button onClick={this.onSignedInClick} className="ui red google button">
					<i className="google icon" />
					Sign In
				</button>
			)
		}
	}

	onAuthChange = (isSignedIn) => {
		if(isSignedIn) {
			this.props.signIn();
		} else {
			this.props.signOut();
		}
	}

	render() {
		return (
			<div>{this.renderAuthButton()}</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, 
	{ signIn, signOut }
)(GoogleAuth);