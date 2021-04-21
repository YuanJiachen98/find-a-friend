import Firebase from './firebase';

class ProfileFunctions extends Firebase {
    fetchUserData(component, uid) {
        this.readDatabase(uid, "value", (snapshot) =>{
            component.setState({user: snapshot});
        });
    }

    postOnTimeline(text, attachment){
        //0.make the basic post
        //1.upload the image
        //2. set the post with the image url
        const uploadPost = (uid)=>{
            this.pushDatabase(`${uid}/posts`, {text, attachment: null, timestamp: Date.now()},
            postRef=>{
                uploadAttachment(uid, postRef);
            })
            
        }
        const uploadAttachment = (uid, postRef)=>{
            if(!attachment)
                return;
            this.uploadFile(uid, postRef.key, attachment, url=>{
                this.writeDatabase(`${uid}/posts/${postRef.key}/attachment`,url);
            })
        }
        this.onUserActive(uploadPost);
    }
    followUser(target_uid){
        const follow = (uid)=>{
            this.writeDatabase(`${uid}/following/${target_uid}`,0)
        }
        this.onUserActive(follow)
    }
    updateProfilePic(file){
        const upload = (uid)=>{
            this.uploadFile(`${uid}`, "profile_pic",file, (url)=>{
                this.writeDatabase(`${uid}/profile_pic`, url)
            })
        }
        this.onUserActive(upload)
    }
}

const profileFunctions = new ProfileFunctions();
export default profileFunctions;