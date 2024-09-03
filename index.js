document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            const carouselIndicators = document.querySelector('.carousel-indicators');
            const carouselInner = document.querySelector('.carousel-inner');

            // Clear existing indicators and items (optional if you want to dynamically add content)
            carouselIndicators.innerHTML = '';
            carouselInner.innerHTML = '';

            // Iterate over each destination and use the first image from the image_src array
            destinations.forEach((destination, index) => {
                const firstImageSrc = destination.image_src[0];

                // Create indicator button
                const indicator = document.createElement('button');
                indicator.type = 'button';
                indicator.dataset.bsTarget = '#carouselExampleCaptions';
                indicator.dataset.bsSlideTo = index;
                indicator.ariaLabel = `Slide ${index + 1}`;
                if (index === 0) {
                    indicator.classList.add('active');
                    indicator.ariaCurrent = 'true';
                }
                carouselIndicators.appendChild(indicator);

                // Create carousel item
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const img = document.createElement('img');
                img.src = firstImageSrc;
                img.classList.add('d-block', 'w-100');
                img.alt = `Image of ${destination.name}`;

                const carouselCaption = document.createElement('div');
                carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

                const h5 = document.createElement('h5');
                h5.textContent = destination.name;

                const p = document.createElement('p');
                p.textContent = `Best season: ${destination.best_season}`;

                carouselCaption.appendChild(h5);
                carouselCaption.appendChild(p);

                carouselItem.appendChild(img);
                carouselItem.appendChild(carouselCaption);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
});
