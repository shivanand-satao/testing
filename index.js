document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;

            // Carousel functionality
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

            // Card functionality
            const cardContainer = document.querySelector('.card-container');

            // Clear existing cards (optional if you want to dynamically add content)
            cardContainer.innerHTML = '';

            // Iterate over each destination to create cards
            destinations.forEach(destination => {
                const firstImageSrc = destination.image_src[0];

                // Create card
                const card = document.createElement('div');
                card.classList.add('card', 'card-hover');
                card.style.width = '18rem';
                card.dataset.id = destination.name.toLowerCase().replace(/\s+/g, '-'); // Use a unique identifier based on destination name

                // Card image and badge
                const cardImgOverlay = document.createElement('div');
                cardImgOverlay.classList.add('card-img-overlay');

                const img = document.createElement('img');
                img.src = firstImageSrc;
                img.classList.add('card-img-top');
                img.alt = `Image of ${destination.name}`;

                const badge = document.createElement('span');
                badge.classList.add('badge', 'bg-primary', 'position-absolute', 'top-0', 'end-0', 'm-3');
                badge.textContent = 'New'; // You can change this if needed

                cardImgOverlay.appendChild(img);
                cardImgOverlay.appendChild(badge);
                card.appendChild(cardImgOverlay);

                // Card body
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = destination.name;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = `Places to visit: ${destination.places_to_visit.map(place => place.name).join(', ')}`;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                card.appendChild(cardBody);

                // List group items
                const listGroup = document.createElement('ul');
                listGroup.classList.add('list-group', 'list-group-flush');

                destination.places_to_visit.forEach(place => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.textContent = `${place.name}: ${place.info}`;
                    listGroup.appendChild(listItem);
                });

                card.appendChild(listGroup);

                // Card links
                const cardLinks = document.createElement('div');
                cardLinks.classList.add('card-body');

                const link1 = document.createElement('a');
                link1.href = '#';
                link1.classList.add('card-link');
                link1.innerHTML = '<i class="fas fa-info-circle"></i> More info';

                const link2 = document.createElement('a');
                link2.href = '#';
                link2.classList.add('card-link');
                link2.innerHTML = '<i class="fas fa-external-link-alt"></i> Visit';

                cardLinks.appendChild(link1);
                cardLinks.appendChild(link2);
                card.appendChild(cardLinks);

                // Add event listener for card click to redirect to destination page
                card.addEventListener('click', () => {
                    window.location.href = `destination.html?destination=${destination.name.toLowerCase().replace(/\s+/g, '-')}`;
                });

                // Append card to the container
                cardContainer.appendChild(card);
            });



            jquery();//gdfghsdghdfhgfhdghghgdh
           




        })

        .catch(error => console.error('Error fetching JSON data:', error));
});


function jquery() {
    $(document).ready(function() {
        // Handle hover events on navbar items
        $('.nav-link').hover(function(event) {
            // Get the info from data attribute
            var info = $(this).data('info');

            // Set the tooltip text and position it
            $('#infoTooltip').text(info)
                .css({
                    top: event.pageY + 10 + 'px', // Position below the mouse
                    left: event.pageX + 10 + 'px' // Position slightly to the right
                })
                .fadeIn(200); // Fade in the tooltip
        }, function() {
            // Hide the tooltip when not hovering
            $('#infoTooltip').fadeOut(200);
        });
    });
    $(document).ready(function() {
        // Existing hover code for navbar items

        // Handle form submission
        $('#contactForm').on('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Show thank you message
            alert('Thank you for your message! We will get back to you soon.');

            // Optionally, clear the form fields
            $(this).trigger('reset');
        });
    });
    $(document).ready(function() {
        $('a.nav-link').on('click', function(event) {
            event.preventDefault();
            const target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 2000);
        });
    });
    $(document).ready(function() {
        $('#card-container').hide(); // Hide initially
        $('#card-container').fadeIn(10000); // Fade in after loading
    });
    
}