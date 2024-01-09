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
  "농협중앙회",
];

// 1부터 4까지의 이미지 버튼 생성
for (var i = 1; i <= 4; i++) {
  var imageButton = createImageButton(i);
  imgContainer.appendChild(imageButton);
}

// 19부터 22까지의 이미지 버튼 생성
for (var j = 19; j <= 22; j++) {
  var imageButton = createImageButton(j);
  imgContainer.appendChild(imageButton);
}

// 이미지 버튼을 생성하는 함수
function createImageButton(value) {
  var imgButton = document.createElement("div");
  imgButton.className = "image-button";
  imgButton.style.backgroundImage = "url('/static/img/" + value + ".jpg')";
  imgButton.style.backgroundSize = "cover";
  imgButton.onclick = function () {
    alert(value + " 번 출입구로 안내를 시작합니다.");
    // 안내 시작에 대한 로직을 추가하세요.
    // 예를 들어, 해당 출입구에 대한 안내 기능을 구현할 수 있습니다.
  };

  var textOverlay = document.createElement("div");
  textOverlay.className = "text-overlay";
  textOverlay.innerText = buttonTexts[value - 1];
  imgButton.appendChild(textOverlay);

  return imgButton;
}

var imageButtons = document.getElementsByClassName("image-button");
var areaColorElements = document.getElementsByClassName("area-color");

// 모든 area-color 요소를 처음에 숨기기
for (var i = 0; i < areaColorElements.length; i++) {
  areaColorElements[i].style.opacity = "0"; // 초기에 투명도를 0으로 설정
  areaColorElements[i].style.transition = "opacity 1.5s ease"; // 트랜지션 효과 추가
}

// 이미지 버튼을 클릭하여 해당하는 area-color 요소를 토글하여 보이기/숨기기
for (var i = 0; i < imageButtons.length; i++) {
  imageButtons[i].addEventListener("click", function () {
    var index = Array.prototype.indexOf.call(imageButtons, this);
    for (var j = 0; j < areaColorElements.length; j++) {
      areaColorElements[j].style.opacity = "0"; // 모든 요소의 투명도를 0으로 설정
    }
    areaColorElements[index].style.opacity = "1"; // 클릭된 요소의 투명도를 1로 설정
  });
}
