import React from "react";

function GoogleMap({ latitude, longitude }) {

  if (!latitude || !longitude) {

    return (
      <div style={styles.error}>
        Location Not Available
      </div>
    );

  }

  return (

    <div style={styles.container}>

      <h2>📍 Location</h2>

      <iframe
        title="Google Map"
        width="100%"
        height="400"
        style={styles.map}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
      />

    </div>

  );

}

const styles = {

container:{

marginTop:"20px",

background:"#fff",

padding:"20px",

borderRadius:"15px",

boxShadow:"0 5px 15px rgba(0,0,0,.15)"

},

map:{

border:"none",

borderRadius:"10px"

},

error:{

padding:"30px",

textAlign:"center",

fontSize:"20px"

}

};

export default GoogleMap;