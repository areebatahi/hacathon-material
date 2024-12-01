import {
    auth, createUserWithEmailAndPassword, db, setDoc, doc
} from '/firebase.js'

let signup = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpassword = document.getElementById('cpassword').value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let userData = { name, email, password };
    console.log(userData);

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        // console.log(test);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Account created successfully");
                // location.pathname = ''
                // ____________________________________Set Doc
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        ...userData,
                        uId: user.uid,
                    });
                    console.log("Document written with ID: ", user.uid);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    } else {
        alert("Invalid email or Password");
    }
    if (password != cpassword) {
        alert("Passwords should be identical");
    }
}
let signup_btn = document.getElementById('signup_btn');
signup_btn.addEventListener('click', signup)