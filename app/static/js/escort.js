document.addEventListener("DOMContentLoaded", function () {
  var mapButton = document.querySelector(".map-button");
  var imgModal = document.querySelector(".img-modal");
  var closeButton = document.querySelector(".close-btn");

  // 버튼 클릭 시 모달 열기
  mapButton.addEventListener("click", function () {
    imgModal.style.display = "block";
  });

  // 닫기 버튼 클릭 시 모달 닫기
  closeButton.addEventListener("click", function () {
    imgModal.style.display = "none";
  });

  // 모달 영역 외 클릭 시 모달 닫기
  imgModal.addEventListener("click", function (event) {
    if (event.target === imgModal) {
      imgModal.style.display = "none";
    }
  });
});

/*------------------------------------------------------------*/
var imgContainer = document.getElementById("imgContainer");

// 이미지에 대한 텍스트 배열
var buttonTexts = [
  "금남공원",
  "SC제일은행",
  "우리은행",
  "흥국화재",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "전일빌딩",
  "NH투자증권",
  "5.18 민주화운동 기록관",
  "네이버 파트너스퀘어",
  "무인로봇 실증센터",
];

// 이미지 버튼을 생성하는 함수
function createImageButton(id, value) {
  var imgButton = document.createElement("div");
  imgButton.id = id;
  imgButton.className = "image-button";
  imgButton.style.backgroundImage = "url('/static/img/" + value + ".jpg')";
  imgButton.style.backgroundSize = "cover";
  imgButton.onclick = function () {
    openModal(value);
  };

  var textOverlay = document.createElement("div");
  textOverlay.className = "text-overlay";
  textOverlay.innerText = buttonTexts[value - 1];
  imgButton.appendChild(textOverlay);

  return imgButton;
}

// 1부터 4까지의 이미지 버튼 생성
for (var i = 1; i <= 4; i++) {
  var imageButton = createImageButton("button" + i, i);
  imgContainer.appendChild(imageButton);
}

// 19부터 22까지의 이미지 버튼 생성
for (var j = 19; j <= 23; j++) {
  var imageButton = createImageButton("button" + j, j);
  imgContainer.appendChild(imageButton);
}

function openModal(value) {
  var modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.classList.add("open");

  var modalContent = document.querySelector(".exit-number h1");

  if (value === 23) {
    modalContent.innerText = "M3";
  } else {
    modalContent.innerText = value;
  }

  setTimeout(closeModal, 5000);
}

var imageButtons = document.getElementsByClassName("image-button");
var areaColorElements = document.getElementsByClassName("area-color");

// 초기에 모든 area-color 요소를 숨기기
for (var i = 0; i < areaColorElements.length; i++) {
  areaColorElements[i].style.opacity = "0";
  areaColorElements[i].style.transition = "opacity 1.5s ease";
}

// 이미지 버튼을 클릭하여 해당하는 area-color 요소를 토글하여 보이기/숨기기
for (var i = 0; i < imageButtons.length; i++) {
  imageButtons[i].addEventListener("click", function () {
    var index = Array.prototype.indexOf.call(imageButtons, this);
    // 클릭된 이미지 버튼에 대응하는 areaColorElements 요소가 존재하는지 확인
    if (index >= 0 && index < areaColorElements.length) {
      // 모든 areaColorElements 요소의 투명도를 초기화
      for (var j = 0; j < areaColorElements.length; j++) {
        areaColorElements[j].style.opacity = "0";
      }
      // 클릭된 이미지 버튼에 대응하는 areaColorElements 요소의 투명도를 설정
      areaColorElements[index].style.opacity = "1";
      openModal(value); // 모달 열기 함수 호출
    }
  });
}

var closeButton = document.querySelector(".btn-close");
closeButton.addEventListener("click", closeModal);

function closeModal() {
  var modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.classList.remove("open");
}

const exitVoiceTexts = {
  button1: "일번 출구 금남공원으로 안내합니다.",
  button2: "이번 출구 에스씨 제일 은행으로 안내합니다.",
  button3: "삼번 출구 우리 은행으로 안내합니다.",
  button4: "사번 출구 흥국화재로 안내합니다.",
  button19: "십구번 출구 전일빌딩으로 안내합니다.",
  button20: "이십번 출구 엔에이치 투자증권으로 안내합니다.",
  button21: "이십일번 출구 오일팔 민주화운동 기록관으로 안내합니다.",
  button22: "이십이번 출구 네이버 파트너 스퀘어로 안내합니다.",
  button23: "엠동 삼호 무인로봇 실증센터로 안내합니다.",
};

// 각 버튼에 대한 이벤트 리스너 추가
for (let i = 1; i <= 23; i++) {
  const buttonId = "button" + i;
  const button = document.querySelector("#" + buttonId + ".image-button");

  if (button) {
    button.addEventListener("click", () => {
      if (
        typeof SpeechSynthesisUtterance === "undefined" ||
        typeof window.speechSynthesis === "undefined"
      ) {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
        return;
      }

      const message = new SpeechSynthesisUtterance();
      message.lang = "kr";
      message.pitch = 1;
      message.rate = 1;
      message.volume = 1;

      if (exitVoiceTexts.hasOwnProperty(buttonId)) {
        message.text = exitVoiceTexts[buttonId];
        window.speechSynthesis.speak(message);
      }
    });
  }
}

/*----------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  var micButton = document.querySelector(".mic-button");
  var micIcon = micButton.querySelector("i");
  var micButtonLoader = micButton.querySelector(".mic-button-loader");
  var waveContainer = document.querySelector(".waveContainer");

  function hideWaveContainer() {
    waveContainer.style.display = "none";
  }

  // waveContainer를 보이는 함수
  function showWaveContainer() {
    waveContainer.style.display = "flex";
  }

  // 초기에 waveContainer를 숨김
  hideWaveContainer();

  // 음성 인식 관련 변수 및 설정
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  let recognitionActive = false; // 음성 인식 활성화 여부를 추적하기 위한 변수
  let isVoicePlayed = false; // 음성 안내 메시지 재생 여부를 추적하기 위한 변수

  // 마이크 버튼 클릭 시 음성 인식 시작 또는 종료
  micButton.addEventListener("click", function () {
    micIcon.classList.toggle("m-active");
    micButtonLoader.classList.toggle("active"); // mic-button-loader에 active 클래스를 토글합니다.

    if (!micIcon.classList.contains("m-active")) {
      hideWaveContainer();
    } else {
      showWaveContainer();
    }

    // 음성 인식 활성화 상태에 따라 시작 또는 종료
    if (!recognitionActive) {
      recognition.start();
      recognitionActive = true;
    } else {
      recognition.stop();
      recognitionActive = false;
    }
  });

  // 음성 인식 결과 처리
  recognition.addEventListener("result", (e) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      let transcript = e.results[i][0].transcript;

      if (!isVoicePlayed) {
        // 음성으로 인식된 문장에 따라 해당하는 버튼 클릭
        if (
          transcript.includes("일번") ||
          transcript.includes("일 번") ||
          transcript.includes("1번") ||
          transcript.includes("1 번") ||
          transcript.includes("금남") ||
          transcript.includes("공원")
        ) {
          clickButton("button1");
          isVoicePlayed = true;
        } else if (
          transcript.includes("이번") ||
          transcript.includes("이 번") ||
          transcript.includes("2번") ||
          transcript.includes("2 번") ||
          transcript.includes("SC") ||
          transcript.includes("sc") ||
          transcript.includes("제일은행")
        ) {
          clickButton("button2");
          isVoicePlayed = true;
        } else if (
          transcript.includes("삼번") ||
          transcript.includes("삼 번") ||
          transcript.includes("3번") ||
          transcript.includes("3 번") ||
          transcript.includes("우리") ||
          transcript.includes("은행")
        ) {
          clickButton("button3");
          isVoicePlayed = true;
        } else if (
          transcript.includes("사번") ||
          transcript.includes("사 번") ||
          transcript.includes("4번") ||
          transcript.includes("4 번") ||
          transcript.includes("흥국") ||
          transcript.includes("화재")
        ) {
          clickButton("button4");
          isVoicePlayed = true;
        } else if (
          transcript.includes("19") ||
          transcript.includes("19번") ||
          transcript.includes("19 번") ||
          transcript.includes("전일") ||
          transcript.includes("빌딩")
        ) {
          clickButton("button19");
          isVoicePlayed = true;
        } else if (
          transcript.includes("20") ||
          transcript.includes("20번") ||
          transcript.includes("20 번") ||
          transcript.includes("NH") ||
          transcript.includes("nh") ||
          transcript.includes("엔에이치") ||
          transcript.includes("투자") ||
          transcript.includes("증권")
        ) {
          clickButton("button20");
          isVoicePlayed = true;
        } else if (
          transcript.includes("21번") ||
          transcript.includes("21") ||
          transcript.includes("21 번") ||
          transcript.includes("518") ||
          transcript.includes("5.18") ||
          transcript.includes("민주화") ||
          transcript.includes("운동")
        ) {
          clickButton("button21");
          isVoicePlayed = true;
        } else if (
          transcript.includes("22번") ||
          transcript.includes("22") ||
          transcript.includes("22 번") ||
          transcript.includes("네이버") ||
          transcript.includes("스마트스퀘어")
        ) {
          clickButton("button22");
          isVoicePlayed = true;
        } else if (
          transcript.includes("무인") ||
          transcript.includes("로봇") ||
          transcript.includes("실증") ||
          transcript.includes("센터")
        ) {
          clickButton("button23");
          isVoicePlayed = true;
        }
        {
          hideWaveContainer(); // waveContainer 숨기기
          recognition.stop(); // 버튼 클릭 후 음성 인식 종료
          micIcon.classList.remove("m-active");
          micButtonLoader.classList.remove("active");
          recognitionActive = false;
          break;
        }
      }
    }
  });
  // 음성 인식 결과가 없는 상태로 인식이 종료되면 음성 안내 메시지 재생 상태를 초기화
  recognition.addEventListener("end", function () {
    if (!isVoicePlayed) {
      alert("단어 인식을 하지 못했습니다. 다시 시도해 주세요.");
    }
    isVoicePlayed = false;
  });
});

// 이미지 버튼 클릭 처리
function clickButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.click();
    hideWaveContainer(); // waveContainer 숨기기
    let micButton = document.querySelector(".mic-button");
    let micIcon = micButton.querySelector("i");
    let micButtonLoader = micButton.querySelector(".mic-button-loader");
    micIcon.classList.remove("m-active");
    micButtonLoader.classList.remove("active");
    recognitionActive = false;
    isVoicePlayed = false;
  }
}

// waveContainer를 숨기는 함수
function hideWaveContainer() {
  var waveContainer = document.querySelector(".waveContainer");
  waveContainer.style.display = "none";
}

// 문서 로드가 완료되면 버튼 클릭 이벤트 설정
document.querySelectorAll(".image-button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const buttonId = button.getAttribute("id").replace("button", ""); // 버튼의 ID에서 번호 추출
    clickButton(buttonId);
  });
});

// 음성 재생을 위한 변수
let welcomeVoice;

function playWelcomeVoice() {
  if (
    typeof SpeechSynthesisUtterance === "undefined" ||
    typeof window.speechSynthesis === "undefined"
  ) {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
    return;
  }

  welcomeVoice = new SpeechSynthesisUtterance();
  welcomeVoice.lang = "ko-KR";
  welcomeVoice.pitch = 1;
  welcomeVoice.rate = 1;
  welcomeVoice.volume = 1;
  welcomeVoice.text = "안녕하세요 써니봇입니다. 무엇을 도와드릴까요?";
  window.speechSynthesis.speak(welcomeVoice);
}

// 페이지를 이동할 때 음성 재생을 멈추는 함수
function stopWelcomeVoice() {
  if (welcomeVoice && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
}
