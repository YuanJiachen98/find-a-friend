import React from "react";
import {Grid, List, ListItem, Box} from "@material-ui/core";
import UserPost from "./UserPost";
import {feedFunctions} from "../../firebase";
class PostList extends React.Component{
    constructor(){
        super();
        this.state={
            feed:[]
            // feed:Array(3).fill({username:'Una', postImage: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=16215260,1320782716&fm=26&gp=0.jpg", postText:'Look!', postDate:'14th April' })
        }
    }
    componentDidMount(){
        if(this.props.type === "feed"){
            setInterval(()=> {
                this.setState({feed : []}, ()=> feedFunctions.fetchFeed(this))
            },1000)
        }else {
            var userData = this.props.userData.val();
            if(userData.posts != null){
                var profilePosts = Object.keys(userData.posts).map((key)=> {
                    var post = {info: userData.posts[key], profile_pic: userData.profile_pic, name: userData.name}
                    return post
                })
                this.setState({feed:profilePosts});
            }
        }
    }


    render(){
        const posts=[{text:"Look!", attachment: 'http://'}];
        return(
            <Box display='flex' justifyContent='center'>
                <List>
                   {this.state.feed.map(post=>{
                       return <ListItem key={post.postText+' '+post.postImage}>
                            {/* <UserPost username={post.username} postText={post.postText}></UserPost>  */}
                           <UserPost username={`${post.name.first} ${post.name.last}`}
                           userAvatar={post.profile_pic}
                           postDate={new Date(post.info.timestamp).toString()}
                           postText={post.info.text}/>
                       </ListItem>
                   })}
                </List>
            </Box>
        )
    }
}
export default PostList;