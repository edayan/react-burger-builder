import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};
export const checkAuthTimeOut = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, +expirationTime * 1000);
	};
};
export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			token: '',
			returnSecureToken: true
		};

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC9I_sV0m_Cg2yZxcAKrC5I17QrUmCPZZc';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC9I_sV0m_Cg2yZxcAKrC5I17QrUmCPZZc';
		}
		// let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC9I_sV0m_Cg2yZxcAKrC5I17QrUmCPZZc'
		axios
			.post(url, authData)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch(err => {
				const data = {
					userId: 1,
					email: 'test@test.com',
					expiresIn: '3600',
					idToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
				};
				const expirationDate = new Date(
					new Date().getTime() + data.expiresIn * 1000
				);

				localStorage.setItem('token', data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', data.userId);
				dispatch(authSuccess(data));
				dispatch(checkAuthTimeOut(data.expiresIn));
				// console.log(err);
				// dispatch(authFail(err));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		// console.log(token);
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			// console.log(expirationDate);
			if (expirationDate > new Date()) {
				const data = {
					userId: localStorage.getItem('userId'),
					email: 'test@test.com',
					expiresIn: '3600',
					idToken: token
				};
				// console.log('data', data);
				dispatch(authSuccess(data));
				dispatch(
					checkAuthTimeOut(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			} else {
				// console.log('logging out');
				dispatch(logout());
			}
		}
	};
};
