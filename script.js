
const factionLayer=document.getElementById("factionLayer");
const rarityLayer=document.getElementById("rarityLayer");
const typeLayer=document.getElementById("typeLayer");
const creatureStats = document.getElementById("creatureStats");
const relicStats = document.getElementById("relicStats");
const subtype = document.getElementById("subtype");
const customSubtypeContainer = document.getElementById("customSubtypeContainer");
const customSubtype = document.getElementById("customSubtype");
const nameInput = document.getElementById("name");
const attributeContainer = document.getElementById("attributeContainer");
const checkboxContainer = document.getElementById("attributeCheckboxes");
const statusCheckboxContainer = document.getElementById("statusCheckboxes");
const statusContainer = document.getElementById("statusContainer");

const keywords = [
    "Activate",
    "Aftermath",
    "Attacking",
    "Blocking",
    "Condition",
    "Deathblow",
    "Devotion",
    "Discarded",
    "Duel",
    "Enhance",
    "Enrage",
    "Entrance",
    "Exhaust",
    "Fetch",
    "Innate",
    "Last Word",
    "Mastery",
    "Mobilize",
    "Outnumbered",
    "Plunder",
    "Prepare",
    "Shift",
    "Amped",
    "Armored",
    "Backlash",
    "Flight",
    "Loophole",
    "Multiblocker",
    "Pacifist",
    "Quickstrike",
    "Ranged",
    "Restless",
    "Stunned",
    "Suppress",
    "Suppressed",
    "Taunt",
    "Unexhaust",
    "Unyielding",
    "Different",
    "Doomed",
    "Sacrificed",
    "Marked",
    "Poison"
];

const attributes = [
    "Amped",
    "Armored",
    "Flight",
    "Restless",
    "Unyielding",
    "Ranged",
    "Quickstrike",
    "Pacifist",
    "Backlash",
    "Taunt",
    "Multiblocker",
    "Loophole",
]
const statuses = [
    "Doomed",
    "Marked",
    "Stunned",
    "Poisoned",
    "Suppressed"
]

const spellAttributes = [
    "Doomed"
];

const subtypeOptions = {

    Creature: [
        "-Generic-",
        "Crusader Creature",
        "Elemental Creature",
        "Mercenary Creature",
        "Ooze Creature",
        "Pirate Creature",
        "Undead Creature",
        "Underling Creature",
        "-Custom-"
    ],

    Spell: [
        "-Generic-",
        "Contract Spell",
        "Enchantment Spell",
        "Ritual Spell",
        "-Custom-"
    ],
   
    Relic: []

};



const factionPaths={

Neutral:"Images/Faction Overlays/Neutral Overlay.png",

AO:"Images/Faction Overlays/AO Overlay.png",

PG:"Images/Faction Overlays/PG Overlay.png",

DM:"Images/Faction Overlays/DM Overlay.png",

WH:"Images/Faction Overlays/WH Overlay.png"

};



const rarityPaths={

Common:"Images/Rarity Overlays/Common Gem Overlay.png",

Uncommon:"Images/Rarity Overlays/Uncommon Gem Overlay.png",

Rare:"Images/Rarity Overlays/Rare Gem Overlay.png",

Legendary:"Images/Rarity Overlays/Legendary Gem Overlay.png"

};



const typePaths={

Creature:"Images/Card Type Overlays/Creature Overlay.png",

Spell:"Images/Card Type Overlays/Spell Overlay.png",

Relic:"Images/Card Type Overlays/Relic Overlay.png"

};



function updateLayers(){


factionLayer.src=factionPaths[faction.value];

rarityLayer.src=rarityPaths[rarity.value];

typeLayer.src=typePaths[cardType.value];

updateText();

}



faction.onchange=updateLayers;

rarity.onchange=updateLayers;

cardType.onchange=updateLayers;



updateLayers();





cardImage.onchange=function(){


let reader=new FileReader();


reader.onload=function(e){

art.src=e.target.result;

}


reader.readAsDataURL(this.files[0]);

};


function fitNameText(){

    nameText.style.fontSize = "23px";

    while(
        nameText.scrollWidth > nameText.clientWidth &&
        parseInt(nameText.style.fontSize) > 10
    ){
        nameText.style.fontSize =
            (parseInt(nameText.style.fontSize) - 1) + "px";
    }

}


function formatText(text){

text = text.replace(
    /\*(.*?)\*/g,
    "<b><u>$1</u></b>"
);

keywords.forEach(keyword => {

    let regex = new RegExp(
        "\\b" + keyword + "\\b",
        "gi"
    );

    text = text.replace(
        regex,
        "<u>" + keyword + "</u>"
    );

});

return text;
}


function updateText(){

abilityCount.innerHTML = ability.value.length + " / 185";

let manaValue = parseInt(mana.value) || 0;

if(manaValue > 99){
    manaValue = 99;
}

if(manaValue < 0){
    manaValue = 0;
}

manaText.innerHTML = manaValue;

nameText.innerHTML=nameInput.value || "Unnamed";
fitNameText();

let selectedSubtype = customSubtype.value || subtype.value;


if(selectedSubtype && selectedSubtype !== "-Generic-"){

    typeText.innerHTML =
    selectedSubtype;

}
else{

    typeText.innerHTML =
    cardType.value;

}


abilityContent.innerHTML=formatText(ability.value);



let attackValue = parseInt(attack.value) || 0;
let healthValue = parseInt(health.value) || 0;
let sparkValue = parseInt(sparks.value) || 0;

if(attackValue > 99){
    attackValue = 99;
}

if(attackValue < 0){
    attackValue = 0;
}    

if(healthValue > 99){
    healthValue = 99;
}

if(healthValue < 0){
    healthValue = 0;
}
    
if(sparkValue > 99){
    sparkValue = 99;
}

if(sparkValue < 0){
    sparkValue = 0;
}
    
attackText.innerHTML = attackValue;
healthText.innerHTML = healthValue;
sparkText.innerHTML = sparkValue;

}


function createAttributeCheckboxes(){

    checkboxContainer.innerHTML = "";

    let type = cardType.value;

    let availableAttributes = [];

    if(type === "Creature"){
        availableAttributes = attributes;
    }

    else if(type === "Spell"){
        availableAttributes = spellAttributes;
    }

    else if(type === "Relic"){
        availableAttributes = [];
    }


    availableAttributes.forEach(attribute=>{

        let label=document.createElement("label");
        let checkbox=document.createElement("input");

        checkbox.type="checkbox";
        checkbox.value=attribute;
        checkbox.dataset.type = "attribute";

        checkbox.onchange=updateIcons;

        label.append(attribute);
        label.appendChild(checkbox);

        checkboxContainer.appendChild(label);

    });

}

function createStatusCheckboxes(){

    statusCheckboxContainer.innerHTML = "";

    let type = cardType.value;

    let availableStatuses = [];

    if(type === "Creature"){
        availableStatuses = statuses;
    }

    else if(type === "Spell"){
        availableStatuses = spellStatuses;
    }

    else if(type === "Relic"){
        availableStatuses = [];
    }


    availableStatuses.forEach(status=>{

        let label=document.createElement("label");
        let checkbox=document.createElement("input");

        checkbox.type="checkbox";
        checkbox.value=status;
        checkbox.dataset.type = "status";

        checkbox.onchange=updateIcons;

        label.append(status);
        label.appendChild(checkbox);

        statusCheckboxContainer.appendChild(label);

    });

}

function downloadCard(){


html2canvas(document.querySelector("#card"))
.then(canvas=>{


let link=document.createElement("a");

link.download="card.png";

link.href=canvas.toDataURL();

link.click();


});


}

function updateIcons(){

    attributeContainer.innerHTML="";

    let selected = document.querySelectorAll(
        "#attributeCheckboxes input:checked, #statusCheckboxes input:checked"
    );

    for(let i = selected.length - 1; i >= 0; i--){

        let img=document.createElement("img");

        let folder = selected[i].parentElement.parentElement.id === "status"
            ? "Statuses"
            : "Attributes";

        img.src =
        "Images/" + folder + "/" +
        selected[i].value +
        ".png";

        img.className = 
            folder === "Statuses" 
            ? "statusIcon" 
            : "attributeIcon";

        attributeContainer.appendChild(img);
    }
}


function updateCardTypeUI(){
    attributeContainer.classList.remove("spellAttributes");

    let type = cardType.value;


    creatureStats.style.display="none";
    relicStats.style.display="none";

    attackText.style.display="none";
    healthText.style.display="none";
    sparkText.style.display="none";


    if(type==="Creature"){
        creatureStats.style.display="block";

        attackText.style.display="flex";
        healthText.style.display="flex";
    }


    if(type==="Relic"){
        relicStats.style.display="block";

        sparkText.style.display="flex";
    }

    if(type==="Spell"){
        attributeContainer.classList.add("spellAttributes");
    }


    subtype.innerHTML="";

    if (subtypeOptions[type] && subtypeOptions[type].length > 0) {
        subtype.style.display = "block";
    }
    else {
        subtype.style.display = "none";
    }


        if(subtypeOptions[type] && subtypeOptions[type].length > 0){

        subtypeOptions[type].forEach(item => {

            let option = document.createElement("option");

            option.value = item;
            option.textContent = item;

            subtype.appendChild(option);

        });

        subtype.selectedIndex = 0;

        customSubtypeContainer.style.display = "none";
        customSubtype.value = "";

    }
    else{

        customSubtypeContainer.style.display = "none";
        customSubtype.value = "";

    }

    updateText();

}



subtype.onchange=function(){

    if(subtype.value==="-Custom-"){

        customSubtypeContainer.style.display="flex";

    }
    else{

        customSubtypeContainer.style.display="none";
        customSubtype.value="";

    }

    updateText();

};

customSubtype.oninput = updateText;

cardType.onchange=function(){

    updateLayers();
    updateCardTypeUI();
    createStatusCheckboxes();
    createAttributeCheckboxes();
    updateIcons();
    updateText();
};


document.querySelectorAll("input,textarea")
.forEach(e=>{

    e.addEventListener("input", updateText);
    e.addEventListener("change", updateText);

});

createStatusCheckboxes();
createAttributeCheckboxes();
updateLayers();
updateCardTypeUI();
updateIcons();
updateText();
