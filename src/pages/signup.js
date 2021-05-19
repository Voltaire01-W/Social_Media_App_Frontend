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
import { signupUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis
  })

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
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
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
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
                        Signup
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
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField} 
                            helperText={errors === null ? null : errors.confirmPassword}
                            error={errors === null ? null : errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            className={classes.textField} 
                            helperText={errors === null ? null : errors.handle}
                            error={errors === null ? null : errors.handle ? true : false}
                            value={this.state.handle} 
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
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Already have an account? Login <Link onClick={this.handleChange} to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser, clearErrors })(withStyles(styles)(signup));
