var cartesState=[0,0,0,0,0,0,0,0,0,0];
var cartesIMG=
[
"https://img.icons8.com/color/144/000000/bull.png","https://img.icons8.com/color/144/000000/bull.png",
"https://img.icons8.com/color/144/000000/monkey-with-a-banana.png","https://img.icons8.com/color/144/000000/monkey-with-a-banana.png",
"https://img.icons8.com/color/144/000000/tapir.png","https://img.icons8.com/color/144/000000/tapir.png",
"https://img.icons8.com/color/144/000000/platypus.png","https://img.icons8.com/color/144/000000/platypus.png",
"https://img.icons8.com/doodle/144/000000/clown.png","https://img.icons8.com/doodle/144/000000/clown.png"];
var cartesRetournees=[];
var nmbCout=0;







function creerCartes(){
    //Init
    cartesState=[0,0,0,0,0,0,0,0,0,0];
    nmbCout=0;
    document.getElementById("nmbCout").innerHTML="x"+nmbCout;


    var tableau = document.getElementById("tableau");
    ligne=tableau.insertRow(-1);
    for(let i=0;i<10;i++){
        colonne=ligne.insertCell(-1);
        if(i==5){
            ligne=tableau.insertRow(-1); //Ajoute une ligne après la dernière ligne
            colonne=ligne.insertCell(-1); //Ajoute une colonne dans la dite ligne
        }
        var carte=document.createElement("img");
        //carte.src="./img/back.png";
        carte.src="https://img.icons8.com/ios/150/000000/unchecked-checkbox.png";
        carte.id=i;
        colonne.innerHTML='<img id="'+carte.id+'"src="'+carte.src+'" />';
        var carte=document.getElementById(i);
        carte.onclick=function(){
            retournerCarte(i);
        }
        


    }
    console.log("Boucle terminée.");
    melange();
}


function melange(){
    for(let pos=0;pos<cartesIMG.length;pos++){
        var alea=Math.floor(Math.random() * (cartesIMG.length));
        while(alea==pos){
            var alea=Math.floor(Math.random() * (cartesIMG.length));
        }
        var act=cartesIMG[pos];
        var ch=cartesIMG[alea];
        cartesIMG[pos]=ch;
        cartesIMG[alea]=act;        

    }
}

function testRetournee(){
    if(cartesRetournees.length<2){
        return true;
    }else if(cartesRetournees.length==2){
        return false;
    }
}

function equals(){
    if(cartesIMG[cartesRetournees[0]]==cartesIMG[cartesRetournees[1]]){
        return true;
    }else{
        return false;
    }
}

function fin(){
    console.log(cartesState.toString());
    for(let i=0;i<cartesState.length;i++){
        if(cartesState[i]!=-1){return false;}
    }
    affichFin();
    return true;
}

function affichFin(){
    var p=document.createElement("p");
    var node=document.createTextNode("Bien joué! Tu as terminé en "+nmbCout+" coups !");
    p.class="congrat";
    p.id="congrat";
    p.appendChild(node);

    document.getElementById("bottom").appendChild(p);
}

async function toSource(){
    console.log("carte r = "+cartesRetournees.toString());
    if(!testRetournee()){
        if(!equals()){
            await new Promise(r => setTimeout(r, 1000));
            console.log("on est là fdp");
            document.getElementById(cartesRetournees[0]).src="https://img.icons8.com/ios/150/000000/unchecked-checkbox.png";
            cartesState[cartesRetournees[0]]=0
            document.getElementById(cartesRetournees[1]).src="https://img.icons8.com/ios/150/000000/unchecked-checkbox.png";
            cartesState[cartesRetournees[1]]=0
            cartesRetournees=[];
            return;
        }
        cartesState[cartesRetournees[0]]=-1;
        cartesState[cartesRetournees[1]]=-1;
        cartesRetournees=[]
        fin();
        return;
    }
    return;   
}

function retournerCarte(indice){
    if(cartesState[indice]!=-1){
        if(fin() || !testRetournee()){return;}
        console.log("indice ="+indice);
        var img=document.getElementById(indice);
        img.src=cartesIMG[indice];
        cartesState[indice]=1;
        cartesRetournees.push(indice);
        toSource(); 
        nmbCout++;
        document.getElementById("nmbCout").innerHTML="x"+nmbCout;
    }
    
}




function recomencer(){
    document.getElementById("tableau").innerHTML="";
    if(fin()){
        document.getElementById("bottom").removeChild(document.getElementById("congrat"));
    }
    
    creerCartes();
}

function abandonner(){
    for(let i=0;i<10;i++){
        document.getElementById(i).src=cartesIMG[i];
        cartesState[i]=-1;
    }
    console.log(cartesState.toString());
}