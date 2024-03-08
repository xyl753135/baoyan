import { useEffect } from "react";

function success(position:any) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = position.timestamp;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}, Timestamp: ${timestamp}`);
  }
  
  function error(error:{code:number, message:string}) {
    console.log("Unable to retrieve your location");
    // console.log(error);
    console.log(`Error:${error.code}, Description:${error.message}`);
  }

  useEffect(() => {    
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      /* geolocation IS NOT available */
      console.log("Sorry, no position available.");
    }
  })
