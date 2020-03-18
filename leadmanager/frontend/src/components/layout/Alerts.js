import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.name)
                alert.error("Name cannot be left blank!!");
            else if (error.msg.email)
                alert.error(`Email: ${error.msg.email.join()}`)
        }
        if (error !== prevProps.message) {
            if (message.leadDeleted)
                alert.success(message.leadDeleted);
            if (message.leadCreated)
                alert.success(message.leadCreated);
        }
    }
    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));