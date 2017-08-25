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
    obj.alreadyLoadedCountOfUsers = 0;

    obj.getFiveFirstUsersData = function (countOfUserLoadAtFirstTime) {
        let result = [],
            isEnded = false;

        firebase.database().ref('users_data/').limitToFirst(countOfUserLoadAtFirstTime).once('value').then(function (snapshot) {
            let childData,
                index = 0;

            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                main.render.renderIso(childData, index++);
            });

        }).then(() => {
            obj.alreadyLoadedCountOfUsers = countOfUserLoadAtFirstTime;
        });

    };

    obj.loadMoreUsers = function (coutOfLoading) {

        firebase.database().ref('users_data/').orderByKey()
            .startAt(String(obj.alreadyLoadedCountOfUsers)).endAt(String(obj.alreadyLoadedCountOfUsers + coutOfLoading - 1))
            .once('value').then(function (snapshot) {
                let childData,
                    index = obj.alreadyLoadedCountOfUsers;

                if(snapshot.numChildren() == "0") {
                    let btn_load_more = document.querySelector('.load_more_users');
                    btn_load_more.innerHTML = "All data was loaded.";
                    btn_load_more.classList.add('disable');
                    btn_load_more.setAttribute('disabled', 'disabled');
                }
                snapshot.forEach(function(childSnapshot) {
                    childData = childSnapshot.val();
                    main.render.renderIso(childData, index++);
                });

        }).then(() => {
            obj.alreadyLoadedCountOfUsers += coutOfLoading;
        });
    }
    
    obj.addNewUserSkill = function (userId, skills) {
        firebase.database().ref('users_data/' + userId + "/user_data/skills/").set(skills);
    }

    return obj;
})();

export default firebasedb;