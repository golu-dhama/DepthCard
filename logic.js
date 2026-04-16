const card = document.querySelector(".card");

let rafId = null;

const intensity = 20; // shadow strength

card.addEventListener("mouseenter", () => {
  card.style.transition = "none";
});

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;

  const rotateX = percentY * -10;
  const rotateY = percentX * 10;

  // 🔥 LIGHT
  const lightX = (x / rect.width) * 100;
  const lightY = (y / rect.height) * 100;

  // 🔥 SHADOW (physics)
  const shadowX = -percentX * intensity;
  const shadowY = -percentY * intensity;

  cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    // 🔥 CARD TILT
    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    // 🔥 LIGHT FOLLOW
    card.style.setProperty("--light-x", `${lightX}%`);
    card.style.setProperty("--light-y", `${lightY}%`);

    // 🔥 SHADOW APPLY
    card.style.setProperty("--shadow-x", `${shadowX}px`);
    card.style.setProperty("--shadow-y", `${shadowY}px`);
  });
});

card.addEventListener("mouseleave", () => {
  cancelAnimationFrame(rafId);

  card.style.transition = "transform 0.5s ease";

  card.style.transform = `
    perspective(800px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;

  // reset
  card.style.setProperty("--light-x", "50%");
  card.style.setProperty("--light-y", "50%");
  card.style.setProperty("--shadow-x", "0px");
  card.style.setProperty("--shadow-y", "10px");
});