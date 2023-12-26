async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: coords[0],
  });

  markers = []

  for (let i = 0; i < coords.length; ++i) {
    markers.push(new google.maps.Marker({
      position: coords[i],
      map,
      title: i.toString(),
      label: {
        color: 'white',
        fontWeight: 'bold',
        text: coords[i].ip
      },
      icon: {
        labelOrigin: new google.maps.Point(11, -10),
        url: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png',
        size: new google.maps.Size(22, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(11, 40),
      },
    }));
  }

  const flightPath = new google.maps.Polyline({
    path: coords,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map,
    icons: [{
        icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
        offset: '100%',
        repeat: '20px'
    }]
  });

  const bounds = new google.maps.LatLngBounds();
  if (markers.length>0) { 
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }    
    map.fitBounds(bounds);
  }
}

window.onload = initMap
