(() => {
    const toggle = document.querySelector(".portfolio-chat__toggle");
    const panel = document.getElementById("portfolioChatPanel");
    const closeButton = document.querySelector(".portfolio-chat__close");
    const form = document.getElementById("portfolioChatForm");
    const input = document.getElementById("portfolioChatInput");
    const messages = document.getElementById("portfolioChatMessages");

    if (!toggle || !panel || !closeButton || !form || !input || !messages) {
        return;
    }

    const addMessage = (text, sender) => {
        const message = document.createElement("p");
        message.className = `portfolio-chat__message portfolio-chat__message--${sender}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    };

    const intents = [
        {
            pattern: /\b(presentate|present[aá]me|presentaci[oó]n|contame de leonel|hablame de leonel|qui[eé]n sos|qui[eé]n es|sobre m[ií])\b/,
            reply: "Soy Leonel Sosa, desarrollador web full-stack. Me interesa crear herramientas digitales útiles y fáciles de usar, cuidando tanto la lógica como la experiencia de quienes las usan. En este portafolio comparto mis tecnologías, publicaciones y proyectos, como Stocky. Si querés conocer un poco más, preguntame por mis habilidades o por el proyecto.",
        },
        {
            pattern: /\b(stocky|inventario)\b/,
            reply: "Stocky es un sistema de gestión de inventario para consultar un resumen general, revisar el detalle del stock y controlar el acceso. Está construido con una mirada práctica: que la información importante sea fácil de encontrar. Podés ver el código en github.com/lucerolasala/Stocky o probar la demo en stocky-beta-wine.vercel.app.",
        },
        {
            pattern: /\b(habilidad|tecnolog[ií]as?|python|django|stack|herramientas?)\b/,
            reply: "Mi caja de herramientas incluye Python y Django para la lógica web; HTML, CSS y JavaScript para las interfaces; y SQLite, APIs y operaciones CRUD para trabajar con datos y servicios. También presto atención al diseño responsive, la accesibilidad y el uso de Git.",
        },
        {
            pattern: /\b(trabajo|experiencia|oportunidad|contrat|colabor|equipo)\b/,
            reply: "Me interesa construir experiencias web funcionales, claras y cuidadas. En este portafolio podés conocer mi enfoque y ver Stocky como ejemplo de un producto con gestión de datos e interfaz web. Por ahora el sitio no publica un medio de contacto.",
        },
        {
            pattern: /\b(blog|publicaci[oó]n|art[ií]culo)\b/,
            reply: "En el blog comparto publicaciones y avances. Podés entrar desde el enlace Blog del menú para leerlas.",
        },
        {
            pattern: /\b(contacto|contactar|mensaje|email|correo)\b/,
            reply: "Por ahora el portafolio no publica un correo ni un formulario de contacto. Cuando Leonel agregue un medio de contacto, va a aparecer en esa sección.",
        },
        {
            pattern: /\b(hola|buenas|buenos d[ií]as|buenas tardes)\b/,
            reply: "¡Hola! Soy el asistente del portafolio de Leonel. Puedo presentártelo o contarte sobre sus habilidades, Stocky y el blog. ¿Por dónde querés empezar?",
        },
    ];

    const getReply = (question) => {
        const text = question.toLocaleLowerCase("es");
        const intent = intents.find(({ pattern }) => pattern.test(text));

        return intent
            ? intent.reply
            : "Puedo presentarte a Leonel y contarte sobre sus habilidades, Stocky o el blog. ¿Qué tema te interesa?";
    };

    const setOpen = (open) => {
        panel.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        if (open) {
            input.focus();
        } else {
            toggle.focus();
        }
    };

    toggle.addEventListener("click", () => setOpen(panel.hidden));
    closeButton.addEventListener("click", () => setOpen(false));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !panel.hidden) {
            setOpen(false);
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) {
            return;
        }

        addMessage(question, "user");
        input.value = "";
        window.setTimeout(() => addMessage(getReply(question), "assistant"), 250);
        input.focus();
    });
})();
