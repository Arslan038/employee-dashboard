export function clickOutside(app) {
    app.directive('click-outside', {
        beforeMount(el, binding) {
            el.clickOutsideEvent = function (event) {
                // Check if the click is outside the element and its children
                if (!(el === event.target || el.contains(event.target))) {
                    // Ensure binding.value is a function before calling it
                    if (typeof binding.value === 'function') {
                        binding.value(event);
                    } else {
                        console.warn('v-click-outside expects a function as the binding value.');
                    }
                }
            };
            // Attach the event listener
            document.body.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted(el) {
            // Clean up the event listener
            document.body.removeEventListener('click', el.clickOutsideEvent);
        },
    });
}