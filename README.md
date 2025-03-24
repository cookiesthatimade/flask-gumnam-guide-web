# 💁🏻‍♀️ flask-gumnam-guide-web(gumnam-underground-shopping-center) 💁🏻‍♀️



> 금남지하도상가의 환경정보와 출입구 안내 및 상가 정보를 담은 웹



➡️ **광주 MBC 촬영 영상** (이미지를 클릭하면 YouTube로 이동)
[![Image](https://github.com/user-attachments/assets/e9924821-8749-4864-b254-969d3ff5f64c)](https://youtu.be/LndJn0Z4PwM)


---

## 📖 프로젝트 소개

**flask-gumnam-guide-web**은 금남지하도상가 내 로봇(sunnybot)에 탑재된 웹 서비스로, 사용자가 상가 내 환경을 쉽게 파악하고 출입구까지 안내받을 수 있도록 설계되었습니다.

### 🔹 주요 기능

1. **실시간 환경 정보 제공**
   - 온도, 습도, 조도, 대기질, 화재 위험성, 유동인구 데이터를 센서에서 수집하여 제공
2. **출입구 안내 시스템**
   - 로봇 연동을 통해 출입구까지 이동 경로 안내 (음성인식 지원)
3. **상가 정보 제공**
   - 위치, 전화번호 등의 정보를 포함한 매장 리스트 제공
4. **광고 기능**
   - 로봇 후면 화면에 광고 콘텐츠 노출
---
## 🎥 데모

<p align="left">
    <img src="https://github.com/user-attachments/assets/49fa61b8-b9c3-4380-a161-2119d55ad99f" width="200" />
    <img src="https://github.com/user-attachments/assets/bb2bc783-26b3-41af-893e-72ded572fd49" width="200" />
    <img src="https://github.com/user-attachments/assets/7d5c02ee-e9eb-42e5-a656-3636d8805d70" width="200" />
  <br>
    <img src="https://github.com/user-attachments/assets/3dd824d6-33d8-4d86-87eb-003120a24213" width="200" />
    <img src="https://github.com/user-attachments/assets/403927dd-559f-40fb-a684-395c4a10097c" width="200" />
    
  <br>
    <img src="https://github.com/user-attachments/assets/56ccc73a-8d5a-45a7-8a0c-ccf7d2f80359" width="200" />
</p>

---

## ⭐ 핵심 기술
### 🗄 데이터베이스 & 실시간 데이터 처리

- **MySQL** (pymysql 사용)
- **Thread Lock** (threading.Lock) → DB 연결 동기화 보장
- **SSE(Server-Sent Events)** → 실시간 센서 데이터 제공

### 🎤 음성 인식 (STT) API 연동

- Google Speech-to-Text API 사용

### 🌍 웹 접근성 및 반응형 디자인 적용

- 다양한 디바이스에서 최적화된 UI 제공

---

## 💻 프로젝트 실행 방법

### 프로젝트 디렉터리 이동
```
cd app
```
### 가상 환경 생성
```
python3 -m venv env
```
### 가상 환경 활성화
```
source env/bin/activate
```
### 프로젝트 종속성 설치
```
pip install -r requirements.txt
```
### 서버 실행
```
python3 main.py
```
### ➡️ Go to localhost:5000

---

## 🔧 기술 스택

| **분류**            | **기술**                        |
| ----------------- | ----------------------------- |
| **언어**            | HTML, CSS, JavaScript, Python |
| **라이브러리 & 프레임워크** | Flask                         |
| **데이터베이스**        | MySQL                         |
| **배포 환경**         | AWS EC2, Docker               |
| **실행 환경**         | Gunicorn                      |

---

## 📁 프로젝트 구조

```markdown
src
├── app
│   ├── static
│   ├── templates
│   ├── main.py
│   └── my_settings.py (개별 작성 필요)
├── README.md
└── requirements.txt
```

---

## 👨‍💻 역할 및 기여

| 역할                 | 담당 업무                                                         |
| ------------------ | ------------------------------------------------------------- |
| **Frontend (Web)** | HTML, CSS, JavaScript (UI/UX 구현)                              |
| **Backend (Web)**  | Flask, MySQL, API 개발                                          |
| **DevOps**         | AWS EC2, Docker, Gunicorn 배포 및 환경 설정                          |
| **Etc**             | 데이터베이스 운영, 보안 설정 (SSL, CORS 등), Google STT API 활용, 광고 이미지 디자인 |

---

## 👨‍👩‍👧‍👦 Developer
*  **김성하** ([cookiesthatimade](https://github.com/cookiesthatimade))
*  **김성욱** ([seonguk0893](https://github.com/seonguk0893))
