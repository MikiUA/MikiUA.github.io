const supportedLangs = ['EN', 'UA'];
let language, TXT;
changeLanguageFn('EN');

//#region language variable handling
async function loadLanguageData() {
    const filename = `info/${language}.js`
    try {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = filename;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        })
        // TXT = Object.assign({}, lff);
        // const response = await fetch(filename);
        // TXT = await response.json();
        return true;
    } catch (error) {
        console.error(`failed to load ${filename}`, error);
        return false;
    }
};

function updateLangButtons() {
    document.getElementById("lang_change_button").innerHTML = mapToJSX(supportedLangs, (lang) => {
        return `<span class="switch ${lang === language ? 's_on' : 's_off'}" onclick="changeLanguageFn('${lang}')">${lang}</span>`
    })
}

async function changeLanguageFn(newLang = 'EN') {
    newLang = newLang.toUpperCase();
    console.log
    if (language === newLang || !supportedLangs.includes(newLang)) return;

    console.log(language, '=>', newLang);
    language = newLang;

    const data = await loadLanguageData();
    if (!data) return;
    updateLangButtons()
    applyLanguage();
}
//#endregion

//#region apply Language helpers
//#region JSX handling helpers
function mapToJSX(array, func, joinString = '') {
    if (!Array.isArray(array) || array.length === 0 || typeof (func) !== 'function') return '';
    return array.map(item => func(item)).join(joinString);
}
function ifExist(condition, string) {
    return condition ? string : '';
}
//#endregion

function projects(arr) {
    return mapToJSX(arr, (item) => {
        const { title, tech_stack = [], link, codelink, role, responsibilities, screenshot } = item;

        const IconLink = (link, icon) =>
            ifExist(link, `<a href="${link}"><img src="img/${icon}" class="icon i_project_link_icon"></a>`);
        const tech_stack_str = (array = tech_stack) =>
            mapToJSX(array, item => `${item}`, ', ');    //array.map(item => `${item}`).join(', ')

        return `
            <div class="i_proj_item">
                <li><h4>${title} ${IconLink(link, "UI_ico.png")} ${IconLink(codelink, "Code_ico.png")}<h4></li>
            </div>
            <div class="i_proj_tech"><b>[</b>${tech_stack_str(tech_stack)}<b>]</b></div>
            ${ifExist(role, `<div class="i_project_descr">${role}</div>`)}
            ${ifExist(Array.isArray(responsibilities),
            `<ul class="i_project_descr">
                ${mapToJSX(responsibilities, text => `<li>${text}</li>`)}
            </ul>`)}
            `
    });

}

function educationList(arr) {
    return mapToJSX(arr,
        ({ location, direction, time_period, location_href, direction_href }) => {
            function ifLinkElement(aClass, link, title) {
                if (link) return `<a class="${aClass}" href="${link}">${title}</a>`
                else return `<span class="${aClass}">${title}</span>`
            }
            return `<div class="experience_block">
           <h3>${ifLinkElement("i_company_name", location_href, location)}</h3>
           <h5 >${ifLinkElement('', direction_href, direction)}</h5>
           <h5>${time_period}</h5>
       </div>`
        })
}

function workList(arr) {
    const responsibilityList = (array) =>
        mapToJSX(array, item => `<li><span class='info_box_color'>${item}</span></li>`)

    return mapToJSX(arr,
        ({ location, direction, time_period, responsibility_list }) =>
            `<div class="experience_block">
                <h3 class="i_company_name">${direction}</h3>
                <h5>${location} | ${time_period}</h5>
                <ul class='sidebar_skill_list'>${responsibilityList(responsibility_list)}</ul>
            </div>`
    );
}

function skillList(skillArray) {
    return skillArray.map((skill) => {
        return `<li><span class="sidebar_skill_text">${skill}</span></li>`
    }).join('');

}

function InsertIfNotEmpty(title, value, isNotArr) {
    if (!TXT[title]) return '';
    if (!isNotArr && (!Array.isArray(TXT[title]) || TXT[title].length === 0)) return '';

    document.getElementById(title + '_label').innerText = TXT.labels[title];
    document.getElementById(title).innerHTML = value;
}

//#endregion



function applyLanguage() {
    document.getElementById("position").innerText = TXT.position;
    document.getElementById("name").innerText = TXT.name;
    document.getElementById("description").innerText = TXT.description;
    document.getElementById("downloadable_resume").innerText = TXT.labels["downloadable resume"];
    document.getElementById("contacts_label").innerText = TXT.labels["contacts"];
    document.getElementById("skills_tech_label").innerText = TXT.labels["tech skills"];
    document.getElementById("skills_soft_label").innerText = TXT.labels["soft skills"];
    document.getElementById("skills_lang_label").innerText = TXT.labels["lang skills"];

    InsertIfNotEmpty("projects", projects(TXT['projects']));
    InsertIfNotEmpty("education", educationList(TXT['education']));
    InsertIfNotEmpty("work exp", workList(TXT['work exp']));
    InsertIfNotEmpty("about me", TXT["about me"], true);

    document.getElementById("skills_tech").innerHTML = skillList(TXT["tech skills"]);
    document.getElementById("skills_soft").innerHTML = skillList(TXT["soft skills"]);
    document.getElementById("skills_lang").innerHTML = skillList(TXT["lang skills"]);
}