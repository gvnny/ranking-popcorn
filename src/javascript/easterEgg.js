// Reference: https://github.com/WilliamDosSantos/T-Rex-Game-Com-JavaScript

const skeleton = document.querySelector(".skeleton");
const tree = document.querySelector(".tree");
const score = document.querySelector(".score");
let alreadyJump = false;
let count = 0;

document.addEventListener("keydown", (e) => {
  if ((e.code === "ArrowUp") | (e.code === "Space")) {
    jump();
  }
});

function jump() {
  if (!skeleton.classList.contains("jump")) {
    skeleton.classList.add("jump");
    alreadyJump = true;

    setTimeout(() => {
      skeleton.classList.remove("jump");
      alreadyJump = false;
    }, 1100);
  }
}

setInterval(() => {
  let skeletonBottom = parseInt(
    window.getComputedStyle(skeleton).getPropertyValue("bottom")
  );
  let treeLeft = parseInt(
    window.getComputedStyle(tree).getPropertyValue("left")
  );

  if (treeLeft > 40 && treeLeft < 270 && skeletonBottom <= 50 && !alreadyJump) {
    alert(`Game Over! Seu score foi: ${count}`);
    count = 0;
  }

  count++;
  score.innerHTML = `SCORE: ${count}`;
}, 10);