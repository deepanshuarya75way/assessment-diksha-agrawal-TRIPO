import React from "react";

function Hero({ search, setSearch }) {

  return (

    <div style={styles.hero}>

      <h1 style={styles.title}>
        🇮🇳 Explore Incredible India
      </h1>

      <h2 style={styles.subtitle}>
        India's Smart AI Travel Platform
      </h2>

      <p style={styles.text}>
        Discover Tourist Places • Hotels • Restaurants • Live Weather • AI Assistant
      </p>

      <div style={styles.ownerBox}>

        <h3 style={styles.ownerTitle}>
          👩 Founder
        </h3>

        <p style={styles.owner}>
          Diksha Agrawal
        </p>

        <p style={styles.owner}>
          📞 6207556344
        </p>

        <p style={styles.owner}>
          📧 diksha6296@gmail.com
        </p>

      </div>

      <input

        type="text"

        placeholder="🔍 Search any State or Union Territory..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        style={styles.search}

      />

    </div>

  );

}

const styles={

hero:{
padding:"70px 20px",
textAlign:"center",
background:"linear-gradient(135deg,#1e3a8a,#0f172a)",
color:"white"
},

title:{
fontSize:"56px",
fontWeight:"bold",
marginBottom:"15px"
},

subtitle:{
fontSize:"30px",
marginBottom:"20px"
},

text:{
fontSize:"20px",
color:"#e2e8f0",
marginBottom:"35px"
},

ownerBox:{
display:"inline-block",
padding:"20px 35px",
borderRadius:"18px",
background:"rgba(255,255,255,.12)",
backdropFilter:"blur(12px)",
marginBottom:"35px"
},

ownerTitle:{
marginBottom:"10px",
fontSize:"24px"
},

owner:{
fontSize:"18px",
margin:"8px 0"
},

search:{
width:"65%",
maxWidth:"700px",
padding:"18px",
fontSize:"18px",
border:"none",
borderRadius:"12px",
outline:"none",
boxShadow:"0 5px 18px rgba(0,0,0,.35)"
}

};

export default Hero;