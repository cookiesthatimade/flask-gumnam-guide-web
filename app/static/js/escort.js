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
];

// 1부터 4까지의 이미지 버튼 생성
for (var i = 1; i <= 4; i++) {
  var imageButton = createImageButton("button" + i, i);
  imgContainer.appendChild(imageButton);
}

// 19부터 22까지의 이미지 버튼 생성
for (var j = 19; j <= 22; j++) {
  var imageButton = createImageButton("button" + j, j);
  imgContainer.appendChild(imageButton);
}

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

function openModal(value) {
  var modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.classList.add("open");

  var modalContent = document.querySelector(".exit-number h1");
  modalContent.innerText = value;

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
    for (var j = 0; j < areaColorElements.length; j++) {
      areaColorElements[j].style.opacity = "0";
    }
    areaColorElements[index].style.opacity = "1";
    openModal(value); // 모달 열기 함수 호출
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
  button2: "이번 출구 에스씨제일은행으로 안내합니다.",
  button3: "삼번 출구 우리은행으로 안내합니다.",
  button4: "사번 출구 흥국화재로 안내합니다.",
  button19: "십구번 출구 전일빌딩으로 안내합니다.",
  button20: "이십번 출구 엔에이치엔투자증권으로 안내합니다.",
  button21: "이십일번 출구 오일팔 민주화운동 기록관으로 안내합니다.",
  button22: "이십이번 출구 네이버 파트너스퀘어로 안내합니다.",
};

// 각 버튼에 대한 이벤트 리스너 추가
for (let i = 1; i <= 22; i++) {
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
