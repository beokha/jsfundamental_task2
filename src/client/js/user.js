document.addEventListener('DOMContentLoaded', function() {


    let skills_block = document.getElementsByClassName('skills_block')[0],
        skill_frag = document.createDocumentFragment(),
        educations_block = document.getElementsByClassName('educations_block')[0],
        educations_frag = document.createDocumentFragment(),
        // Data
        chosenUser = JSON.parse(localStorage.choosenUser),
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