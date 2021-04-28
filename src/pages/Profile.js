import React from "react";
import NavBar from "./components/NavBar/NavBar.js";
import authFunctions from "../firebase/authFunctions.js";
import profileFunctions from "../firebase/profileFunctions.js";
import {Redirect} from "react-router-dom";
import {
    Avatar,
    Grid,
    Dialog,
    DialogTitle,
    Button
} from "@material-ui/core";
import PostList from "./components/PostList.js";
class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            signout: false,
            dialogOpen: false,
            canFollow: false
        }
        this.handleSignOut = this.handleSignOut.bind(this);
        this.onClose = this.onClose.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleAttach = this.handleAttach.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidMount(){
        profileFunctions.fetchUserData(this, this.props.match.params.uid);

        authFunctions.onUserActive((uid)=> {
            profileFunctions.readDatabase(`${uid}/following`, "value" ,(snapshot)=>{
                const sameUser = uid == this.props.match.params.uid;
                const alreadyFollowing = this.props.match.params.uid in snapshot.val();
                this.setState({canFollow: !sameUser && !alreadyFollowing});


            })
        })

    }

	handleSignOut(){
		authFunctions.logOut(()=>{
			this.setState({signout:true});
		})

	}
    onClose() {
        this.setState({dialogOpen: false});
    }
    openDialog(){
        this.setState({dialogOpen: true});
    }
    handleAttach(event) {
        this.setState({attachment: event.target.files[0]});
    }

    handleSubmit(){
        profileFunctions.updateProfilePic(this.state.attachment);
        this.onClose();
    }
    handleFollow(){
        profileFunctions.followUser(this.props.match.params.uid);
    }


    render(){
        if(this.state.signout){
            return <Redirect to="/login"/>
        }
        if(this.state.user == null){
            return <div></div>;
        }
        var name = this.state.user.val().name.first + " " + this.state.user.val().name.last

        var followButton = <div></div>;
        if(this.state.canFollow) {
           followButton = <Button onClick={this.handleFollow}>Follow</Button>
        }


        return(
            <div>
                <NavBar signout = {this.handleSignOut}></NavBar>
                <Grid align="center">
                    <Avatar alt="Profile Photo" src={this.state.user.val().profile_pic} onClick={this.openDialog}/>
                    <h1>{name}</h1>
                    {followButton}
                    <Dialog onClose ={this.onClose} open={this.state.dialogOpen}>
                        <DialogTitle>Update Profile Photo</DialogTitle>
                        <input type = "file" onChange ={this.handleAttach}></input>
                        <Button onClick={this.handleSubmit}>Update</Button>
                    </Dialog>
                    <PostList type="profile" userData ={this.state.user}/>



                </Grid>


            </div>
        )
    }
}
export default Profile;