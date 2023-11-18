/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


flatpickr("#id_datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    time_24hr: true,
});


document.getElementById('id_date').addEventListener('change', function() {
    var selectedDate = this.value;
    fetch(`/get-available-slots/?date=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            // Clear existing options
            var timeSelect = document.getElementById('id_time');
            timeSelect.innerHTML = '';

            // Populate time select with available slots
            data.available_slots.forEach(function(slot) {
                var option = document.createElement('option');
                option.value = slot;
                option.text = slot;
                timeSelect.appendChild(option);
            });
        });
});


// confirmation modal
var confirmReservationModal = document.getElementById('confirmReservationModal')
    confirmReservationModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget
        var cakeId = button.getAttribute('data-cake-id')
        var confirmButton = confirmReservationModal.querySelector('#confirmReservationButton')
        confirmButton.onclick = function () {
            // Redirect to the reservation creation page with the selected cake ID
            window.location.href = `{% url 'reservation_create' %}?cake_id=${cakeId}`;
        }
    })


// Function to handle reservation confirmation
function confirmReservation(cakeId) {
    fetch('/reserve_cake/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'cake_id=' + cakeId
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reservation successful!');
            location.reload();
        } else {
            alert('Reservation failed.');
        }
    });
}