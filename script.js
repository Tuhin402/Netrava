let prompt = document.querySelector(".prompt")
let container = document.querySelector(".container")
let chatContainer = document.querySelector(".chat-container")
let btn = document.querySelector(".btn")
let userMessage = null

const Api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyABZGUbBmjsgJpSycwGj_aVmYThN0a8AmI'
function createChatBox(html, className) {
  const div = document.createElement("div")
  div.classList.add(className)
  div.innerHTML = html;
  return div
}
async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text")
  try {
    const response = await fetch(Api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          "role": "user",
          "parts": [{ text: `${userMessage} in 10 words` }]
        }]
      })
    })
    const data = await response.json()
    const apiResponse = data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText = apiResponse
  }
  catch (error) {
    console.log(error)
  }
  finally {
    aiChatBox.querySelector(".loading").style.display = "none"
  }
}
function showLoading() {
  const html = ` <div class="text">
    </div>
    <img src="loading.gif" alt="" height="50" class="loading">`
  let aiChatBox = createChatBox(html, "ai-chat-box")
  chatContainer.appendChild(aiChatBox)
  generateApiResponse(aiChatBox)
}

btn.addEventListener("click", () => {
  userMessage = prompt.value;
  if (prompt.value = "") {
    container.style.display = "flex"
  } else {
    container.style.display = "none"
  }
  if (!userMessage) return;
  const html = ` <div class="text">
    </div>`
  let userChatBox = createChatBox(html, "user-chat-box")
  userChatBox.querySelector(".text").innerText = userMessage
  chatContainer.appendChild(userChatBox)
  prompt.value = ""
  setTimeout(showLoading, 500)

})

// banner script ====================================================================

const words = ["Assistant", "Bot", "Companion", "Helper"];
let currentIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 150;
const wait = 1000;
const typewriterElement = document.getElementById("typewriter");

function type() {
  const currentWord = words[currentIndex];

  if (!isDeleting) {
    currentText = currentWord.substring(0, currentText.length + 1);
    typewriterElement.textContent = currentText;

    if (currentText === currentWord) {
      setTimeout(() => {
        isDeleting = true;
      }, wait);
    }
  } else {
    currentText = currentWord.substring(0, currentText.length - 1);
    typewriterElement.textContent = currentText;

    if (currentText === "") {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? speed / 2 : speed);
}
type();

// navbar script =============================================================

const menuIcon = document.getElementById("menu-icon");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");

const toggleWebsitesBtn = document.getElementById('toggle-websites-btn');
const hiddenWebsites = document.getElementById('hidden-websites');
const arrowIcon = document.getElementById('arrow-icon');

menuIcon.addEventListener("click", function () {
  overlay.classList.add("open");
});

closeBtn.addEventListener("click", function () {
  overlay.classList.remove("open");
});

toggleWebsitesBtn.addEventListener("click", function () {
  if (hiddenWebsites.style.maxHeight === "0px" || hiddenWebsites.style.maxHeight === "") {
    hiddenWebsites.style.maxHeight = hiddenWebsites.scrollHeight + "px";
    arrowIcon.classList.remove("fa-circle-chevron-down");
    arrowIcon.classList.add("fa-circle-chevron-up");
  } else {
    hiddenWebsites.style.maxHeight = "0px";
    arrowIcon.classList.remove("fa-circle-chevron-up");
    arrowIcon.classList.add("fa-circle-chevron-down");
  }
});