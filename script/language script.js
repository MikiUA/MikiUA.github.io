// import {EN,UA} from './info'

//#region language variable handling
let language = 'EN';
const TEXT = {
    EN: EN,
    UA: UA
}

function changeLanguageTo(newLang = 'EN') {
    if (language === newLang.toUpperCase()) return;
    console.log(language, '=>', newLang);

    language = newLang.toUpperCase();
    //TO BE OPTIMIZED:::
    document.getElementById("lang_ua").className = (language === 'UA') ? "switch s_on" : "switch s_off";
    document.getElementById("lang_en").className = (language === 'EN') ? "switch s_on" : "switch s_off";
    //
    applyLanguage();
}


//#endregion


//#region html building functions
function ifExist(condition, string) {
    return condition ? string : '';
}

function project_tech_stack(array) {
    // console.log(array)
    // return String(array);//
    return array.map((item) => (`${item}`)).join(', ')
}

function projects() {
    const arr = TEXT[language]['projects'];

    return arr.map((item) => {
        const { title, tech_stack = [], link, codelink, role, responsibilities, screenshot } = item;

        function IconLink(link, icon) {
            return ifExist(link, `<a href="${link}"><img src="img/${icon}" class="icon i_project_link_icon"></a>`);
        }
        return `
            <div class="i_proj_item">
                <li><h4>${title} ${IconLink(link, "UI_ico.png")} ${IconLink(codelink, "Code_ico.png")}<h4></li>
            </div>
            <div class="i_proj_tech"><b>[</b>${project_tech_stack(tech_stack)}<b>]</b></div>
            ${ifExist(role, `<div class="i_project_descr">${role}</div>`)}
            ${ifExist(responsibilities, `<ul class="i_project_descr">
            ${responsibilities ? responsibilities.map((text) => (`
                <li>${text}</li>
            `)).join('') : ''}</ul>`)}
            `
    }).join('');

}

function educationList() {
    return TEXT[language].education.map(({ location, direction, time_period, location_href, direction_href }) => {
        function ifLinkElement(aClass, link, title) {
            if (link) return `<a class="${aClass}" href="${link}">${title}</a>`
            else return `<span class="${aClass}">${title}</span>`
        }
        return `<div class="experience_block">
       <h3>${ifLinkElement("i_company_name", location_href, location)}</h3>
       <h5 >${ifLinkElement('', direction_href, direction)}</h5>
       <h5>${time_period}</h5>
   </div>`
    }).join('')
}

function workList() {
    function responsibilityList(array) {
        return array.map((item) => `<li><span class='info_box_color'>${item}</span></li>`).join('')
    }
    return TEXT[language]["work exp"].map(({ location, direction, time_period, responsibility_list }) => {

        return `<div class="experience_block">
       <h3 class="i_company_name">${direction}</h3>
       <h5>${location} | ${time_period}</h5>
       <ul class='sidebar_skill_list'>${responsibilityList(responsibility_list)}</ul>
   </div>`
    }).join('')
}

function skillList(skillArray) {
    return skillArray.map((skill) => {
        return `<li><span class="sidebar_skill_text">${skill}</span></li>`
    }).join('');

}
//#endregion

//#region html set elements by id
function applyLanguage() {
    document.getElementById("apply_position").innerText = TEXT[language].position;
    document.getElementById("applier_name").innerText = TEXT[language].name;
    document.getElementById("description").innerText = TEXT[language].description;
    document.getElementById("downloadable_resume").innerText = TEXT[language]["downloadable_resume label"];
    document.getElementById("downloadable_resume").href = TEXT[language]["downloadable_resume link"];
    document.getElementById("projects_label").innerText = TEXT[language]["projects label"];
    document.getElementById("project_list").innerHTML = projects();
    document.getElementById("education_label").innerText = TEXT[language]["education label"];
    document.getElementById("education").innerHTML = educationList();
    document.getElementById("work_exp_label").innerText = TEXT[language]["work exp label"];
    document.getElementById("work_exp").innerHTML = workList();
    document.getElementById("about_me_label").innerText = TEXT[language]["about myself label"];
    document.getElementById("about_me").innerText = TEXT[language]["about myself"];
    document.getElementById("contacts_label").innerText = TEXT[language]["contacts label"];
    document.getElementById("skills_tech_label").innerText = TEXT[language]["tech skills label"];
    document.getElementById("skills_tech").innerHTML = skillList(TEXT[language]["tech skills"]);
    document.getElementById("skills_soft_label").innerText = TEXT[language]["soft skills label"];
    document.getElementById("skills_soft").innerHTML = skillList(TEXT[language]["soft skills"]);
    document.getElementById("skills_lang_label").innerText = TEXT[language]["lang skills label"];
    document.getElementById("skills_lang").innerHTML = skillList(TEXT[language]["lang skills"]);
}
applyLanguage();
//#endregion