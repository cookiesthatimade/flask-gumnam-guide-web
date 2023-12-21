var radioContainer = document.getElementById("radioContainer");

for (var i = 1; i <= 22; i++) {
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "radio" + i;
    radio.name = "number";
    radio.value = i;

    var label = document.createElement("label");
    label.htmlFor = "radio" + i;
    label.innerText = i;

    radioContainer.appendChild(radio);
    radioContainer.appendChild(label);
}

function startGuide() {
    var selectedNumber = document.querySelector('input[name="number"]:checked');
    if (selectedNumber) {
        alert(selectedNumber.value + '번 출입구로 안내를 시작합니다.');
        // 여기에 안내 시작에 대한 로직 추가
    } else {
        alert('라디오 버튼을 선택하세요.');
    }
}

var mapOptions = {
    center: new naver.maps.LatLng(35.14863950517846, 126.91899292171), // 출입구 위치 좌표로 변경
    zoom: 17, // 지도 확대 레벨 조정
};

var map = new naver.maps.Map('map', mapOptions);

// 출입구 위치에 마커 추가
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.14863950517846, 126.91899292171), // 출입구 위치 좌표로 변경
    map: map,
});