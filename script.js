/* Interactividad del CV — sin dependencias.
   Respeta prefers-reduced-motion: con esa preferencia activa,
   el texto aparece completo y las tarjetas se muestran sin animación. */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var frase = "Desarrollador Web Junior · Frontend y Backend";
    var destino = document.getElementById("rol-escrito");

    // Efecto de escritura para el rol del encabezado
    if (destino) {
        if (reduceMotion) {
            destino.textContent = frase;
        } else {
            var i = 0;
            (function escribir() {
                if (i <= frase.length) {
                    destino.textContent = frase.slice(0, i);
                    i += 1;
                    setTimeout(escribir, 50);
                }
            })();
        }
    }

    // Aparición de tarjetas al hacer scroll
    var objetivos = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        objetivos.forEach(function (el) {
            el.classList.add("visible");
        });
        return;
    }

    var observador = new IntersectionObserver(
        function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    objetivos.forEach(function (el) {
        observador.observe(el);
    });
})();