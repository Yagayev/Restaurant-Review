# Restaurant review app
Based on react-redux-reducers-saga-webkit-express-mongoose. 
Made as the final project of the course Advanced Topics in Functional and Reactive Programming


To start the server:
1. start mongodb using mongod
2. node src\server\server.js # backend
3. npm run dev # frontend

This project is based on [this](https://github.com/majeek/simple-react-redux-reducers-saga-webkit-express-mongoose-boilerplate
) boilerplate, which subsequently is based on [this](https://github.com/wix-incubator/flickr-gallery-exam) code.


#### The model
The "main" component is the React-Router, which navigates between the 9 pages of the app. Those 9 pages are:
##### SearchEngine
Handles the input of the search functionality, and has RestSearch as a child that handles the results.
RestSearch has RestPreview as subcomponent that handles the presentation of each restaurant.
Both SearchEngine and RestSearch have their own Sagas and Reducers.

##### Login
Handles the login and signup(the page has 2 tabs to choose between the 2).
This component has it's own Saga and Reducer.

##### RestPage
Shows all the details of the restaurant, has RestPageReview as a subcomponent which handles the presentation of each individual reveiw.
This component has it's own Saga and Reducer.

##### UserPage
Shows all the details of the user, has UserPageReview as a subcomponent which handles the presentation of each individual reveiw.
This component has it's own Saga and Reducer.

##### AddReview
Has all the paramethers of a review, they are editable, and upon submiting them it creates/updates the user's review for that restaurant.
If the review already exists, it preloads the previews review, so the user only needs enter his changes.
This component has it's own Saga and Reducer.

##### UpdateUserDetails
Has all the paramethers of a user, they are editable, and upon submiting them it updates the user's details.
Any detail that is not specified is ignored.
This component has it's own Saga and Reducer.

##### SubmitRest
Has all the paramethers of a restaurant, they are editable, and upon submiting them it creates that restaurant.
This component has it's own Saga and Reducer.

##### UserSearch
Handles the searching of users.
This component has it's own Saga and Reducer.

##### PageNotFound
A simple default page for the router, in case of infalid URL.


The navigation between the pages is pretty straight forward - there's a navigation bar on top of each page with:
Home
My profile
Submit restaurant
User search
Disconnect

Wherever a username appears(be it in search results or within a review) clicking it will lead to that user's page.
Wherever a restaurant name appears(be it in search results, map(see extra features implemented), or within a review) clicking it will lead to that restaurant's page.
Within the restaurant page there is the option to add a review. Within every review, if it's by the connected user they can navigate to the AddReview page of that restaurant to edit the review.
If the user page is of the user connected, the user can navigate to the edit details.


#### Features implemented
Login and signup page, suggesting location from a list of all existing locations(see Locations Model)

Search by name and/or location, with auto complete from list of all locations.

Advanced search with filter by each criteria, reactive "closer-better" slider to determine how results are sorted.

Restaurant page with location, description, full scores, all reviews, option to add review.

User page with location, profile pictures, and all of the user's reviews. If viewing own page, ability to edit all details.

Each review has the name of the user/restaurant(depending on the page it's on), the user's profile picture near it's name. The name links to the user/restaurant full page.
All reviews show full review ratings, description, and photos(if there are any).
If it's your review you can edit the review, you can edit, delete, or add photos.

User search, showing all matching users while typing.

Disconnection

#### Extra features implemented:
In each user and restaurant saving coordinates of their location. The location input is done with a map.
In search results, added a button to view all the results on the map. The map shows all points as pins, and clicking them shows more details, and a link to the full restaurant page.
In each restaurant page, added a map showing it's location, and a "navigate" button, that opens navigation to the restaurant in google maps.


#### The models used:
###### User 
Contains all the basic details. The password is encrypted. Link to the image profile, and the unique ID that is used to delete the old image upon uploading a new one.
###### UserSession
Used to give the client a verifiable connection token upon login.
###### Restaurant
Contains the basic info. 
Also, the review count and average scores. Those are updated whenever a new review for this restaurant is added.
###### Review
Contains all review details, and the ID of the user and restaurant.
###### Locations
A singletone, containing an list of locations(as strings). 
Every time a location is posted, the location is added to the list if it's not already there.

#### Libraries used:  
bcrypt - for password encryption  
React-route - for routing between pages  
Leaflet-React - Maps  

Image hosting:  
multer  
cloudinary  
multer-storage-cloudinary  

UI:
Bootstrap
Primreact
react-star-ratings


#### Example of the flow

Let's look at the SearchEngine:

Initially, the reducers of SearchEngine and RestSearch load the initial state, which is 0 for all numeric values, and empty strings/arrays for all strings/arrays.

When the component mounts, it dispatches a loadLocationsAction, which is taken by the saga.
The Saga calls the URI '/api/reviews/locations' with no payload parameters.
This call is handled by the server, which calls Locations.findOne, and returns the result to the Saga.
The saga then dispatches a loadLocationsCompleteAction, which is handled by the reducer.
the SearchEngine reducer recieves this action and the previous state of SearchEngine, creates a new state where SearchEngine.locations is what was recived from the server.
And the new stat is then applied to the component's props.

Input changes:
Typing the restaurant name dispatches an updateNameAction with the new name as parameter.
Clicking "Advanced search" dispatches an advancedOpenAction without parameters.
clicking on a star in the advanced search dispatches an updateRatingHandler, with the field and the rating.
All the above are handled by the reducer, which recives the action and the previous state, creates a new state with the update, and returns.
The new state is than applied to the component's props, which updates it's view.

Upon clicking on "search", a loadRestsAction action is dispatched, with all the search parameters(from the props) as parameters.
This action is handled by the RestSearch saga.
It calls a post to the server on the URI '/api/reviews/findRestaurants', with the search parameters as the body, as well as the username and token(to verify the connection).
The server first varifies that the session is indeed legal and is matching the username.
Next, the server perfoms Restaurant.find() with the search parameters as filter(using GTE for the minimum ratings).
The results are then sorted by the a function that considers the rating and the distance(with importance of each are determined by distanceVsScore).
The sorted results are returned to the client.
The saga dispatches a loadRestsSuccessAction with the results.
The RestSearch reducer recieves the action and the previous state, creates a news state where the list of restaurants as the new "rests", and returns it.
This new state is applied to the RestSearch props.
The new props.rests is mapped to RestPreview components, which are then displayed.