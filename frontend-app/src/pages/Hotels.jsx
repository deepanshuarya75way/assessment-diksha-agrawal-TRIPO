import React, { useEffect, useState } from "react";
import axios from "axios";

function Hotels({ stateId, onClose }) {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (stateId) {

      loadHotels();

    }

  }, [stateId]);

  const loadHotels = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/hotels/state/${stateId}`
      );

      setHotels(res.data.data || []);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  return (

    <div style={styles.overlay}>

      <div style={styles.container}>

        <button
          style={styles.close}
          onClick={onClose}
        >
          ✖
        </button>

        <h1 style={styles.heading}>
          Hotels
        </h1>

        {

          loading ?

          <h2>Loading...</h2>

          :

          hotels.length === 0 ?

          <h2>No Hotels Found</h2>

          :

          hotels.map((hotel)=>(

            <div
              key={hotel._id}
              style={styles.card}
            >

              <img

                src={hotel.images?.[0]}

                alt={hotel.hotelName}

                style={styles.image}

              />

              <div style={styles.info}>

                <h2>

                  {hotel.hotelName}

                </h2>

                <p>

                  📍 {hotel.address}

                </p>

                <p>

                  ⭐ {hotel.rating}

                </p>

                <p>

                  ₹ {hotel.pricePerNight} / Night

                </p>

               <p>
👤 {hotel.ownerName || "Hotel Owner"}
</p>

<p>
📞 {hotel.contactNumber}
</p>

<p>
✉ {hotel.contactEmail}
</p>

                <button
style={styles.button}
onClick={() =>
window.location.href =
`/booking/${hotel._id}`
}
>
Book Now
</button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

const styles={

overlay:{

position:"fixed",

top:0,

left:0,

width:"100%",

height:"100%",

background:"rgba(0,0,0,.7)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:999

},

container:{

width:"90%",

height:"90%",

background:"#fff",

overflowY:"auto",

padding:"30px",

borderRadius:"20px"

},

close:{

float:"right",

background:"red",

color:"white",

border:"none",

padding:"10px 15px",

cursor:"pointer",

borderRadius:"8px"

},

heading:{

textAlign:"center",

marginBottom:"30px"

},

card:{

display:"flex",

gap:"20px",

marginBottom:"25px",

boxShadow:"0 0 10px #ccc",

padding:"20px",

borderRadius:"15px"

},

image:{

width:"300px",

height:"220px",

objectFit:"cover",

borderRadius:"10px"

},

info:{

flex:1

},

button:{

padding:"12px 20px",

background:"green",

color:"white",

border:"none",

borderRadius:"8px",

cursor:"pointer",

marginTop:"10px"

}

};

export default Hotels;