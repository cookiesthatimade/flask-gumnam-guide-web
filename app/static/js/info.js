const sliderContainer = document.querySelector(".slider");

// 이미지 파일명을 저장한 배열
const imageFileNames = [];
for (let i = 1; i <= 20; i++) {
  imageFileNames.push(`img-${i}.png`);
}

// 이미지를 슬라이더에 추가
imageFileNames.forEach((fileName) => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<img src="static/img/${fileName}" alt="" onclick="openModal('${fileName}')">`;
  sliderContainer.appendChild(div);
});

// 슬라이더 기능 추가 (이미지 슬라이드)
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const slider = document.querySelector(".slider");

nextButton.addEventListener("click", () => {
  slider.scrollBy({
    left: slider.offsetWidth,
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", () => {
  slider.scrollBy({
    left: -slider.offsetWidth,
    behavior: "smooth",
  });
});

console.log(imageDescriptions);

const images = document.querySelectorAll(".slider .item img");
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openModal(imageFileNames[index], imageDescriptions[index]);
  });
});

// 모달에 이미지와 텍스트를 표시하는 함수
function openModal(fileName, description) {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");

  // 이미지 태그 생성
  const imgElement = document.createElement("img");
  imgElement.src = "static/img/" + fileName;
  imgElement.alt = "Image";

  // 텍스트 요소 생성
  const textElement = document.createElement("div");
  textElement.innerHTML = `
        상가명: ${description.name}<br />
        카테고리: ${description.category}<br />
        위치: ${description.location}
      `;
  textElement.style.color = "black";
  textElement.style.fontSize = "20px";

  // 모달 내용 초기화 후 이미지와 텍스트 추가
  modalContent.innerHTML = "";
  modalContent.appendChild(imgElement);
  modalContent.appendChild(textElement);

  // 모달 열기
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

closeModal();
