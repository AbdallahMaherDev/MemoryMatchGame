document.querySelector(".control-buttons .start-btn").onclick = function () {
  let yourName = prompt("What's Your Name?");
  if (yourName == null || yourName.trim() === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

const duration = 1000;
const blockContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blockContainer.children);
const winOverlay = document.querySelector(".win-overlay");
const newGameBtn = document.querySelector(".new-game-btn");
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => flipBlock(block));
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  const allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function stopClicking() {
  blockContainer.classList.add("no-clicking");
  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  const triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    checkWin();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

function checkWin() {
  if (blocks.every((block) => block.classList.contains("has-match"))) {
    setTimeout(() => {
      winOverlay.classList.remove("hidden");
      winOverlay.querySelector(".new-game-btn").focus();
    }, 500);
  }
}

newGameBtn.onclick = function () {
  winOverlay.classList.add("hidden");
  blocks.forEach((block) => {
    block.classList.remove("is-flipped", "has-match");
  });
  document.querySelector(".tries span").innerHTML = "0";
  let yourName = prompt("What's Your Name?");
  if (yourName == null || yourName.trim() === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  shuffle(orderRange);
  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
  });
};
