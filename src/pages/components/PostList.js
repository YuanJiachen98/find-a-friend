import React from "react";
import {Grid, List, ListItem, Box} from "@material-ui/core";
import UserPost from "./UserPost";

class PostList extends React.Component{
    constructor(){
        super();
        this.state={
            feed:Array(3).fill({username:'Una', postImage: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=16215260,1320782716&fm=26&gp=0.jpg", postText:'Look!', postDate:'14th April' })
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
                           <UserPost {...post}/>
                       </ListItem>
                   })}
                </List>
            </Box>
        )
    }
}
export default PostList;