# server.py
from flask import Flask, render_template, redirect, Response
from flask_cors import CORS
from flask import jsonify
from flask_restplus import abort
import requests
from flask import Response
from flask import request
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)

apiKey = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak'

NEXT_PG_TKN = ''  # global variable tracking next videos token
PREV_PG_TKN = ''  # global variable tracking prev videos token
NEXT_CM_TKN = ''  # global variable tracking next comments token
NEXT_VD_ATH = ''  # global variable tracking next videos by author token
PREV_VD_ATH = ''  # global variable tracking prev videos by author token


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


def comments_helper(original_r_text):
    data = json.loads(original_r_text)
    global NEXT_CM_TKN  # to be used later to get more comments
    if 'nextPageToken' in data:
        NEXT_CM_TKN = data['nextPageToken']

    comments = data['items']
    comment_profiles = []

    for comment in comments:
        comment_profile = {
            'author': comment['snippet']['topLevelComment']['snippet']['authorDisplayName'],
            'text': comment['snippet']['topLevelComment']['snippet']['textDisplay'],
            'id': comment['id']
        }
        comment_profiles.append(comment_profile)

    resp = jsonify(comment_profiles)
    resp.status_code = 200
    return resp

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


@app.route('/')
def entry_point():
    '''
    Main Entry point for application that server the index html page
    that is embeded with React js code that renders the home component.
    '''
    return render_template('index.html')


@app.route('/detail/<videoId>')
def details(videoId):
    '''
    Responsible for re routing path back to React to be handled
    by react router
    '''
    return render_template('index.html')


@app.route("/api/v0/getVideos")
def getVideos():
    '''
    Get the intial videos that will be rendered in the react home page component
    '''
    videos = get_videos(add_searchTerm_to_end_point_helper(searchTerm='surfing'))
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/getMoreVideos")
def getMoreVideos():
    '''
    When client wants to render more videos beyond the intially rendered
    videos
    '''
    global NEXT_PG_TKN
    next_page_endPoint = add_token_to_end_point_helper(NEXT_PG_TKN)
    videos = get_videos(next_page_endPoint)
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/getPreviousVideos")
def getPreviousVideos():
    '''
    When client wants to render the previous set of video clips on the home page
    for infinite pagination implementation
    '''
    global PREV_PG_TKN
    print(PREV_PG_TKN)
    prev_page_endPoint = add_token_to_end_point_helper(PREV_PG_TKN)
    videos = get_videos(prev_page_endPoint)
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route("/api/v0/search/<searchTerm>")
def search(searchTerm):
    '''
    Handle client search request, in the format surf+searchTerm
    '''
    new_term = 'surfing+{}'.format(searchTerm)
    global NEXT_PG_TKN
    global PREV_PG_TKN
    NEXT_PG_TKN = ''
    PREV_PG_TKN = ''
    videos = get_videos(add_searchTerm_to_end_point_helper(new_term))
    resp = jsonify(videos)
    resp.status_code = 200
    return resp


@app.route('/api/v0/getVideoComments/<videoId>')
def get_video_comments(videoId):
    '''
    Get comments for a video
    '''
    url = "https://www.googleapis.com/youtube/v3/commentThreads?key={}" \
          "&textFormat=plainText&part=snippet&videoId={}&maxResults=15".format(apiKey, videoId)
    r = requests.get(url)
    resp = comments_helper(r.text)
    return resp


@app.route('/api/v0/getVideoDetails/<videoId>')
def get_video_details(videoId):
    """
    Get video details for a particular video based on videoId
    """
    url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={}' \
          '&key={}'.format(videoId, apiKey)
    r = requests.get(url)
    # convert to dict
    data = json.loads(r.text)
    data_items = data['items']
    # get necessary data
    for item in data_items:
        data_item = {
            'title': item['snippet']['title'],
            'description': item['snippet']['description'],
            'author': item['snippet']['channelTitle'],
            'channelId': item['snippet']['channelId'],
        }
    resp = jsonify(data_item)
    resp.status_code = 200
    return resp


@app.route('/api/v0/getOtherVideoByAuthor/<channelId>')
def get_other_videos_by_author(channelId):
    """
    Get 5 other videos by video author ordered by date created

    """
    url = 'https://www.googleapis.com/youtube/v3/search?' \
          'key={}&channelId={}&part=snippet&order=date&maxResults=5'.format(apiKey, channelId)
    # Error handling with flask_rest_plus
    # try:
    #
    # except:
    #     abort(500)
    r = requests.get(url)
    data = r.json()
    videos = data['items']
    global NEXT_VD_ATH
    if 'nextPageToken' in data:
        NEXT_VD_ATH = data['nextPageToken']
    refined_videos = []

    for video in videos:
        if 'videoId' in video['id']:
            refined_video = {
                'thumbnail_url': video['snippet']['thumbnails']['high']['url'],
                'thumbnail_width': video['snippet']['thumbnails']['high']['width'],
                'thumbnail_height': video['snippet']['thumbnails']['high']['height'],
                'videoId': video['id']['videoId'],
                'title': video['snippet']['title'],
                'description': video['snippet']['description']
            }
            refined_videos.append(refined_video)

    resp = jsonify(refined_videos)
    resp.status_code = 200
    return resp


@app.route('/api/v0/getNextOtherVideoByAuthor/<channelId>')
def get_next_other_videos_by_author(channelId):
    """
    Use the next video videos by author token to fetch videos specified by channelid
    """
    global NEXT_VD_ATH
    global PREV_VD_ATH
    if NEXT_VD_ATH != '':
        url = "https://www.googleapis.com/youtube/v3/search?" \
              "key={}" \
              "&channelId={}" \
              "&part=snippet" \
              "&order=date" \
              "&maxResults=5" \
              "&pageToken={}".format(apiKey, channelId, NEXT_VD_ATH)
        # TODO : Refactor using a helper
        # TODO : Implement previous functionality
        try:
            r = requests.get(url)
            data = r.json()
            videos = data['items']
            if 'nextPageToken' in data:
                NEXT_VD_ATH = data['nextPageToken']
            else:
                NEXT_VD_ATH = ''

            PREV_VD_ATH = data['prevPageToken']
            refined_videos = []
            for video in videos:
                refined_video = {
                'thumbnail_url': video['snippet']['thumbnails']['high']['url'],
                'thumbnail_width': video['snippet']['thumbnails']['high']['width'],
                'thumbnail_height': video['snippet']['thumbnails']['high']['height'],
                'videoId': video['id']['videoId'],
                'title': video['snippet']['title'],
                'description': video['snippet']['description']
                }
                refined_videos.append(refined_video)
            resp = jsonify(refined_videos)
            resp.status_code = 200
            return resp
        except:
            abort(500)
    else:
        re_route = '/api/v0/getOtherVideoByAuthor/{}'.format(channelId)
        return redirect(re_route, code=302)


@app.route('/api/v0/getPrevOtherVideoByAuthor/<channelId>')
def get_prev_other_videos_by_author(channelId):
    """
    Use the next video videos by author token to fetch videos specified by channelid
    """
    global NEXT_VD_ATH
    global PREV_VD_ATH
    if PREV_VD_ATH != '':
        url = "https://www.googleapis.com/youtube/v3/search?" \
              "key={}" \
              "&channelId={}" \
              "&part=snippet" \
              "&order=date" \
              "&maxResults=5" \
              "&pageToken={}".format(apiKey, channelId, PREV_VD_ATH)
        try:
            r = requests.get(url)
            data = r.json()
            videos = data['items']
            NEXT_VD_ATH = data['nextPageToken']
            if 'prevPageToken' in data:
                PREV_VD_ATH = data['prevPageToken']
            else:
                PREV_VD_ATH = ''

            if 'nextPageToken' in data:
                NEXT_VD_ATH = data['nextPageToken']

            refined_videos = []
            for video in videos:
                refined_video = {
                'thumbnail_url': video['snippet']['thumbnails']['high']['url'],
                'thumbnail_width': video['snippet']['thumbnails']['high']['width'],
                'thumbnail_height': video['snippet']['thumbnails']['high']['height'],
                'videoId': video['id']['videoId'],
                'title': video['snippet']['title'],
                'description': video['snippet']['description']
                }
                refined_videos.append(refined_video)
            resp = jsonify(refined_videos)
            resp.status_code = 200
            return resp
        except:
            abort(500)
    else:
        re_route = '/api/v0/getOtherVideoByAuthor/{}'.format(channelId)
        return redirect(re_route, code=302)


@app.route('/api/v0/getNextComments/<videoId>')
def get_next_comments(videoId):
    """
    Use the next comments using the next comments by author token to fetch videos specified by channelid
    """
    global NEXT_CM_TKN
    if NEXT_CM_TKN != '':
        url = "https://www.googleapis.com/youtube/v3/commentThreads?" \
              "key={}" \
              "&part=snippet" \
              "&videoId={}" \
              "&maxResults=15" \
              "&pageToken={}".format(apiKey, videoId, NEXT_CM_TKN)
        r = requests.get(url)
        resp = comments_helper(r.text)
        return resp
    else:
        re_route = '/api/v0/getVideoComments/{}'.format(videoId)
        return redirect(re_route, code=302)


if __name__ == "__main__":
    app.run(debug=True)
