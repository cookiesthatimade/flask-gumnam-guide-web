from flask import Flask, Response, request, render_template, jsonify
import pymysql
import time
import json
from pytz import timezone
import pytz
from logging.config import dictConfig
import logging.handlers
import threading
import requests
from flask_cors import CORS
import base64

# my_settings.py 파일에서 설정 불러오기
from my_settings import DB_SETTINGS, SENSOR_DB1_SETTINGS, SENSOR_DB2_SETTINGS, API_KEY

# 로깅 설정 구성
dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'test_error.log',
            'maxBytes': 1024 * 1024 * 5,  # 5 MB
            'backupCount': 5,
            'formatter': 'default',
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['file']
    }
})


app = Flask(__name__)
CORS(app, resources={r"/convert": {"origins": "http://localhost:5000"}})


# DB 연결에 대한 락
connection_lock = threading.Lock()


# DB 연결 설정
def get_connection():
    connection = pymysql.connect(host=DB_SETTINGS['host'],
                                 user=DB_SETTINGS['user'],
                                 password=DB_SETTINGS['password'],
                                 db=DB_SETTINGS['db'],
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/index2', methods=['GET', 'POST'])
def index2():
    return render_template('index2.html')


@app.route('/escort')
def escort():
    return render_template('escort.html')


@app.route('/info')
def info():
    return render_template('info.html')


@app.route('/news')
def news():
    return render_template('news.html')


############################################################################################
###### SSE#####
############################################################################################

@app.route('/sensing_data')
def sensing_data():
    def respond_to_client():

        while True:
            connection1 = pymysql.connect(host=SENSOR_DB1_SETTINGS['host'],
                                          user=SENSOR_DB1_SETTINGS['user'],
                                          password=SENSOR_DB1_SETTINGS['password'],
                                          db=SENSOR_DB1_SETTINGS['db'],
                                          cursorclass=pymysql.cursors.DictCursor)

            with connection1.cursor() as cursor:
                # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
                cursor.execute(
                    "SELECT * FROM `sensor`.`env_data` ORDER BY `date` DESC LIMIT 1;")
                latest_data = cursor.fetchone()  # 최신 데이터 가져오기

                # UTC로부터 대한민국 시간대로 변환
                korea_time = latest_data['date']

                # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
                _data = json.dumps({'Date': korea_time.strftime("%Y-%m-%d %H:%M:%S"), 'temperature': latest_data['temperature'], 'humidity': latest_data['humidity'],
                                    'co2': latest_data['co2'], 'lux': latest_data['lux'], 'voc': latest_data['voc']})

                yield f"id: 1\ndata: {_data}\nevent: online\n\n"
                time.sleep(5)  # 5초로 설정

    return Response(respond_to_client(), mimetype='text/event-stream')


@app.route('/sensing_data2')
def sensing_data2():
    def respond_to_client():

        while True:
            connection2 = pymysql.connect(host=SENSOR_DB2_SETTINGS['host'],
                                          user=SENSOR_DB2_SETTINGS['user'],
                                          password=SENSOR_DB2_SETTINGS['password'],
                                          db=SENSOR_DB2_SETTINGS['db'],
                                          cursorclass=pymysql.cursors.DictCursor)

            with connection2.cursor() as cursor:
                # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
                cursor.execute(
                    "SELECT * FROM `sensor2`.`env_data` ORDER BY `date` DESC LIMIT 1;")
                latest_data = cursor.fetchone()  # 최신 데이터 가져오기

                # UTC로부터 대한민국 시간대로 변환
                korea_time = latest_data['date']

                # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
                _data = json.dumps({'Date': korea_time.strftime("%Y-%m-%d %H:%M:%S"), 'temperature': latest_data['temperature'], 'humidity': latest_data['humidity'],
                                    'co2': latest_data['co2'], 'lux': latest_data['lux'], 'voc': latest_data['voc']})

                yield f"id: 1\ndata: {_data}\nevent: online\n\n"
                time.sleep(5)  # 5초로 설정

    return Response(respond_to_client(), mimetype='text/event-stream')


@app.route('/transcribe', methods=['POST'])
def transcribe():
    data = request.json
    audio_content = data.get('audioContent')

    request_data = {
        "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": 16000,
            "languageCode": "ko-KR"
        },
        "audio": {
            "content": audio_content
        }
    }

    # Google Speech-to-Text API에 요청
    url = f'https://speech.googleapis.com/v1/speech:recognize?key={API_KEY}'
    response = requests.post(url, json=request_data)

    # 응답 반환
    return jsonify(response.json())


if __name__ == '__main__':
    # 배포 시에 debug=False, host='0.0.0.0', port=80
    # waitress 쓸 시 명령어 waitress-serve--listen=127.0.0.1:5000 main:app
    # gunicorn -w 4 -b 0.0.0.0:8000 main:app
    # '-w 4'는 4개의 워커 프로세스를 생성하겠다는 것, '-b 0.0.0.0:8000'는 모든 네트워크 인터페이스에서 8000번 포트로 바인딩
    # app.run(debug=True)
    app.run(debug=True)
