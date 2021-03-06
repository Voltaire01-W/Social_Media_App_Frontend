import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import CreatePost from '../Post/CreatePost';
import Notifications from './Notifications';

// Utilities
import CustomButton from '../../util/CustomButton';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';


class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <CreatePost />
                            <Link to='/'>
                                <CustomButton tip="Home">
                                    <HomeIcon color="primary"/>
                                </CustomButton>
                            </Link>
                                <Notifications color="primary"/>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to='/login'>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to='/'>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to='/signup'>
                                Signup
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
};

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
