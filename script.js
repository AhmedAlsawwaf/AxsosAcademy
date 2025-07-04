document.addEventListener("DOMContentLoaded", () => {
  const hasAnimated = new WeakSet();
  const animateElements = (selector, offset) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      const yScroll = offset + index * 50;
      if (window.scrollY > yScroll && !hasAnimated.has(el)) {
        el.classList.add("animation-on-scroll");
        hasAnimated.add(el);
      }
    });
  };

  const animateCounters = () => {
    document.querySelectorAll(".num").forEach((counter) => {
      if (counter.getAttribute("data-animated")) return;
      const target = parseInt(counter.innerText.replace(/[^\d]/g, ""));
      let current = 0;
      const increment = Math.ceil(target / 100);

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          counter.innerText = target;
        } else {
          counter.innerText = current;
          requestAnimationFrame(updateCount);
        }
      };

      counter.setAttribute("data-animated", "true");
      counter.innerText = "0";
      updateCount();
    });
  };

  const animateAchievementsSection = () => {
    const sectionTop = 3350;
    if (window.scrollY > sectionTop) {
      document.querySelector(".achievements-title")?.classList.add("animation-on-scroll");
      document.querySelector(".achievements-des")?.classList.add("animation-on-scroll");
      animateCounters();
    }
  };

  const handleMaskScroll = () => {
    const title = document.getElementById("anim-mask");
    if (!title) return;
    const scrollTop = document.documentElement.scrollTop / 10;
    title.style.transform = `translateX(-${scrollTop + 100}px)`;
  };

  const onScroll = () => {
    animateElements(".about-element", 300);
    animateElements(".curriculum-element", 1000);
    animateElements(".book-element", 1600);
    animateElements(".benefits-element", 2200);
    animateElements(".testimonials-header-element", 3500);
    animateAchievementsSection();
    handleMaskScroll();
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  const carouselTrack = document.getElementById("carouselTrack");
  const carouselNav = document.getElementById("carouselNav");

  const partners = [
    { id: 1, logo: "./assets/World-Food-Program.png" },
    { id: 2, logo: "./assets/UTI-e1660629684836-ptc3gxic1b7tvle8zwuw9w6b6og5fupnbxrc4pbe20.jpg" },
    { id: 3, logo: "./assets/userpilot-logo-colored-small-1594047410.png" },
    { id: 4, logo: "./assets/Polytechnic-university-150x150.png" },
    { id: 5, logo: "./assets/Gamiphy.png" },
    { id: 6, logo: "./assets/Experts.jpg" },
    { id: 7, logo: "./assets/Exalt.png" },
    { id: 8, logo: "./assets/appiaTech.png" },
    { id: 9, logo: "./assets/Upwork.png" },
    { id: 10, logo: "./assets/SadelTech.png" },
    { id: 11, logo: "./assets/Quiz-plus-600x252.png" },
    { id: 12, logo: "./assets/Jobify-1.jpg" },
    { id: 13, logo: "./assets/ITvnue-e1643628335931.jpg" },
    { id: 14, logo: "./assets/ITG-1.png" },
    { id: 15, logo: "./assets/Endeavor-1.png" },
    { id: 16, logo: "./assets/ASAL-logo-600x600.png" },
    { id: 17, logo: "./assets/535cd5b-600x174.png" },
  ];

  if (carouselTrack && carouselNav) {
    partners.forEach((partner, i) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      item.dataset.index = i;
      item.innerHTML = `<img src="${partner.logo}" alt="Partner ${partner.id}" draggable="false">`;
      carouselTrack.appendChild(item);

      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      dot.dataset.index = i;
      carouselNav.appendChild(dot);
    });

    const items = Array.from(document.querySelectorAll(".carousel-item"));
    const dots = Array.from(document.querySelectorAll(".carousel-dot"));
    let defaultIndex = Math.floor(items.length / 2);
    scrollTo(defaultIndex);

    items.forEach((item, i) => item.addEventListener("click", () => scrollTo(i)));
    dots.forEach((dot, i) => dot.addEventListener("click", () => scrollTo(i)));

    function scrollTo(index) {
      items.forEach((item) => item.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      const selected = items[index];
      selected.classList.add("active");
      dots[index].classList.add("active");

      centerItemInCarousel(selected, carouselTrack);
    }

    function centerItemInCarousel(selectedItem, track) {
      const containerRect = track.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();
      const containerCenter = containerRect.width / 2;
      const itemCenter = itemRect.left + itemRect.width / 2;
      const currentTranslateX = getTranslateX(track);
      const delta = containerCenter - itemCenter;
      const newTranslateX = currentTranslateX + delta;
      track.style.transform = `translateX(${newTranslateX}px)`;
    }

    function getTranslateX(element) {
      const transform = window.getComputedStyle(element).transform;
      if (transform === "none") return 0;
      return new DOMMatrix(transform).m41;
    }
  }
});

const testimonials = [
  {
    img: "assets/userpilot-logo-colored-small-1594047410.png",
    qoute: "Khalil (Axsos Academy graduate)...",
    hr: "Majd Sehwail",
    position: "VP of Engineering @Userpilot"
  },
  {
    img: "./assets/appiaTech.png",
    qoute: "It's quite impressive...",
    hr: "Nisreen Shahen",
    position: "HR Manager @AppiaTech"
  },
  {
    img: "assets/Jobify-1.jpg",
    qoute: "AppiaTech has so far hired 5 candidates...",
    hr: "Abeer Bibi",
    position: "Design and operation Leader @Qadura"
  }
];

let testimonialIndex = 0;
function showNextItem() {
  const t = testimonials[testimonialIndex];
  document.getElementById("testimonialsImg").src = t.img;
  document.getElementById("testimonialsQoute").innerText = t.qoute;
  document.getElementById("testimonialsHr").innerText = t.hr;
  document.getElementById("testimonialsPosition").innerText = t.position;
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}
showNextItem();
setInterval(showNextItem, 4000);

const lang = document.querySelector(".dropup");
const langBtn = document.querySelector(".dropup-button");
const langList = document.querySelector(".dropup-content");

lang?.addEventListener("mouseover", () => {
  langList.classList.add("visible");
  langBtn.classList.remove("dropup-button-hoverd");
});
lang?.addEventListener("mouseout", () => {
  langList.classList.remove("visible");
  langBtn.classList.add("dropup-button-hoverd");
});

const toTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  toTopBtn.style.opacity = window.scrollY > 200 ? "1" : "0";
});
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const jumper = document.getElementById("jumber");
const messengerLabel = document.querySelector(".messenger-lable");

setInterval(() => {
  jumper.style.transform = "translateY(-20px)";
  setTimeout(() => {
    jumper.style.transform = "translateY(0)";
  }, 300);
}, 3000);

jumper?.addEventListener("mouseover", () => {
  messengerLabel.innerText = "Facebook Messenger";
});
jumper?.addEventListener("mouseout", () => {
  messengerLabel.innerText = "Contact Us";
});
