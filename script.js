const projects = [
  {
    title: "Pertemuan Pembeli & Investor",
    category: "Dokumentasi Kerja Sama",
    image: "assets/images/meeting-investor.jpg",
    description: "Pertemuan bersama pembeli, investor, staf desa, dan notaris sebagai bagian dari proses diskusi, validasi, dan kerja sama properti.",
    badge: "Kerja Sama"
  },
  {
    title: "Proyek Kaplingan Suela",
    category: "Tanah Kapling",
    image: "assets/images/kaplingan-suela.jpg",
    description: "Pengembangan tanah kapling di wilayah Suela sebagai bagian dari penyediaan lahan investasi dan hunian di NTB.",
    badge: "Kapling"
  },
  {
    title: "Perumahan Kelayu bersama Cozyland Group",
    category: "Kerja Sama Perumahan",
    image: "assets/images/perumahan-kelayu.jpg",
    description: "Kerja sama pengembangan perumahan di wilayah Kelayu bersama Cozyland Group.",
    badge: "Perumahan"
  },
  {
    title: "Proyek Kaplingan Wanasaba",
    category: "Tanah Kapling",
    image: "assets/images/kaplingan-wanasaba.jpg",
    imageMode: "contain",
    description: "Pengembangan tanah kapling di wilayah Wanasaba dengan potensi hunian dan investasi.",
    badge: "Wanasaba"
  },
  {
    title: "Ayana Residence bersama Cozyland",
    category: "Partnership",
    image: "assets/images/ayana-residence.jpg",
    description: "Diskusi dan kerja sama pengembangan perumahan Ayana Residence bersama Cozyland.",
    badge: "Partnership"
  },
  {
    title: "Kaplingan Bagek Papan",
    category: "Tanah Strategis",
    image: "assets/images/bagek-papan.jpg",
    imageMode: "contain",
    description: "Proyek kaplingan strategis di pinggir jalan negara Bagek Papan dengan nilai proyek sekitar 2,5 M.",
    badge: "&plusmn;2,5 M",
    badgeTone: "gold"
  }
];

const gallery = [
  {
    image: "assets/images/jona-documentation.jpg",
    caption: "Jona Investment and Development",
    layout: "featured"
  },
  {
    image: "assets/images/kaplingan-suela.jpg",
    caption: "Survey lokasi Kaplingan Suela",
    layout: "wide"
  },
  {
    image: "assets/images/meeting-investor.jpg",
    caption: "Pertemuan pembeli dan investor",
    layout: "compact"
  },
  {
    image: "assets/images/perumahan-kelayu.jpg",
    caption: "Perumahan Kelayu bersama Cozyland",
    layout: "compact"
  },
  {
    image: "assets/images/ayana-residence.jpg",
    caption: "Diskusi Ayana Residence",
    layout: "wide"
  },
  {
    image: "assets/images/wanasaba-field.jpg",
    caption: "Area Kaplingan Wanasaba",
    layout: "compact"
  }
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const projectGrid = document.querySelector("[data-projects]");
const galleryGrid = document.querySelector("[data-gallery]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const closeButton = document.querySelector(".lightbox-close");

function renderProjects() {
  projectGrid.innerHTML = projects
    .map((project, index) => {
      const imageClass = project.imageMode === "contain" ? "project-image contain" : "project-image";
      const badgeClass = project.badgeTone === "gold" ? "badge gold" : "badge";

      return `
        <article class="project-card">
          <div class="${imageClass}">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
          </div>
          <div class="project-body">
            <p class="project-kicker">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="${badgeClass}">${project.badge}</span>
          </div>
        </article>
      `;
    })
    .join("");

  projectGrid.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.setProperty("--i", index);
  });
}

function renderGallery() {
  galleryGrid.innerHTML = gallery
    .map((item) => `
      <button class="gallery-item ${item.layout || ""}" type="button" data-full="${item.image}">
        <img src="${item.image}" alt="${item.caption}" loading="lazy">
        <span>${item.caption}</span>
      </button>
    `)
    .join("");

  galleryGrid.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.style.setProperty("--i", index);
  });
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function toggleMenu() {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function animateCounter(counter) {
  if (counter.dataset.done === "true") return;

  const target = Number(counter.dataset.counter);
  const duration = 900;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target;
      counter.dataset.done = "true";
    }
  }

  requestAnimationFrame(tick);
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal, .stagger");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-counter]").forEach(animateCounter);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

renderProjects();
renderGallery();
setupRevealObserver();
updateHeader();

menuToggle.addEventListener("click", toggleMenu);
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

galleryGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-item");
  if (!button) return;

  const image = button.querySelector("img");
  openLightbox(button.dataset.full, image.alt);
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
