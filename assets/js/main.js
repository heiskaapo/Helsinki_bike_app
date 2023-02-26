import {vaihdateksti} from "./helperfunctions.js";
import { dataInitialization } from "./info.js";
// import {kartanalustus,calcRoute} from "./kartta.js";


var mylatlng={lat:60.1699,lng:24.9384};
var mapOptions={
    center:mylatlng,
    zoom:11,
    mapTypeId:google.maps.MapTypeId.TERRAIN,
    clickableIcons:false,
    disableDefaultUI:true,
    keyboardShortcuts:false,
    gestureHandling:'none',
    styles:[
    {featureType: 'poi',elementType:'labels', stylers:[{'visibility':'off'}]
    },
    {featureType:'road.highway',elementType:'labels', stylers:[{'visibility':'off'}]
    },
    ]
};
//create map
var map= new google.maps.Map(document.getElementById("googleMap"), mapOptions);
//create a Directions service object to use the route method and get a result for our request
let directionsService = new google.maps.DirectionsService();
//create a DirectionsRenderer object which we will use to display the route 
let directionsDisplay = new google.maps.DirectionsRenderer();
//bind the directionsRenderer to the map 
directionsDisplay.setMap(map);


//Pass the Request to the route method 
function calcRoute(info,i) {

    console.log(info.returnStationCoordinates[i]);
    var request = {
        origin: info.departureStationCoordinates[i],
        destination: info.returnStationCoordinates[i],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    return new Promise(function(resolve){
        directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //display route
            directionsDisplay.setDirections(result);
            resolve();
        }
        else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in helsinki 
            map.setCenter(mylatlng);
        }
    });
    });
}


let info;
dataInitialization()
.then((result)=>{
    info=result;
    console.log(Object.keys(info));
});

function changeView() {
        let i = Math.floor(Math.random() * info.departureStation.length);
        console.log(info);
        while(info.departureStation[i]==info.returnStation[i]){
        i = Math.floor(Math.random() * info.departureStation.length);
        }
        let routeReady=calcRoute(info,i);
        vaihdateksti(info,i,routeReady);
}

$(function () {
    $('button').prop("disabled",true);
    $("#nextQuote").on('click',changeView);
});
