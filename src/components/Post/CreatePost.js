import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Utilities
import CustomButton from '../../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import { 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    TextField,
    CircularProgress 
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginBottom: 20
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        marginLeft: 'auto',
        postion: 'absolute',
        top: '56px',
        right: '15px'
    }
})

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            body: '',
            errors: {}
        };
    };
    
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
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

    handleOpen = () => {
        this.setState({ open: true })
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createPost({ body: this.state.body });
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <CustomButton 
                    onClick={this.handleOpen} 
                    tip="Create a Post!">
                    <AddIcon />
                </CustomButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <CustomButton 
                            tip="Close" 
                            onClick={this.handleClose} 
                            tipClassName={classes.closeButton}>
                                <CloseIcon />
                        </CustomButton>
                        <DialogTitle>Create a new Post</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="body"
                                    type="text"
                                    label="Post"
                                    multiline
                                    rows="3"
                                    placeholder="What's on your mind?"
                                    error={errors === null ? null : errors.body ? true : false}
                                    helperText={errors === null ? null : errors.body}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        color="primary"
                                        className={classes.submitButton} 
                                        disabled={loading}>
                                            Submit
                                            {loading && (
                                                <CircularProgress 
                                                size={30} 
                                                className={classes.progressSpinner}/>
                                            )}
                                        </Button>
                            </form>
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { createPost, clearErrors })(withStyles(styles)(CreatePost))

