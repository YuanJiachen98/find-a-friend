import Firebase from './firebase';

class AuthFunctions extends Firebase {
	signUp(firstname, lastname, email, pwd){
		//create a user on firebase
		this.auth.createUserWithEmailAndPassword(email, pwd)
			.then((userCred) => { //callback function
				// write the user's information into the database
				this.writeDatabase(userCred.user.uid, {
					name: {
						first: firstname,
						last: lastname
					},
					email:email,
					profile_pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619235648&t=3ef401591ae5bd6d4ca7dbdcedd30f24.jpg",
					posts:{},
					following: {
						[userCred.user.uid]: 0
					}

				});
// write the user's information into the database
			}) 
			.catch(this.debugError);
		


		

	}
	logIn(email, pwd) {
		//Log the user in to the firebase
		//catch ant errors thrown
		this.auth.signInWithEmailAndPassword(email, pwd)
			.catch(this.debugError);
	}

}

const authFunctions = new AuthFunctions();
export default authFunctions;