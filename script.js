// ========================
// โหลดข้อมูล localStorage
// ========================

const savedData =
  localStorage.getItem("hsk1");


// ถ้ามีข้อมูลเก่า

if (savedData) {

  hsk1.splice(
    0,
    hsk1.length,
    ...JSON.parse(savedData)
  );

}


// ========================
// HTML Elements
// ========================

const chineseText =
  document.getElementById("chinese");

const pinyinText =
  document.getElementById("pinyin");

const meaningText =
  document.getElementById("meaning");

const answerDiv =
  document.getElementById("answer");

const showBtn =
  document.getElementById("showBtn");

const randomBtn =
  document.getElementById("randomBtn");


// ========================
// สุ่มคำศัพท์
// ========================

function randomWord() {

  if (hsk1.length === 0) {

    chineseText.textContent =
      "ไม่มีคำศัพท์";

    pinyinText.textContent =
      "";

    meaningText.textContent =
      "";

    return;
  }


  const randomIndex =
    Math.floor(
      Math.random() * hsk1.length
    );


  const word =
    hsk1[randomIndex];


  chineseText.textContent =
    word.chinese;

  pinyinText.textContent =
    word.pinyin;

  meaningText.textContent =
    word.meaning;


  // ซ่อนคำตอบ

  answerDiv.classList.add("hidden");

  showBtn.textContent =
    "แสดงคำตอบ";

}


// ========================
// แสดงคำตอบ
// ========================

showBtn.addEventListener(
  "click",
  () => {

    answerDiv.classList.toggle("hidden");


    // เปลี่ยนข้อความปุ่ม

    if (
      answerDiv.classList.contains("hidden")
    ) {

      showBtn.textContent =
        "แสดงคำตอบ";

    } else {

      showBtn.textContent =
        "ซ่อนคำตอบ";

    }

  }
);


// ========================
// ปุ่มสุ่ม
// ========================

randomBtn.addEventListener(
  "click",
  randomWord
);


// ========================
// แสดงรายการ
// ========================

function renderList() {

  const wordList =
    document.getElementById("wordList");


  wordList.innerHTML = "";


  hsk1.forEach(
    (word, index) => {

      const li =
        document.createElement("li");


      li.innerHTML = `

        <b>${word.chinese}</b>

        <br>

        ${word.pinyin}

        <br>

        ${word.meaning}

      `;


      wordList.appendChild(li);

    }
  );

}


// ========================
// Save localStorage
// ========================

function saveData() {

  localStorage.setItem(
    "hsk1",
    JSON.stringify(hsk1)
  );

}


// ========================
// Start
// ========================

randomWord();

renderList();
