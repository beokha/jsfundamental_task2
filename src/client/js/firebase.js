"use strict";

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
            let childData;

            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                result.push(childData);
            });

        })//.then(function() {
         //   return result;
       // });

        /*while(true) {
            if(isEnded)
                break;
        }*/
        return result;
    };

    return obj;
})();

export default firebasedb;