function Map() {
  return (
    <div className="container">
      <h2>📍 Location Map</h2>

      <iframe
        width="100%"
        height="400"
        src="https://maps.google.com/maps?q=india&t=&z=5&ie=UTF8&iwloc=&output=embed"
      ></iframe>
    </div>
  );
}

export default Map;