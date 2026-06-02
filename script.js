const openButton = document.getElementById("openButton");
const flowerStage = document.getElementById("flowerStage");
const particleLayer = document.getElementById("particleLayer");
const card = document.querySelector(".card");
const flowerFrame = document.querySelector(".flower-frame");

const particleColors = ["#ff7eb6", "#ffd1e6", "#ffe189", "#b9ffe7", "#ffffff", "#ffc6a8"];
const particleTypes = ["circle", "spark", "love", "petal", "ribbon"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(originX, originY) {
  const particle = document.createElement("span");
  const size = randomBetween(9, 24);
  const color = particleColors[Math.floor(Math.random() * particleColors.length)];
  const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
  const rotation = type === "love" ? randomBetween(-75, -25) : randomBetween(-140, 140);

  particle.className = `particle ${type}`;
  particle.style.setProperty("--x", `${originX + randomBetween(-130, 130)}px`);
  particle.style.setProperty("--y", `${originY + randomBetween(-90, 90)}px`);
  particle.style.setProperty("--dx", `${randomBetween(-330, 330)}px`);
  particle.style.setProperty("--dy", `${randomBetween(-380, 130)}px`);
  particle.style.setProperty("--size", `${size}px`);
  particle.style.setProperty("--color", color);
  particle.style.setProperty("--duration", `${randomBetween(1100, 2100)}ms`);
  particle.style.setProperty("--rotate", `${rotation}deg`);

  particleLayer.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove(), { once: true });
}

function burstParticles() {
  const flowerBox = flowerFrame.getBoundingClientRect();
  const originX = flowerBox.left + flowerBox.width / 2;
  const originY = flowerBox.top + flowerBox.height / 2;

  for (let i = 0; i < 96; i += 1) {
    window.setTimeout(() => createParticle(originX, originY), i * 8);
  }

  window.setTimeout(() => {
    for (let i = 0; i < 54; i += 1) {
      window.setTimeout(() => createParticle(originX, originY), i * 10);
    }
  }, 280);
}

openButton.addEventListener("click", () => {
  card.classList.add("opened");
  openButton.classList.add("is-hidden");
  flowerStage.classList.add("is-open");
  burstParticles();

  window.setTimeout(() => {
    openButton.style.display = "none";
  }, 260);
});
