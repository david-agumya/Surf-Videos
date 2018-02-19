import unittest
from server import app


class LoadingTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        # create test client
        self.app = app.test_client()
        # propagate the exceptions to the test client
        self.app.testing = True

    def tearDown(self):
        pass

    def test_home_status_code(self):
        # send HTTP GET request to the application
        result = self.app.get('/')
        # assert the status code of the response
        self.assertEqual(result.status_code, 200)

    def test_get_video_route(self):
        result = self.app.get('/api/v0/getVideos')
        self.assertEqual(result.status_code, 200)

    def test_get_more_videos_route(self):
        result = self.app.get('/api/v0/getMoreVideos')
        self.assertEqual(result.status_code, 200)

    def test_get_previous_videos_route(self):
        result = self.app.get('/api/v0/getPreviousVideos')
        self.assertEqual(result.status_code, 200)

    def test_search(self):
        sample_search_term = "seattle"
        result = self.app.get('/api/v0/search/{}'.format(sample_search_term))
        self.assertEqual(result.status_code, 200)

    def test_get_video_comments(self):
        sample_video_id = "CzmIrPvIzxk"
        result = self.app.get('/api/v0/getVideoComments/{}'.format(sample_video_id))
        self.assertEqual(result.status_code, 200)

    def test_get_next_comments(self):
        sample_video_id = "CzmIrPvIzxk"
        result = self.app.get('/api/v0/getNextComments/{}'.format(sample_video_id))
        # Test re-direct
        self.assertEqual(result.status_code, 302)

    def test_get_video_details(self):
        sample_video_id = "CzmIrPvIzxk"
        result = self.app.get('/api/v0/getVideoDetails/{}'.format(sample_video_id))
        self.assertEqual(result.status_code, 200)

    def test_get_other_videos_by_author(self):
        sample_channel_id = "UC1SqP7_RfOC9Jf9L_GRHANg"
        result = self.app.get('/api/v0/getOtherVideoByAuthor/{}'.format(sample_channel_id))
        self.assertEqual(result.status_code, 200)

    def test_get_next_other_videos_by_author(self):
        sample_channel_id = "UC1SqP7_RfOC9Jf9L_GRHANg"
        result = self.app.get('/api/v0/getNextOtherVideoByAuthor/{}'.format(sample_channel_id))
        self.assertEqual(result.status_code, 302)

    def test_get_prev_other_videos_by_author(self):
        sample_channel_id = "UC1SqP7_RfOC9Jf9L_GRHANg"
        result = self.app.get('/api/v0/getPrevOtherVideoByAuthor/{}'.format(sample_channel_id))
        self.assertEqual(result.status_code, 302)

    def test_not_found(self):
        result = self.app.get('/api/notFound')
        self.assertEqual(result.status_code, 404)

    # TODO : Implement tests for code 200
    # TODO : Test the content of the response body


if __name__ == '__main__':
    unittest.main()
