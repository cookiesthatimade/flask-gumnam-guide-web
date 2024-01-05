var imgContainer = document.getElementById("imgContainer");

// 이미지에 대한 텍스트 배열
var buttonTexts = [
  '금남공원',
  'SC제일은행',
  '우리은행',
  '한화투자증권',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  '전일빌딩',
  'NH투자증권',
  '5.18 민주화운동 기록관',
  '농협중앙회'
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

function createImageButton(value) {
  var imgButton = document.createElement("div");
  imgButton.className = "image-button";
  imgButton.style.backgroundImage = "url('/static/img/" + value + ".jpg')";
  imgButton.style.backgroundSize = "cover";
  imgButton.onclick = function() {
    alert(value + '번 출입구로 안내를 시작합니다.');
    // 안내 시작에 대한 로직을 추가
  };

  // 텍스트 오버레이 추가
  var textOverlay = document.createElement("div");
  textOverlay.className = "text-overlay";
  textOverlay.innerText = buttonTexts[value - 1];
  imgButton.appendChild(textOverlay);

  return imgButton;
}