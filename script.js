// Kapitel-Section Parallax on Mousemove
const animatedSection = document.querySelector(".animated-section");

if (animatedSection) {
  animatedSection.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = animatedSection.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * 10;
    animatedSection.style.transform = `translate(${x}px, ${y}px)`;
  });

  animatedSection.addEventListener("mouseleave", () => {
    animatedSection.style.transform = `translate(0, 0)`;
  });
}

// Scroll reveal für Kapitelpunkte
function animateChapterList() {
  const listItems = document.querySelectorAll(".chapter-list li");
  const trigger = document.getElementById("kapitel");
  const triggerTop = trigger.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (triggerTop < windowHeight - 100) {
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 150);
    });
  }
}

window.addEventListener("scroll", animateChapterList);
window.addEventListener("load", animateChapterList);

// <mark>-Elemente animieren, wenn sie ins Sichtfeld kommen
(function (document) {
    const markers = [...document.querySelectorAll('mark')];
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.8
    });
  
    markers.forEach(mark => {
      observer.observe(mark);
    });
  })(document);
  
  const text = `„Wer die Ruhe sucht, wird sie nicht in Ischgl, sondern in kleinen Seitentälern finden – etwa im Lesachtal oder am Arlberg bei Sonnenaufgang.“`;
  const target = document.getElementById("type-text");
  let i = 0;
  let hasTyped = false;
  
  function typeWriter() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasTyped) {
        typeWriter();
        hasTyped = true;
        observer.unobserve(entry.target); // nur 1× ausführen
      }
    });
  }, {
    threshold: 0.6,
  });
  
  observer.observe(document.querySelector(".typewriter"));
  