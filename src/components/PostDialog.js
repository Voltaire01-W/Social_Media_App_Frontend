import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import CustomButton from '../util/CustomButton';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';
// Material UI imports
import { 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    TextField,
    CircularProgress,
    Grid,
    Typography 
} from '@material-ui/core';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import { UnfoldMore } from '@material-ui/icons';
// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';


const styles = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PostDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { 
            classes, 
            post: { 
                postId, 
                body, 
                createdAt, 
                likeCount, 
                commentCount, 
                userImage, 
                userHandle}, 
                UI: { 
                    loading }
                } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={4}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography 
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton postId={postId}/>
                    <span>{likeCount} likes</span>
                    <CustomButton tip="comments">
                        <ChatIcon color="primary" />
                    </CustomButton>
                    <span>{commentCount} comments</span>
                </Grid>
            </Grid>
        )
        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
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
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));