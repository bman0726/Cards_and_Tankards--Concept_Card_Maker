
const factionLayer=document.getElementById("factionLayer");
const rarityLayer=document.getElementById("rarityLayer");
const typeLayer=document.getElementById("typeLayer");



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

return text.replace(/\*(.*?)\*/g,
"<b><u>$1</u></b>");

}




function updateText(){


manaText.innerHTML=mana.value;

nameText.innerHTML=name.value;

typeText.innerHTML=creatureType.value;


abilityText.innerHTML=formatText(
ability.value
);



attackText.innerHTML=attack.value;

healthText.innerHTML=health.value;

sparkText.innerHTML=sparks.value;


}



document.querySelectorAll("input,textarea")
.forEach(e=>{

e.oninput=updateText;

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
