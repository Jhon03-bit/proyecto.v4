document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    const closeMenuButton = document.getElementById('close-menu'); // Nuevo selector
    const dropdownLinks = document.querySelectorAll('.nav-list li.dropdown > a');

    const closeMenu = () => {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        // También cierra los submenús abiertos al cerrar el menú principal
        document.querySelectorAll('.nav-list li.dropdown.open').forEach(openDropdown => {
            openDropdown.classList.remove('open');
            openDropdown.querySelector('a').setAttribute('aria-expanded', 'false');
        });
    };

    // 🔹 Menú hamburguesa (abrir)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // 🔹 Cerrar al tocar overlay o el botón de cerrar
    overlay.addEventListener('click', closeMenu);
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
    }

    // 🔹 Dropdowns móviles (con clic)
    dropdownLinks.forEach(link => {
        link.addEventListener('click', e => {
            if (window.innerWidth <= 1000) {
                e.preventDefault();
                const parent = link.parentElement;
                
                // Cerrar otros submenús si están abiertos
                document.querySelectorAll('.nav-list li.dropdown.open').forEach(openDropdown => {
                    if (openDropdown !== parent) {
                        openDropdown.classList.remove('open');
                        openDropdown.querySelector('a').setAttribute('aria-expanded', 'false');
                    }
                });

                // Alternar la clase del submenú actual
                parent.classList.toggle('open');
                const isExpanded = parent.classList.contains('open');
                link.setAttribute('aria-expanded', isExpanded);
            }
        });
    });
});