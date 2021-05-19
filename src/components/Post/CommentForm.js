import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis
})

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            body: '',
            errors: {}
        };
    };

    static getDerivedStateFromProps(nextProps, state){
        if (nextProps.UI.errors !== state.errors) {
            return { errors: nextProps.UI.errors };
        } 
        if(!nextProps.UI.errors && !nextProps.UI.loading 
            !== state.errors && state.loading) {
            return { body: '', open: false, errors: {} }
        } else {
            return null;
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.postId, { body: this.state.body })
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on post"
                        error={errors === null ? null : errors.comment ? true : false}
                        helperText={errors === null ? null : errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            >
                                Submit
                            </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null
        return commentFormMarkup;
    }
};

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment})(withStyles(styles)(CommentForm));
