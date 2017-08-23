"use strict";
import addIsotopeLogic from './isotope';
import db from './firebase';


(function () {
    let grid = document.getElementsByClassName('grid')[0],
        allUsers = db.getAllUsersData();


    setTimeout(function() {
        RenderUserDOM(allUsers);
     }, 1000);

    function RenderUserDOM(usersArray) {

        let grid = document.getElementsByClassName('grid')[0],
            frag = document.createDocumentFragment();

        usersArray.forEach((user, index) => {
            let div = document.createElement('div'),
                h3 = document.createElement('h3'),
                node = document.createTextNode(user.first_name + " " + user.last_name);

            let left = ++index * 130;
            div.className = (user.position === "Coder") ? "element-item coder " : "element-item ui ";
            //div.style = "position: absolute; left: " + left + " px; top: 0px;"
            h3.className = "name";

            h3.appendChild(node);
            div.appendChild(h3);

            frag.appendChild(div);
        });

        grid.appendChild(frag);
        addIsotopeLogic.initIsotope();
    }
})();