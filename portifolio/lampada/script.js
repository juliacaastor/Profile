let luzAcesa = true;
var lampada = document.getElementById("lamp");
var fundo = document.body;
lampada.addEventListener("click", function(){
    if (luzAcesa){
        lampada.src = "assets/lamp_on.png"
        lampada.alt = "Lâmpada Acesa"
        document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)"
        console.log(lampada.alt)
    } else {
        lampada.src = "assets/lamp_off.png"
        lampada.alt = "Lâmpada Apagada"
        document.body.style.background = "radial-gradient(circle, white 8%, black 100%)"
        console.log(lampada.alt)
    }
    luzAcesa = !luzAcesa
})
















