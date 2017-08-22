// external js: isotope.pkgd.js


let isotopeLogic = (function () {
    // init Isotope
    let obj = {};
    obj.initIsotope = function () {

        var iso = new Isotope( '.grid', {
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        var filtersElem = document.querySelector('.filters-button-group');
        filtersElem.addEventListener( 'click', function( event ) {
            // only work with buttons
            if ( !matchesSelector( event.target, 'button' ) ) {
                return;
            }

            var filterValue = event.target.getAttribute('data-filter');
            // use matching filter function
            iso.arrange({ filter: filterValue });
        });

        // change is-checked class on buttons
        var buttonGroups = document.querySelectorAll('.button-group');
        for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
            var buttonGroup = buttonGroups[i];
            radioButtonGroup( buttonGroup );
        }

        function radioButtonGroup( buttonGroup ) {
            buttonGroup.addEventListener( 'click', function( event ) {
                // only work with buttons
                if ( !matchesSelector( event.target, 'button' ) ) {
                    return;
                }
                buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                event.target.classList.add('is-checked');
            });
        }
    }

    return obj;
})();


export default isotopeLogic;