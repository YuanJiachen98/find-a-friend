import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyAgGa4Sad_iX85qVLOLnQdd0XmmeJqUuMc",
    authDomain: "find-a-friend-63bcc.firebaseapp.com",
    databaseURL: "https://find-a-friend-63bcc-default-rtdb.firebaseio.com",
    projectId: "find-a-friend-63bcc",
    storageBucket: "find-a-friend-63bcc.appspot.com",
    messagingSenderId: "574536802814",
    appId: "1:574536802814:web:014e71b08a043d4804e0af",
    measurementId: "G-25D5DTQL97"
};

app.initializeApp(firebaseConfig); //initialize app

class Firebase{
    constructor(){
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();

        

    }
    debugError(error){
        alert(`${error.code} error has occurred - ${error.message}`);

    }

    writeDatabase(root,json) {
        this.database.ref(root).set(json)
            .catch(this.debugError);
    }
    pushDatabase(root, json, callback){
        this.database.ref(root).push(json).then(ref=>callback(ref))
            .catch((error) => {
                this.debugError(error);
            });

    }
    uploadFile(root, filename, data, callback){
        this.storage.ref(`${root}/${filename}`).put(data).then(snapshot=>{
            snapshot.ref.getDownloadURL().then(url=>callback(url));
        });
    }
    readDatabase(root, event, callback){
        this.database.ref(root).on(event, callback);
    }


    onUserActive(callback, fallback =null){
        this.auth.onAuthStateChanged((userInstance) =>{
            if(userInstance != null){
                callback(userInstance.uid);
            }
            else if(fallback != null){
                fallback();
            }

        });
    }

}

export default Firebase;