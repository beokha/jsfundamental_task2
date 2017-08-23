"use strict";
import db from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {


    let skills_block = document.getElementsByClassName('skills_block')[0],
        skill_frag = document.createDocumentFragment(),
        educations_block = document.getElementsByClassName('educations_block')[0],
        educations_frag = document.createDocumentFragment(),
        // Data
        chosenUser = JSON.parse(localStorage.chosenUserLS),
        user_data = chosenUser.user_data,
        skills = user_data.skills,
        educations = user_data.education;

    // Change page title
    document.title = chosenUser.first_name + " " + chosenUser.last_name + " page";

    // Add user's skills
    skills.forEach((skill, index) => {

        let div = document.createElement('div'),
            p = document.createElement('p'),
            node = document.createTextNode(skill.skill);

        div.setAttribute("data-skill-id", index.toString());
        div.className = 'skills_block__skill';
        div.style.width = skill.level + "%";

        p.appendChild(node);
        div.appendChild(p);
        skill_frag.appendChild(div);
    });
    skills_block.appendChild(skill_frag);

    // Sort education by year
    educations = educations.sort(function (a, b) {
        return a.date - b.date;
    })
    // Add user's education
    educations.forEach((education) => {

        let education_div = document.createElement('div'),
            left_education_block= document.createElement('div'),
            leb_p = document.createElement('p'),
            leb_p_node = document.createTextNode(education.date),
            right_education_block = document.createElement('article'),
            reb_header = document.createElement('header'),
            reb_header_node = document.createTextNode(education.title),
            reb_p = document.createElement('p'),
            reb_p_node = document.createTextNode(education.someText);


        education_div.className = "education";

        // Left
        left_education_block.className = "left_education_block";
        leb_p.appendChild(leb_p_node);
        left_education_block.appendChild(leb_p);

        // Right
        right_education_block.className = "right_education_block";
        // Add header
        reb_header.className = "right_education_block__header"
        reb_header.appendChild(reb_header_node);
        right_education_block.appendChild(reb_header);
        // Add text
        reb_p.appendChild(reb_p_node);
        right_education_block.appendChild(reb_p);

        education_div.appendChild(left_education_block);
        education_div.appendChild(right_education_block);
        educations_frag.appendChild(education_div);
    });
    educations_block.appendChild(educations_frag);
});

/*
    Summary:
        Add new skills
 */
(function () {
    let button_add_skill = document.getElementsByClassName('button_add_skill')[0],
        input_skill_name = document.getElementsByName('skill_name')[0],
        input_skill_range = document.getElementsByName('skill_range')[0],
        chosenUserID = localStorage.chosenUserIdLS,
        skills = JSON.parse(localStorage.chosenUserLS).user_data.skills;

    button_add_skill.addEventListener('click', clicked_button_add_skill);
    function clicked_button_add_skill() {
        const maxCharacters = 100,
            maxSkillLevel = 100;

        let skill_name = input_skill_name.value,
            skill_level = input_skill_range.value;

        // Delete prev error, if need
        if(input_skill_name.classList.contains("error")) {
            input_skill_name.classList.remove("error");
        }
        if(input_skill_range.classList.contains("error")) {
            input_skill_range.classList.remove("error");
        }
        // CHECK: For error
        if(skill_name.length > maxCharacters) {
            input_skill_name.setAttribute("class", "error");
            input_skill_name.focus();
            input_skill_name.value = null;
            return alert("Skill name shouldn't be more than 100 characters.")
        }
        if(skill_level > maxSkillLevel) {
            input_skill_range.setAttribute("class", "error");
            input_skill_range.focus();
            input_skill_range.value = null;
            return alert("Skill level shouldn't be more than 100%.")
        }

        // Bad practice: need to receive one obj, not a full array of objects
        skills.push({
            skill: skill_name,
            level: skill_level
        });
        db.addNewUserSkill(chosenUserID, skills);

        // TODO: Get response from db that all is OK and execute the next code
        Temp(skill_name, skill_level);
        function Temp(skill_name, skill_level) {
            input_skill_name.value = null;
            input_skill_range.value = null;

            let div = document.createElement('div'),
                p = document.createElement('p'),
                node = document.createTextNode(skill_name);

            div.className = 'skills_block__skill';
            div.style.width = skill_level + "%";

            p.appendChild(node);
            div.appendChild(p);
            document.getElementsByClassName('skills_block')[0].appendChild(div);
        }

    }
})();