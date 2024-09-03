document.addEventListener('DOMContentLoaded', function() {
  // Extract destination ID from the URL
  const params = new URLSearchParams(window.location.search);
  const destinationId = params.get('destination');

  if (!destinationId) {
      console.error('No destination specified');
      return;
  }

  // Fetch the JSON data
  fetch('index.json')
      .then(response => response.json())
      .then(data => {
          const destination = data.destinations.find(dest => dest.name.toLowerCase().replace(/\s+/g, '-') === destinationId);

          if (!destination) {
              console.error('Destination not found');
              return;
          }

          // Populate the overview section
          document.getElementById('bestSeason').textContent = destination.best_season;
          document.getElementById('averageCost').textContent = destination.average_cost;
          document.getElementById('duration').textContent = destination.duration;
          document.getElementById('nearestAirport').textContent = destination.nearest_airport;
          document.getElementById('nearestRailwayStation').textContent = destination.nearest_railway_station;

          // Populate the image gallery
          const imageGallery = document.getElementById('imageGallery');
          imageGallery.innerHTML = ''; // Clear existing images
          destination.image_src.forEach(src => {
              const img = document.createElement('img');
              img.src = src;
              imageGallery.appendChild(img);
          });

          // Populate the places to visit
          const placesList = document.getElementById('placesList');
          placesList.innerHTML = ''; // Clear existing places
          destination.places_to_visit.forEach(place => {
              const placeDiv = document.createElement('div');
              placeDiv.className = 'place';
              placeDiv.innerHTML = `<h3>${place.name}</h3><p>${place.info}</p><p><strong>Entry Fee:</strong> ${place.entry_fee}</p><p><strong>Timings:</strong> ${place.timings}</p>`;
              placesList.appendChild(placeDiv);
          });

          // Populate activities
          const activitiesList = document.getElementById('activitiesList');
          activitiesList.innerHTML = ''; // Clear existing activities
          destination.activities.forEach(activity => {
              const activityDiv = document.createElement('div');
              activityDiv.className = 'activity';
              activityDiv.textContent = activity;
              activitiesList.appendChild(activityDiv);
          });

          // Handle lazy load
          document.getElementById('loadMore').addEventListener('click', () => {
              document.getElementById('moreInfo').style.display = 'block';
              document.getElementById('loadMore').style.display = 'none';

              // Add additional info here...
          });
      })
      .catch(error => console.error('Error fetching JSON data:', error));
});
