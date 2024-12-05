import { auth, createUserWithEmailAndPassword, getFirestore, collection, addDoc, db, getDocs } from './firebase.js';

// profile picture js
if (location.pathname == "/") {
    var profliePic = document.getElementById('proflie-pic');
    var inputFile = document.getElementById('input-file');
    inputFile.onchange = () => {
        profliePic.src = URL.createObjectURL(inputFile.files[0])
    }
}

// firease authentication
let create_chat = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let number = document.getElementById('number').value;
    let image = document.getElementById('image');

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let phoneNumberRegex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

    let userData = { email, password, name, number , image};
    console.log(userData);

    if (emailRegex.test(email) && passwordRegex.test(password) && phoneNumberRegex.test(number)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.pathname = "./chat-page.html"

                // ________________________________Add Doc
                try {
                    const docRef = await addDoc(collection(db, "user"), {
                        ...userData,
                        uId: user.uid,
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.code);
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or Password",
            confirmButtonColor: '#068131'
        });
        // if (location.pathname == "/chat-page.html") {
        let chatUl = document.getElementById('chatul');
        chatUl.innerHTML += ` <li class="contact" id="contact">
                    <img src="${doc.data().image}" alt="User">
                    <span>${doc.data().name} <p class="light">${doc.data().number}</p></span>
                </li>`
        // }
    }
}
if (location.pathname == '/') {
    let create_chatBtn = document.getElementById('create_chatBtn');
    create_chatBtn.addEventListener('click', create_chat)
}

//--------------get data----------------
let getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
    });
};
getAllUsers();