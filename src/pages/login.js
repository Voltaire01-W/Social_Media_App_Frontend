import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/phoenix.png';
import { Link } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.spreadThis
  })

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    static getDerivedStateFromProps(nextProps, state){
        if (nextProps.UI.errors !== state.errors) {
            return { errors: nextProps.UI.errors };
        } else {
            return null;
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }
    handleChange = (event) => {
        this.props.clearErrors();
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="firebird" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle} >
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={errors === null ? null : errors.email}
                            error={errors === null ? null : errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors === null ? null : errors.password}
                            error={errors === null ? null : errors.password ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        {errors === null ? null : errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Dont have an account? Sign up <Link onClick={this.handleChange} to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
