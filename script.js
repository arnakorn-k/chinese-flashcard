// ========================
// โหลดข้อมูล localStorage
// ========================

const savedData =
  localStorage.getItem("vocabulary");


// ถ้ามีข้อมูลเก่า

if (savedData) {

  vocabulary.splice(
    0,
    vocabulary.length,
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

const addBtn =
  document.getElementById("addBtn");

const inputChinese =
  document.getElementById("inputChinese");

const inputPinyin =
  document.getElementById("inputPinyin");

const inputMeaning =
  document.getElementById("inputMeaning");


// ========================
// สุ่มคำศัพท์
// ========================

function randomWord() {

  if (vocabulary.length === 0) {

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
      Math.random() * vocabulary.length
    );


  const word =
    vocabulary[randomIndex];


  chineseText.textContent =
    word.chinese;

  pinyinText.textContent =
    word.pinyin;

  meaningText.textContent =
    word.meaning;


  // ซ่อนคำตอบ

  answerDiv.classList.add("hidden");

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
// เพิ่มคำศัพท์
// ========================

addBtn.addEventListener(
  "click",
  () => {

    const chinese =
      inputChinese.value.trim();

    const pinyin =
      inputPinyin.value.trim();

    const meaning =
      inputMeaning.value.trim();


    if (
      chinese === "" ||
      pinyin === "" ||
      meaning === ""
    ) {

      alert("กรอกข้อมูลให้ครบ");

      return;
    }


    const newWord = {

      chinese: chinese,

      pinyin: pinyin,

      meaning: meaning

    };


    vocabulary.push(newWord);


    saveData();

    renderList();


    inputChinese.value = "";

    inputPinyin.value = "";

    inputMeaning.value = "";


    alert("เพิ่มคำศัพท์แล้ว");

  }
);


// ========================
// แสดงรายการ
// ========================

function renderList() {

  const wordList =
    document.getElementById("wordList");


  wordList.innerHTML = "";


  vocabulary.forEach(
    (word, index) => {

      const li =
        document.createElement("li");


      li.innerHTML = `

        <b>${word.chinese}</b>

        <br>

        ${word.pinyin}

        <br>

        ${word.meaning}

        <br><br>

        <button onclick="deleteWord(${index})">

          ลบ

        </button>

      `;


      wordList.appendChild(li);

    }
  );

}


// ========================
// ลบคำศัพท์
// ========================

function deleteWord(index) {

  vocabulary.splice(index, 1);

  saveData();

  renderList();

}


// ========================
// Save localStorage
// ========================

function saveData() {

  localStorage.setItem(
    "vocabulary",
    JSON.stringify(vocabulary)
  );

}


// ========================
// Start
// ========================

randomWord();

renderList();