        
function vaihdateksti(info,i,routeReady) {
    let dimmed=new Promise(function(resolve){
        let time=200;
        let values = [0, 0, 0];
        values = values.map(function () {return Math.floor(Math.random() * 255);})
        $("h1").animate({ 'background-color': `rgba(${values[0]},${values[1]},${values[2]},0.8)` }, 1200);
        $("#textBox #data li").animate({ opacity: false }, time);
        setTimeout(()=>resolve(),time);
    });
    dimmed.then(()=>{
        $("#lähtöpiste").text(info.departureStation[i]);
        $("#päätepysäkki").text(info.returnStation[i]);
        $("#matkanpituus").text(info.coveredDistance[i] + ' (m)');
        $("#päivämäärä").text(info.duration[i]);
    })
    routeReady.then(()=>{
        $("#textBox #data li").animate({ opacity: true}, 1000);
    })
    
}
    


export {vaihdateksti};
