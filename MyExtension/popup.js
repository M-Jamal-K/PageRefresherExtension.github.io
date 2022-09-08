let minNum = document.querySelector("#minNum"),
  maxNum = document.querySelector("#maxNum"),
  buttonDiv = document.querySelector(".buttonDiv"),
  divTEST = document.querySelector(".TEST"),
  start_btn = document.querySelector(".start"),
  cond,
  myTabId,
  badgeText,
  intrvl;

buttonDiv.addEventListener("click", async (e) => {
  if (minNum.value && maxNum.value) {
    e.stopPropagation();
    if (e.target.classList.contains("start")) {
      e.target.disabled = true;
      cond = true;
      console.log("start");

      Refresher();
      setBadgeTxt();
    } else if (e.target.classList.contains("stop")) {
      console.log("stop");
      clearAll();
    } else {
      console.log("Click on Button idiot");
    }
  } else {
    alert("Input Value");
  }
});

function clearAll() {
  start_btn.disabled = false;
  cond = false;
  chrome.action.setBadgeText({
    text: "",
    tabId: myTabId
  });
  divTEST.innerHTML = "";
  clearInterval(intrvl);
}

let Refresher = async () => {
  if (cond) {
    let min = Math.floor(Math.abs(parseFloat(Number(minNum.value))));
    let max = Math.floor(Math.abs(parseFloat(Number(maxNum.value))));
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    badgeText = rand;
    console.log(rand);
    divTEST.innerHTML = `<h2>Wait For ${rand} Seconds</h2>`;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    myTabId = tab.id;
    console.log(myTabId);
    chrome.tabs.reload(parseInt(myTabId));
    setTimeout(Refresher, rand * 1000);
  }
};

function setBadgeTxt() {
  intrvl = setInterval(() => {
    console.log("setbadge");
    chrome.action.setBadgeText({
      text: `${badgeText--}`,
      tabId: myTabId
    });
  }, 1000);
}
