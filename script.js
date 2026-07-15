
const factionLayer=document.getElementById("factionLayer");
const rarityLayer=document.getElementById("rarityLayer");
const typeLayer=document.getElementById("typeLayer");
const creatureStats = document.getElementById("creatureStats");
const relicStats = document.getElementById("relicStats");
const subtype = document.getElementById("subtype");
const customSubtypeContainer = document.getElementById("customSubtypeContainer");
const customSubtype = document.getElementById("customSubtype");

const keywords = [
    "Activate",
    "Aftermath",
    "Condition",
    "Deathblow",
    "Devotion",
    "Discarded",
    "Duel",
    "Enhance",
    "Enrage",
    "Entrance",
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
    "Taunt",
    "Unyielding"
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
        "Custom"
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


manaText.innerHTML=mana.value;

nameText.innerHTML=name.value || "Unnamed";

let selectedSubtype = customSubtype.value || subtype.value;


if(selectedSubtype && selectedSubtype !== "-Generic-"){

    typeText.innerHTML =
    selectedSubtype;

}
else{

    typeText.innerHTML =
    cardType.value;

}


abilityText.innerHTML=formatText(
ability.value
);



attackText.innerHTML=attack.value;

healthText.innerHTML=health.value;

sparkText.innerHTML=sparks.value;


}



document.querySelectorAll("input,textarea")
.forEach(e=>{

    e.addEventListener("input", updateText);
    e.addEventListener("change", updateText);

});






function downloadCard(){


html2canvas(document.querySelector("#card"))
.then(canvas=>{


let link=document.createElement("a");

link.download="card.png";

link.href=canvas.toDataURL();

link.click();


});


}



// Dynamic fields


function updateCardTypeUI(){

    let type = cardType.value;


    creatureStats.style.display="none";
    relicStats.style.display="none";


    if(type==="Creature"){
        creatureStats.style.display="block";
    }


    if(type==="Relic"){
        relicStats.style.display="block";
    }


    subtype.innerHTML="";


    if(subtypeOptions[type] && subtypeOptions[type].length > 0){

        subtypeOptions[type].forEach(item=>{

            let option=document.createElement("option");

            option.value=item;
            option.textContent=item;

            subtype.appendChild(option);

        });

    }

}



subtype.onchange=function(){

    if(subtype.value==="Custom"){

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
    updateText();

};


updateLayers();
updateCardTypeUI();
updateText();
