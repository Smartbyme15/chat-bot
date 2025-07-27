const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

const topics = {
  "riddle": [
    { q: "What has keys but can't open locks?", a: "Keyboard" },
    { q: "What gets wetter the more it dries?", a: "Towel" },
    { q: "What has hands but can't clap?", a: "Clock" }
  ],
  "pattern": [
    { q: "What comes next? 2, 4, 8, 16, ?", a: "32" },
    { q: "What comes next? 1, 3, 6, 10, 15, ?", a: "21" },
    { q: "What comes next? 5, 10, 20, 40, ?", a: "80" }
  ],
  "odd one out": [
    { q: "Which is the odd one? Apple, Orange, Banana, Carrot", a: "Carrot" },
    { q: "Which is the odd one? Dog, Cat, Lion, Car", a: "Car" },
    { q: "Which is the odd one? Red, Blue, Circle, Green", a: "Circle" }
  ],
  "logic": [
    { q: "All apples are fruits. Some fruits are sweet. So, all apples are sweet. True or False?", a: "False" },
    { q: "If all cats are animals and some animals are black, can we say some cats are black?", a: "No" },
    { q: "If A is taller than B, and B is taller than C, who is the shortest?", a: "C" }
  ],
  "word": [
    { q: "Rearrange: 'ELOH' to make a word.", a: "HOLE" },
    { q: "Rearrange: 'NITELAS' to make a word.", a: "LATINES" },
    { q: "Rearrange: 'RACT' to form a vehicle.", a: "CART" }
  ],
  "gk": [
    { q: "Which planet is known as the Red Planet?", a: "Mars" },
    { q: "Who is the founder of Pakistan?", a: "Quaid-e-Azam" },
    { q: "What is the capital of Australia?", a: "Canberra" }
  ],
  "math": [
    { q: "If 3x = 15, what is x?", a: "5" },
    { q: "A rectangle has length 10 and width 4. What is its area?", a: "40" },
    { q: "What is 100 ÷ (5 × 2)?", a: "10" }
  ],
  "visual": [
    { q: "Which shape has 3 sides? Circle, Triangle, Square, Rectangle", a: "Triangle" },
    { q: "Which one is different: 🟥, 🟦, 🟧, 🟪, 🟫", a: "🟫" },
    { q: "Identify the mirror image of 'b'", a: "d" }
  ],
  "direction": [
    { q: "Ali faces north, turns right, then right again. What direction is he facing now?", a: "South" },
    { q: "Sara walks 5 steps east, then 5 west. Where is she now?", a: "Same place" },
    { q: "You are facing south and turn left. Which direction now?", a: "East" }
  ],
  "coding": [
    { q: "If CAT = DBU, then DOG = ?", a: "EPH" },
    { q: "If APPLE = 50, ORANGE = 60, what is GRAPE?", a: "55" },
    { q: "A=1, B=2,... What is the value of 'BAD'?", a: "7" }
  ]
};

let currentTopic = null;
let currentSet = [];
let currentIndex = 0;

function appendMessage(msg, sender) {
  const div = document.createElement("div");
  div.className = "chat-msg " + (sender === "bot" ? "bot-msg" : "user-msg");
  div.textContent = (sender === "bot" ? "🤖 " : "👩🏻 ") + msg;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleUserInput() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  input.value = "";

  if (!currentTopic) {
    const key = Object.keys(topics).find(t => userText.toLowerCase().includes(t));
    if (key) {
      currentTopic = key;
      currentSet = topics[key];
      currentIndex = 0;
      appendMessage(`Great! Let's start with ${currentTopic} questions.`, "bot");
      askNext();
    } else {
      appendMessage("❗ Please choose a valid topic like riddle, pattern, logic, gk, etc.", "bot");
    }
  } else {
    const correct = currentSet[currentIndex - 1].a.toLowerCase();
    if (userText.toLowerCase() === correct) {
      appendMessage("✅ Correct! Well done!", "bot");
    } else {
      appendMessage(`❌ Not quite. The correct answer was: ${correct}`, "bot");
    }

    if (currentIndex < currentSet.length) {
      askNext();
    } else {
      appendMessage("🎉 You’ve completed all questions for this topic! Type another topic to continue.", "bot");
      currentTopic = null;
    }
  }
}

function askNext() {
  appendMessage(currentSet[currentIndex].q, "bot");
  currentIndex++;
}
