# server.py
from flask import Flask, render_template, redirect, make_response
from flask_cors import CORS
from flask import jsonify
import requests
from flask import Response
from flask import request
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)

apiKey = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak'

NEXT_PG_TKN = ''
PREV_PG_TKN = ''


def add_token_to_end_point_helper(nextPgTkn):
    next_page_end_point = 'https://www.googleapis.com/youtube/v3/search?' \
                         'key={}&' \
                         'type=video&' \
                         'part=snippet&' \
                         'q={}&' \
                         'maxResults=10&' \
                         'pageToken={}'.format(apiKey, 'surfing', nextPgTkn)
    return next_page_end_point


def add_searchTerm_to_end_point_helper(searchTerm='surfing'):

    youtube_endPoint = 'https://www.googleapis.com/youtube/v3/search?' \
                       'key={}&' \
                       'type=video&' \
                       'part=snippet&' \
                       'q={}&' \
                       'maxResults=10'.format(apiKey, searchTerm)

    return youtube_endPoint

def get_videos(source):
    videos_sum = []
    # Make request
    r = requests.get(source)
    # Raise error if request failed
    # TODO : Handle error in api call
    data = json.loads(r.text)
    global NEXT_PG_TKN
    global PREV_PG_TKN
    if 'nextPageToken' in data:
        NEXT_PG_TKN = data['nextPageToken']

    videos_list = data['items']

    if 'prevPageToken' in data:
        PREV_PG_TKN = PREV_PG_TKN

    for videos in videos_list:
        temp = {'videoId': videos['id']['videoId'],
                'title': videos['snippet']['title'],
                'description': videos['snippet']['description'],
                'thumbnails': videos['snippet']['thumbnails']['high']
                }
        videos_sum.append(temp)

    return videos_sum

# @app.route('/videoDetail')
# @app.route('/')
# def index():
#     return render_template('index.html')
#
# @app.route('/videoDetail/<videoId>')
# def videos(videoId):
#     return render_template("index.html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


# @app.route('/videoDetail')
# def details():
#     return render_template(".html")



@app.route("/api/v0/getVideos")
def getVideos():
    videos = get_videos(add_searchTerm_to_end_point_helper(searchTerm='surfing'))
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/getMoreVideos")
def getMoreVideos():
    global NEXT_PG_TKN
    next_page_endPoint = add_token_to_end_point_helper(NEXT_PG_TKN)
    videos = get_videos(next_page_endPoint)
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/getPreviousVideos")
def getPreviousVideos():
    global PREV_PG_TKN
    print(PREV_PG_TKN)
    prev_page_endPoint = add_token_to_end_point_helper(PREV_PG_TKN)
    videos = get_videos(prev_page_endPoint)
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/search/<searchTerm>")
def search(searchTerm):
    new_term = 'surfing+{}'.format(searchTerm)
    global NEXT_PG_TKN
    global PREV_PG_TKN
    NEXT_PG_TKN = ''
    PREV_PG_TKN = ''
    videos = get_videos(add_searchTerm_to_end_point_helper(new_term))
    resp = jsonify(videos)
    resp.status_code = 200
    return resp



if __name__ == "__main__":
    app.run(debug=True)




