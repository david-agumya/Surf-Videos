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

