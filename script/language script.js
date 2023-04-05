// import {EN,UA} from './info'

//#region language variable handling
let language='EN';
const TEXT = {
    EN:EN,
    UA:EN
}

function changeLanguageTo(newLang='EN'){
    if(language===newLang.toUpperCase()) return;
    // console.log(language,'=>',newLang);

    language=newLang.toUpperCase();
    //TO BE OPTIMIZED:::
        document.getElementById("lang_ua").className=(language==='UA')?"switch s_on":"switch s_off";
        document.getElementById("lang_en").className=(language==='EN')?"switch s_on":"switch s_off";
    //
    applyLanguage();
}


//#endregion


//#region html building functions
function project_tech_stack(array){
    // console.log(array)
    // return String(array);//
    return array.map((item)=>(`${item}`)).join(', ')
}

function projects(){
    const arr=TEXT[language]['projects'];

    return arr.map((item)=>{
        const {title,tech_stack=[],link,screenshot}=item;
        return `
            <div class="i_proj_item"><li><a href="${link}">${title}</a></li></div>
            <div class="i_proj_tech"><b>[</b>${project_tech_stack(tech_stack)}<b>]</b></div>
            `
    }).join('');

}

function educationList(){
 return TEXT.EN.education.map(({location,direction,time_period,location_href,direction_href})=>{
    function ifLinkElement(aClass,link,title){
        if (link) return `<a class="${aClass}" href="${link}">${title}</a>`
        else return `<span class="${aClass}">${title}</span>`
    }
    return `<div class="infob_block">
    <h3>${ifLinkElement("i_company_name",location_href,location)}</h3>
    <h4 >${ifLinkElement('',direction_href,direction)}</h4>
    <h5>${time_period}</h5>
</div>`
 }).join('')
}

function skillList(skillArray){
    return skillArray.map((skill)=>{
        return `<li><span class="sidebar_skill_text">${skill}</span></li>`
    }).join('');
     
}
//#endregion

//#region html set elements by id
function applyLanguage(){
document.getElementById("apply_position").innerText=TEXT[language].position;
document.getElementById("applier_name").innerText=TEXT[language].name;
document.getElementById("description").innerText=TEXT[language].description;
document.getElementById("downloadable_resume").innerText=TEXT.EN["downloadable_resume label"];
document.getElementById("downloadable_resume").href=TEXT.EN["downloadable_resume link"];
document.getElementById("projects_label").innerText=TEXT.EN["projects label"];
document.getElementById("project_list").innerHTML=projects();
document.getElementById("education_label").innerText=TEXT.EN["education label"];
document.getElementById("education").innerHTML=educationList();
// document.getElementById("work_exp_label").innerText=TEXT.EN["work exp label"];
document.getElementById("about_me_label").innerText=TEXT.EN["about myself label"];
document.getElementById("about_me").innerText=TEXT.EN["about myself"];
document.getElementById("contacts_label").innerText=TEXT.EN["contacts label"];
document.getElementById("skills_tech_label").innerText=TEXT.EN["tech skills label"];
document.getElementById("skills_tech").innerHTML=skillList(TEXT.EN["tech skills"]);
document.getElementById("skills_soft_label").innerText=TEXT.EN["soft skills label"];
document.getElementById("skills_soft").innerHTML=skillList(TEXT.EN["soft skills"]);
}
applyLanguage();
//#endregion