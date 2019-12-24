import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import AuxHoc from '../AuxHoc/AuxHoc';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      //or in constructor
      axios.interceptors.request.use(req => {
        this.setState({ error: null }); //clear the error on request
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <AuxHoc>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </AuxHoc>
      );
    }
  };
};

export default withErrorHandler;
