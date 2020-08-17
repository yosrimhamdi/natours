import mapboxgl from 'mapbox-gl';

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoieW9zcmltaGFtZGkiLCJhIjoiY2tkdnFsb2s5MDlxOTMwcWk0NXRlcm96bSJ9.5L4RkN0Ppcw8MzGGI_vA9g';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yosrimhamdi/ckdvqw0rq2ele19lllukvdiqd',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 35,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
