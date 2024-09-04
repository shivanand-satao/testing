document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  const destinationId = params.get('destination'); 

  fetch('index.json')
      .then(response => response.json())
      .then(data => {
          const destinations = data.destinations;
          const destination = destinations.find(dest => dest.name.toLowerCase().replace(/\s+/g, '-') === destinationId);

          if (destination) {
              // Populate carousel
              const carouselIndicators = document.querySelector('.carousel-indicators');
              const carouselInner = document.querySelector('.carousel-inner');

              // Ensure only unique images in carousel
              const uniqueImages = [...new Set(destination.image_src)];

              // Clear existing indicators and items
              carouselIndicators.innerHTML = '';
              carouselInner.innerHTML = '';

              uniqueImages.forEach((src, index) => {
                  // Create indicator button
                  const indicator = document.createElement('li');
                  indicator.dataset.target = '#destinationCarousel';
                  indicator.dataset.slideTo = index;
                  if (index === 0) {
                      indicator.classList.add('active');
                  }
                  carouselIndicators.appendChild(indicator);

                  // Create carousel item
                  const carouselItem = document.createElement('div');
                  carouselItem.classList.add('carousel-item');
                  if (index === 0) {
                      carouselItem.classList.add('active');
                  }

                  const img = document.createElement('img');
                  img.src = src;
                  img.classList.add('d-block', 'w-100');
                  img.alt = `Image ${index + 1}`;

                  carouselItem.appendChild(img);
                  carouselInner.appendChild(carouselItem);
              });

              // Populate additional details
              document.getElementById('destinationName').textContent = destination.name;
              document.getElementById('bestSeason').textContent = destination.best_season;

              // Populate places to visit
              const placesToVisit = document.getElementById('placesToVisit');
              destination.places_to_visit.forEach(place => {
                  const placeItem = document.createElement('li');
                  placeItem.classList.add('list-group-item');
                  placeItem.innerHTML = `<strong>${place.name}</strong><br>${place.info}<br><strong>Entry Fee:</strong> ${place.entry_fee}<br><strong>Timings:</strong> ${place.timings}`;
                  placesToVisit.appendChild(placeItem);
              });

              // Populate activities
              const activitiesList = document.getElementById('activitiesList');
              destination.activities.forEach(activity => {
                  const activityItem = document.createElement('li');
                  activityItem.classList.add('list-group-item');
                  activityItem.textContent = activity;
                  activitiesList.appendChild(activityItem);
              });

              // Populate travel tips
              const travelTipsList = document.getElementById('travelTipsList');
              destination.travel_tips.forEach(tip => {
                  const tipItem = document.createElement('li');
                  tipItem.classList.add('list-group-item');
                  tipItem.textContent = tip;
                  travelTipsList.appendChild(tipItem);
              });

              // Populate emergency contacts
              document.getElementById('police').textContent = destination.emergency_contacts.police;
              document.getElementById('ambulance').textContent = destination.emergency_contacts.ambulance;
              document.getElementById('touristHelpline').textContent = destination.emergency_contacts.tourist_helpline;
          } else {
              console.error('Destination not found');
          }
      })
      .catch(error => console.error('Error fetching JSON data:', error));
});
