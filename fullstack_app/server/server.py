# server.py
from flask import Flask, render_template
from flask_cors import CORS
from flask import jsonify
import requests
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)

apiKey = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak'
youtube_endPoint = 'https://www.googleapis.com/youtube/v3/search?' \
           'key={}&' \
           'type=video&' \
           'part=snippet&' \
           'q={}&' \
           'maxResults=9'.format(apiKey, 'surfing')


def get_videos(source):
    videos_sum = []
    # Make request
    r = requests.get(source)
    data = json.loads(r.text)
    # nextPageTkn = data['nextPageToken']
    videos_list = data['items']

    for videos in videos_list:
        temp = {'videoId': videos['id']['videoId'],
                'title': videos['snippet']['title'],
                'description': videos['snippet']['description'],
                'thumbnails': videos['snippet']['thumbnails']['high']}
        videos_sum.append(temp)

    return videos_sum


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getVideos")
def getVideos():
    videos = get_videos(youtube_endPoint)
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


if __name__ == "__main__":
    app.run(debug=True)




