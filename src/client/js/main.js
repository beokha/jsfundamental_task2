"use strict";
import addIsotopeLogic from './isotope';
import db from './firebase';

document.addEventListener('DOMContentLoaded', function () {
    let grid = document.getElementsByClassName('grid')[0];
    // GET and Render all user data
    db.getAllUsersData();

    // SET Handler onClick element
    grid.addEventListener('click', function (e) {
        let src,
            id,
            users;

        e = e || window.e;
        src = e.target;

        if(!src.className.includes('element-item')) {
            return;
        }

        id = +src.dataset.id;
        users = obj.users;
        //for(let i = 0, len = users.length; i < len; i += 1) {
        //    console.log(users[i].id);
        //    if(users[i].id === id) {
         //       console.log("write");
                localStorage.setItem("choosenUser", JSON.stringify(users[id]));
          //  }
        //}

        document.location.href = "./user.html";

        //let choosenUser = JSON.parse(localStorage.choosenUser);
        //console.log(localStorage.choosenUser);
    })
});


let obj = {};
obj.users= [];
obj.render = {};

obj.render.renderIso = function (user, index) {
    //allUsers = db.getAllUsersData();
    //addIsotopeLogic();
    /*setTimeout(function() {
        console.log("timer");
        RenderUserDOM(allUsers);
     }, 1000);*/
	 
    //console.log(index);
    RenderUserDOM(user, index);
    function RenderUserDOM(user, index) {

        let grid = document.getElementsByClassName('grid')[0],
            frag = document.createDocumentFragment();

        //usersArray.forEach((user, index) => {
            let div = document.createElement('div'),
                h3 = document.createElement('h3'),
                node = document.createTextNode(user.first_name + " " + user.last_name);

            div.className = (user.position === "Coder") ? "element-item coder " : "element-item ui ";
            div.setAttribute('data-id', +index);
            h3.className = "name";

            h3.appendChild(node);
            div.appendChild(h3);

            frag.appendChild(div);
        //});

        grid.appendChild(frag);
        addIsotopeLogic.initIsotope();
    }
    obj.users.push(user);
};

export default obj;