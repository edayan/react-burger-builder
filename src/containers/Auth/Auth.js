import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},

			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: true
	};

	componentDidMount() {
		if (!this.props.buildBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules) {
			if (rules.required) {
				isValid = value.trim() !== '' && isValid;
			}

			if (rules.minLength) {
				isValid = value.length >= rules.minLength && isValid;
			}

			if (rules.maxLength) {
				isValid = value.length <= rules.maxLength && isValid;
			}
		}

		return isValid;
	}

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthModeHandler = event => {
		event.preventDefault();
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp
			};
		});
	};
	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({ id: key, config: this.state.controls[key] });
		}
		let form = formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				changed={event => this.inputChangedHandler(event, formElement.id)}
				touched={formElement.config.touched}
			/>
		));
		if (this.props.loading) {
			form = <Spinner />;
		}
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>Error happened: {this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button type="submit" btnType="Success">
						SUBMIT
					</Button>
					<Button clicked={this.switchAuthModeHandler} btnType="Danger">
						SWITCH TO {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
					</Button>
				</form>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
