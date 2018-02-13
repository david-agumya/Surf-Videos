## First Goal 
___
Create a MVP, minimum viable product from the intial README, for this i elect to build it solely in React
whereby i am putting my logic in the view as well to build the application as fast as possible to minal 
required functionality. 

## Second Goal : Build out a service layer in flask with the required API calls from React 
____
It is an anti pattern to put the logic of an application into the view, therefore for the second goal, now that i 
have explored the calls that i need to make from my application to the `YOUTUBE DATA API` i need to redesign those 
to make calls to my service built in flask. Rather than the youtube API. Subsequently the flask service will make the
calls to the YOUTUBE API, thus separating my view from the controller, making my application more modular and less tightly
coupled. 

#### How to achieve this
___
+ Design api and routes for second layer service. These will be used react as react acts as the view. 
+ Design required calls to youtube API. 
+ Create a new branch to implement this functionality, that way i keep the initial branch to fall back to and if the 
service implementation produces better results i can switch that code to the main branch. 
#### Posible benefits 
___
+ By de coupling my logic from my view i hope to get a faster performance from my view which will benefit the user. 
+ Possible use of caching of pages and results from youtube in the service implementation resulting in less calls to the YOUTUBE API.  

### Technology
___
+  React - Front End Framework - Rendering the Application View
+  Flask - Server side Micro framework - Application logic - 
>> Making api Calls to youtube to get data and pass it to React  


### Api Layer 
+ /api/v0/getVideos - Get the initial surf videos to render to the home page  
+ /api/v0/getMoreVideos - After initial videos are rendered to homepage this route is called to load the next set of videos  
+ /api/v0/getPreviousVideos - After the next videos are rendered, if the user wants to go back to the previous set of videos then this route is called  
+ /api/v0/search/<searchTerm> - Route used to search for youtube videos. Search terms is added to "surf" before the request is initiated to youtube api.  
+ /api/v0/getVideoComments/<videoId> - Get video comments for the video specified by video Id  
+ /api/v0/getVideoDetails/<videoId> - Get video details such as title and description for the video specified by the videoId  
+ api/v0/getOtherVideosByAuthor/<channelId> - Get other videos from the same channelId / same channel
+ api/v0/getNextOtherVideosByAuthor/<channelId> - Get next set of videos to be loaded from the same channel id.  
+ api/v0/getPrevOtherVideoByAuthor/<channelId> - Get previous set of videos to the loaded from the same channel id.
+ api/v0/getNextComments/<videoId> - Get next set of comments for the video specified by videoId

