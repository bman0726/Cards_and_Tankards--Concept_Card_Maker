
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
const imageStatus = document.getElementById("imageStatus");

/* Explicit DOM references to avoid relying on implicit globals */
const faction = document.getElementById("faction");
const rarity = document.getElementById("rarity");
const cardType = document.getElementById("cardType");
const cardImage = document.getElementById("cardImage");
const art = document.getElementById("art");
const mana = document.getElementById("mana");
const manaText = document.getElementById("manaText");
const ability = document.getElementById("ability");
const abilityCount = document.getElementById("abilityCount");
const attack = document.getElementById("attack");
const health = document.getElementById("health");
const sparks = document.getElementById("sparks");
const nameText = document.getElementById("nameText");
const typeText = document.getElementById("typeText");
const abilityContent = document.getElementById("abilityContent");
const attackText = document.getElementById("attackText");
const healthText = document.getElementById("healthText");
const sparkText = document.getElementById("sparkText");

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
    "Mark",
    "Marked",
    "Poison",
    "Blocked",
    "Acumen",
    "Banished",
    "Wounded",
    "Primary Faction Zone",
    "Secondary Faction Zone"
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

const spellStatuses = [
    "Doomed"
]

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




let currentImage = "";

cardImage.onchange = function () {

    if(!this.files || !this.files[0]) return;

    let reader = new FileReader();

    reader.onload = function(e){

        currentImage = e.target.result;
        art.src = currentImage;

        imageStatus.innerHTML = "Image loaded";
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

    console.log("Export clicked");

    html2canvas(document.querySelector("#card"))
    .then(canvas=>{

        console.log("Canvas created");

        let link=document.createElement("a");

        link.download="card.png";
        link.href=canvas.toDataURL();

        link.click();

    })
    .catch(error=>{
        console.log("Export error:", error);
    });

}

function saveCard(){

    console.log("here is the name");
    console.log(nameInput.value);

    const card = {

        name: nameInput.value,
        mana: mana.value,
        faction: faction.value,
        rarity: rarity.value,
        type: cardType.value,
        subtype: subtype.value,
        customSubtype: customSubtype.value,

        attack: attack.value,
        health: health.value,
        sparks: sparks.value,

        ability: ability.value,

        image: currentImage,

        attributes: Array.from(
            document.querySelectorAll("#attributeCheckboxes input:checked")
        ).map(box => box.value),

        statuses: Array.from(
            document.querySelectorAll("#statusCheckboxes input:checked")
        ).map(box => box.value)

    };

    console.log(JSON.stringify(card, null, 2));

    const blob = new Blob(
        [JSON.stringify(card, null, 2)],
        {type:"application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = (card.name || "Card") + ".ctcard";

    link.click();
}

function loadCard(event) {
    console.log("Open Card Button Selected");

    let file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = function(e) {
        let data = JSON.parse(e.target.result);
        console.log(data);

        // Text fields
        mana.value = data.mana;
        nameInput.value = data.name;
        ability.value = data.ability;

        // Dropdowns
        faction.value = data.faction;
        rarity.value = data.rarity;
        cardType.value = data.type;

        updateCardTypeUI();

        subtype.value = data.subtype || "";

        if (data.customSubtype) {
            customSubtype.value = data.customSubtype;
            customSubtypeContainer.style.display = "flex";
        }

        // Stats
        attack.value = data.attack;
        health.value = data.health;
        sparks.value = data.sparks;

        // Image
        if (data.image) {
            currentImage = data.image;
            art.src = data.image;
            imageStatus.innerHTML = "Image loaded";
        }

        // Update everything
        updateLayers();
        createStatusCheckboxes();
        createAttributeCheckboxes();
        document.querySelectorAll("#attributeCheckboxes input").forEach(box => {
            if (data.attributes && data.attributes.includes(box.value)) {
                box.checked = true;
            }
        });

        document.querySelectorAll("#statusCheckboxes input").forEach(box => {
            if (data.statuses && data.statuses.includes(box.value)) {
                box.checked = true;
            }
        });

        updateText();
        updateIcons();
    };

    reader.readAsText(file);
}


function updateIcons(){

    attributeContainer.innerHTML="";

    let selected = document.querySelectorAll(
        "#attributeCheckboxes input:checked, #statusCheckboxes input:checked"
    );

    for(let i = selected.length - 1; i >= 0; i--){

        let img=document.createElement("img");

        // Status icon files are stored in Images/Attributes; use that folder for both
        let folder = "Attributes";

        img.src = `Images/${folder}/${selected[i].value}.png`;

        img.className = selected[i].dataset.type === "status" ? "statusIcon" : "attributeIcon";

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

function resetCard(){
    if(!confirm("Are you sure you want to reset the card? All unsaved changes will be lost!")){
        return;
    }

    document.querySelectorAll("input, textarea").forEach(input=>{
        if(input.type==="checkbox"){
            input.checked=false;
        }
        else if(input.type==="file"){
            input.value="";
        }        
        else{
            input.value="";
        }
    });

    faction.value="Neutral";
    rarity.value="Common";
    cardType.value="Creature";

    art.src = "Images/Placeholder Image.png";

    updateLayers();
    updateCardTypeUI();

    createAttributeCheckboxes();
    createStatusCheckboxes();

    updateIcons();
    updateText();
}

document.getElementById("loadCard").onchange = loadCard;

createStatusCheckboxes();
createAttributeCheckboxes();
updateLayers();
updateCardTypeUI();
updateIcons();
updateText();
