from flask import Flask, Response, request, render_template, jsonify
import pymysql
import time
import json
from pytz import timezone
import pytz
from logging.config import dictConfig
import logging.handlers  # 필요한 모듈을 가져옵니다.
import threading  # threading 모듈 추가

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

# DB 연결에 대한 락
connection_lock = threading.Lock()


# DB 연결 설정
def get_connection():
    connection = pymysql.connect(host='43.203.1.73',
                                 user='root',
                                 password='#leeseun80',
                                 db='subway',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

connection1 = pymysql.connect(host='3.34.168.81',
                             user='stella',
                             password='1111',
                             db='sensor2',
                             cursorclass=pymysql.cursors.DictCursor)



@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/escort')
def escort():
    return render_template('escort.html')


@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/info')
def info():
    try:
        with connection_lock:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                     "SELECT * FROM `subway`.`subway` ORDER BY CASE `업종` WHEN '의류(옷/속옷)' THEN 1 WHEN '신발(잡화)' THEN 2 WHEN '보석' THEN 3 WHEN '화장품(미용)' THEN 4 WHEN '수선' THEN 5 WHEN '핸드폰' THEN 6 WHEN '기타' THEN 7 ELSE 8 END ASC,`위치` ASC LIMIT 300 OFFSET 0;")
                data = cursor.fetchall()

        return render_template('info.html', data=data)
    except Exception as e:
        app.logger.error("/info 라우트에서 오류 발생: %s", str(e))
        return "오류가 발생했습니다", 500


############################################################################################
###### SSE#####
############################################################################################

@app.route('/sensing_data')
def sensing_data():
    def respond_to_client():


        while True:
            connection1 = pymysql.connect(host='3.34.168.81',
                             user='stella',
                             password='1111',
                             db='sensor2',
                             cursorclass=pymysql.cursors.DictCursor)

            with connection1.cursor() as cursor:
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


if __name__ == '__main__':
    app.run(debug=True) # 배포 시에 debug=False, host='0.0.0.0', port=80