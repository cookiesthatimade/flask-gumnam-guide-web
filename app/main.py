from flask import Flask, Response, request, render_template, jsonify
import pymysql
import time
import json
from pytz import timezone
import pytz

app = Flask(__name__)

connection = pymysql.connect(host='43.203.1.73',
                             user='root',
                             password='#leeseun80',
                             db='subway',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/escort')
def escort():
    return render_template('escort.html')


@app.route('/info')
def info():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`subway` ORDER BY CASE `업종` WHEN '의류(옷/속옷)' THEN 1 WHEN '신발(잡화)' THEN 2 WHEN '보석' THEN 3 WHEN '화장품(미용)' THEN 4 WHEN '수선' THEN 5 WHEN '핸드폰' THEN 6 WHEN '기타' THEN 7 ELSE 8 END ASC,`위치` ASC LIMIT 300 OFFSET 0;")

        data = cursor.fetchall()  # 가져온 데이터를 변수에 저장
    # HTML 템플릿에 데이터 전달
    return render_template('info.html', data=data)


############################################################################################
###### SSE#####
############################################################################################

@app.route('/sensing_data')
def sensing_data():
    def respond_to_client():

        korea_tz = timezone('Asia/Seoul')  # 대한민국 시간대
        utc_tz = pytz.utc  # UTC 시간대

        while True:
            connection = pymysql.connect(host='43.203.1.73',
                                         user='root',
                                         password='#leeseun80',
                                         db='subway',
                                         cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
                cursor.execute(
                    "SELECT * FROM `subway`.`sensing` ORDER BY `Date` DESC LIMIT 1;")
                latest_data = cursor.fetchone()  # 최신 데이터 가져오기

                # UTC로부터 대한민국 시간대로 변환
                korea_time = latest_data['Date'].replace(
                    tzinfo=utc_tz).astimezone(korea_tz)

                # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
                _data = json.dumps({'Date': korea_time.strftime("%Y-%m-%d %H:%M:%S"), 'temperature': latest_data['temperature'], 'humidity': latest_data['humidity'],
                                    'co2': latest_data['co2'], 'lux': latest_data['lux'], 'foot': latest_data['foot'], 'fire': latest_data['fire']})

                yield f"id: 1\ndata: {_data}\nevent: online\n\n"
                time.sleep(3000)  # 5초로 설정

    return Response(respond_to_client(), mimetype='text/event-stream')


if __name__ == '__main__':
    app.run(debug=True)
