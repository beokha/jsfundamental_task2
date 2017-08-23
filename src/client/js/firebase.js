"use strict";
import main from './main';

var firebasedb = (function () {
// Initialize Firebase
    let config = {
        apiKey: "AIzaSyB60d5aUxwewPSWf2JRVMp6nGLBe4oKZYY",
        authDomain: "fundamental-6eccd.firebaseapp.com",
        databaseURL: "https://fundamental-6eccd.firebaseio.com",
        projectId: "fundamental-6eccd",
        storageBucket: "",
        messagingSenderId: "1001524851891"
    };
    firebase.initializeApp(config);

    let obj = {};
    obj.getAllUsersData = function () {
        let result = [],
            isEnded = false;

        firebase.database().ref('users_data/').once('value').then(function (snapshot) {
            let childData,
                index = 0;

            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                main.render.renderIso(childData, index++);
            });

        }).then(result => {
            //console.log("All is good.");
            //return main.render.renderIso;
            //main.render.renderIso(result);
/*            return function () {
                console.log("In firebase function.")
            }*/
        }, error => {
            //console.log("Bad.");
            //return null;
        });

        //return main.render.renderIso;
        /*while(true) {
            if(isEnded)
                break;
        }*/
    };

    return obj;
})();

export default firebasedb;