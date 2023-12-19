from flask import Flask, request, render_template, jsonify
import pymysql


app = Flask(__name__)

connection = pymysql.connect(host='43.203.1.73',
                             user='root',
                             password='#leeseun80',
                             db='subway',
                             cursorclass=pymysql.cursors.DictCursor)


def get_latest_data():
    with connection.cursor() as cursor:
        # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
        cursor.execute(
            "SELECT * FROM `subway`.`sensing` ORDER BY `Date` DESC LIMIT 1;"
        )
        latest_data = cursor.fetchone()  # 최신 데이터 가져오기

        # 최신 데이터를 Dictionary 형식으로 변환하여 클라이언트에 반환
        if latest_data:
            # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
            data_dict = {
                'Date': latest_data['Date'],
                'temperature': latest_data['temperature'],
                'humidity': latest_data['humidity'],
                'co2': latest_data['co2'],
                'lux': latest_data['lux'],
                'foot': latest_data['foot'],
                'fire': latest_data['fire']
            }
            return data_dict
        else:
            return {}  # 데이터가 없을 때는 빈 Dictionary 반환


@app.route('/', methods=['GET'])
def index():
    # 데이터베이스에서 최신 데이터 가져오기
    # get_latest_data 함수는 데이터베이스에서 데이터를 가져오는 함수입니다.
    latest_data = get_latest_data()

    # HTML 템플릿에 데이터 전달
    return render_template('index.html', sensing_data=latest_data)


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
