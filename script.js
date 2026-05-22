const previewStates = {
  prepare: {
    kicker: "Подготовка",
    title: "Проверка старта до печати",
    text: "Модель, профиль Cura, материал, supports и safety-ограничения фиксируются до запуска цикла."
  },
  preview: {
    kicker: "Предпросмотр",
    title: "Постслойный риск-анализ",
    text: "Стек слоёв, проход траектории, ETA и зоны риска показывают, где мониторинг должен быть особенно внимателен."
  },
  monitor: {
    kicker: "Мониторинг",
    title: "Живой контур оператора",
    text: "Телеметрия, AI-подсказки, журнал событий и Safety Gate собраны в один экран."
  }
};

const previewTabs = Array.from(document.querySelectorAll("[data-preview-state]"));
const flowCards = Array.from(document.querySelectorAll("[data-flow-card]"));
const previewKicker = document.getElementById("previewKicker");
const previewTitle = document.getElementById("previewTitle");
const previewText = document.getElementById("previewText");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const currentYear = document.getElementById("currentYear");
const cursorAura = document.getElementById("cursorAura");
const pageShell = document.getElementById("pageShell");
const symbolField = document.getElementById("symbolField");
const symbols = Array.from(symbolField ? symbolField.children : []);
const tiltTargets = Array.from(document.querySelectorAll("[data-tilt]"));

let activePreviewState = "monitor";
let previewTimer = null;

function renderPreviewState(stateKey) {
  const data = previewStates[stateKey];
  if (!data) {
    return;
  }

  activePreviewState = stateKey;

  previewTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.previewState === stateKey);
  });

  flowCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.flowCard === stateKey);
  });

  if (previewKicker) {
    previewKicker.textContent = data.kicker;
  }

  if (previewTitle) {
    previewTitle.textContent = data.title;
  }

  if (previewText) {
    previewText.textContent = data.text;
  }
}

function startPreviewLoop() {
  if (!previewTabs.length) {
    return;
  }

  const order = ["prepare", "preview", "monitor"];
  clearInterval(previewTimer);
  previewTimer = setInterval(() => {
    const currentIndex = order.indexOf(activePreviewState);
    const nextState = order[(currentIndex + 1) % order.length];
    renderPreviewState(nextState);
  }, 5600);
}

previewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    renderPreviewState(tab.dataset.previewState);
    startPreviewLoop();
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const nextState = !siteNav.classList.contains("is-open");
    siteNav.classList.toggle("is-open", nextState);
    menuToggle.classList.toggle("is-open", nextState);
    menuToggle.setAttribute("aria-expanded", String(nextState));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0
    }
  );

  document.querySelectorAll("main section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function enableTilt() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  tiltTargets.forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * 3;
      const rotateY = (px - 0.5) * 4;

      target.style.setProperty("--mx", `${px * 100}%`);
      target.style.setProperty("--my", `${py * 100}%`);
      target.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    target.addEventListener("mouseleave", () => {
      target.style.removeProperty("--mx");
      target.style.removeProperty("--my");
      target.style.transform = "";
    });
  });
}

function initPointerField() {
  if (
    !cursorAura ||
    !symbols.length ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tx: window.innerWidth / 2,
    ty: window.innerHeight / 2
  };

  const state = symbols.map((symbol, index) => ({
    element: symbol,
    baseX: ((index % 4) + 0.5) * (window.innerWidth / 4),
    baseY: (Math.floor(index / 4) + 0.7) * (window.innerHeight / 3.7),
    depth: 0.08 + (index % 4) * 0.02,
    drift: index * 0.36
  }));

  function layout() {
    state.forEach((item, index) => {
      item.baseX = ((index % 4) + 0.5) * (window.innerWidth / 4);
      item.baseY = (Math.floor(index / 4) + 0.7) * (window.innerHeight / 3.7);
    });
  }

  window.addEventListener("resize", layout);
  window.addEventListener("mousemove", (event) => {
    pointer.tx = event.clientX;
    pointer.ty = event.clientY;
  });

  function frame() {
    pointer.x += (pointer.tx - pointer.x) * 0.1;
    pointer.y += (pointer.ty - pointer.y) * 0.1;

    cursorAura.style.transform = `translate(${pointer.x - 272}px, ${pointer.y - 272}px)`;

    if (pageShell) {
      pageShell.style.setProperty("--pointer-x", `${pointer.x}px`);
      pageShell.style.setProperty("--pointer-y", `${pointer.y}px`);
    }

    const nx = pointer.x / window.innerWidth - 0.5;
    const ny = pointer.y / window.innerHeight - 0.5;

    state.forEach((item, index) => {
      const wave = Math.sin(performance.now() * 0.00065 + item.drift) * 9;
      const x = item.baseX + nx * 130 * item.depth + wave;
      const y = item.baseY + ny * 100 * item.depth - wave * 0.32;
      const rotate = nx * 18 + index * 5;
      const opacity = Math.max(0.06, 0.18 - Math.abs(nx) * 0.08);

      item.element.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      item.element.style.opacity = String(opacity);
    });

    requestAnimationFrame(frame);
  }

  layout();
  requestAnimationFrame(frame);
}

renderPreviewState(activePreviewState);
startPreviewLoop();
enableTilt();
initPointerField();
