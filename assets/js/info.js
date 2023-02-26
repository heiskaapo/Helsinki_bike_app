export function dataInitialization()
{

    function idAdressPairsMaker(info){
        let idAdressPairs={};
        return new Promise(function(resolve){
            Papa.parse("assets/data/pyöräasemat.csv", {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(result){
                    for(let i=0;i<result.data.length;i++){
                        idAdressPairs[result.data[i]['ID']]= 
                        {
                            lat: +result.data[i].y,
                            lng: +result.data[i].x
                        };
                    }
                    for(let i=0;i<info.departureStationId.length;i++){
                        info.departureStationCoordinates.push(idAdressPairs[info.departureStationId[i]]);
                        info.returnStationCoordinates.push(idAdressPairs[info.returnStationId[i]]);
                    }
                    resolve(info);
                },
            });
        })
    }

    function parsePromise (){        
            let info={
            departureStation:[],
            returnStation:[],
            departureStationId:[],
            returnStationId: [],
            departureStationCoordinates:[],
            returnStationCoordinates:[],
            coveredDistance: [],
            duration:[]
        };
        return new Promise(function(resolve){
            Papa.parse("assets/data/2021-08.csv", {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    for (let i = 0; i < results.data.length; i++) {
                    info.departureStation.push(results.data[i]['Departure station name']);
                    info.returnStation.push(results.data[i]['Return station name']);
                    info.departureStationId.push(results.data[i]['Departure station id']);
                    info.returnStationId.push(results.data[i]['Return station id']);
                    info.coveredDistance.push(results.data[i]['Covered distance (m)']);
                    // päivämäärän ehostaminen 
                    let TimeInSeconds=results.data[i]['Duration (sec.)'];
                    let TimeInHours=Math.floor(TimeInSeconds/3600);
                    let TimeInMinutes=Math.floor(TimeInSeconds/60)-TimeInHours*60;
                    let seconds=TimeInSeconds%60+'s';
                    let minutes=TimeInMinutes-TimeInHours*60+'min:';
                    let hours='';
                    if(TimeInHours>0){
                        hours=TimeInHours+'h:';
                    }
                    info.duration.push((hours+minutes+seconds));
                    }
                    resolve(info);
                }   
            })
        });
    }
    
    let info = parsePromise()
    .then((result)=>{
        return idAdressPairsMaker(result);
    })
    .then((result)=>
    {
        $('button').prop("disabled",false);
        return result;
    })
    .catch(()=>{alert('ei onnistunut')});
    return info;
}
