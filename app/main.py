from flask import Flask, request, render_template, jsonify
import pymysql
from flask_caching import Cache


app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'null'})

connection = pymysql.connect(host='43.203.1.73',
                             user='root',
                             password='#leeseun80',
                             db='subway',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/get_latest_data', methods=['GET'])
def get_latest_data():
    with connection.cursor() as cursor:
        # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
        cursor.execute(
            "SELECT * FROM `subway`.`sensing` ORDER BY `Date` DESC LIMIT 1;"
        )
        latest_data = cursor.fetchone()  # 최신 데이터 가져오기

        # 최신 데이터를 JSON 형식으로 변환하여 클라이언트에 반환
        return jsonify(latest_data)


@app.route('/', methods=['GET'])
def index():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`sensing` ORDER BY `Date` DESC LIMIT 300 OFFSET 0;")

        sensing_data = cursor.fetchone()  # 가져온 가장 최근 데이터를 변수에 저장

    # HTML 템플릿에 데이터 전달
    return render_template('index.html', sensing_data=sensing_data)


@app.route('/cos')
def cos():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`sensing` ORDER BY `Date` DESC LIMIT 300 OFFSET 0;")

        data = cursor.fetchall()  # 가져온 데이터를 변수에 저장
    # HTML 템플릿에 데이터 전달
    return render_template('cos.html', data=data)


@app.route('/info')
def info():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`subway` ORDER BY CASE `업종` WHEN '의류(옷/속옷)' THEN 1 WHEN '신발(잡화)' THEN 2 WHEN '보석' THEN 3 WHEN '화장품(미용)' THEN 4 WHEN '수선' THEN 5 WHEN '핸드폰' THEN 6 WHEN '기타' THEN 7 ELSE 8 END ASC,`위치` ASC LIMIT 300 OFFSET 0;")

        data = cursor.fetchall()  # 가져온 데이터를 변수에 저장
    # HTML 템플릿에 데이터 전달
    return render_template('info.html', data=data)


if __name__ == '__main__':
    app.run(debug=True)
