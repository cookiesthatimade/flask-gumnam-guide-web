var radioContainer = document.getElementById("radioContainer");

// Create radio buttons from 1 to 6
for (var i = 1; i <= 6; i++) {
  var radio = createRadioButton(i);
  radioContainer.appendChild(radio);
}

// Create radio buttons from 17 to 22
for (var j = 17; j <= 22; j++) {
  var radio = createRadioButton(j);
  radioContainer.appendChild(radio);
}

function createRadioButton(value) {
  var radio = document.createElement("input");
  radio.type = "radio";
  radio.id = "radio" + value;
  radio.name = "number";
  radio.value = value;

  var label = document.createElement("label");
  label.htmlFor = "radio" + value;
  label.innerText = value;

  var wrapper = document.createElement("div");
  wrapper.appendChild(radio);
  wrapper.appendChild(label);

  return wrapper;
}

function startGuide() {
  var selectedNumber = document.querySelector('input[name="number"]:checked');
  if (selectedNumber) {
    alert(selectedNumber.value + "번 출입구로 안내를 시작합니다.");
    // 여기에 안내 시작에 대한 로직 추가
  } else {
    alert("라디오 버튼을 선택하세요.");
  }
}

// Rest of your map-related code remains unchanged
var mapOptions = {
  center: new naver.maps.LatLng(35.1476504, 126.9189039), // 출입구 위치 좌표로 변경
  zoom: 17, // 지도 확대 레벨 조정
};

var map = new naver.maps.Map("map", mapOptions);

// 출입구 위치에 마커 추가
var marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(35.1476504, 126.9189039), // 출입구 위치 좌표로 변경
  map: map,
});
