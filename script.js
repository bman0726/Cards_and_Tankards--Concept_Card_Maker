const artUpload=document.getElementById("artUpload");

const art=document.getElementById("art");

artUpload.onchange=e=>{

    const file=e.target.files[0];

    if(!file)return;

    art.src=URL.createObjectURL(file);

}

function bind(input,output){

    document.getElementById(input).addEventListener("input",e=>{

        document.getElementById(output).innerHTML=e.target.value;

    });

}

bind("nameInput","name");

bind("manaInput","mana");

bind("attackInput","attack");

bind("healthInput","health");

bind("typeInput","type");

bind("abilityInput","ability");
