# Media Request

### Elevator Pitch

You know when you share a media server throughout your extended family and it is hard to communicate when you want a new movie or song to be added to the server. As an admin myself it can be tough to keep it all straight. Well, this media request web application will give everyone an opportunity to request any new thing they would like and it is easy for the admin to have one place where everyone has requested the things that they want. It will also be able to allow everyone to see what new thing has been requested so that they to can have the opportunity to view the media they may not have known they wanted to see. This way everyone can get what they want in the most efficient way possible.

### Design

This is an example of the Charles' Server page with an included notification in the corner

![Media Request Page Example](Pictures/Page_Example_For_Startup.png)

Here is an example of the login page

![Login Page Example](Pictures/Login_Page_For_Startup.png)

Here is a sequence diagram that shows how to people would interact with the backend to vote.

![Sequence Diagram Example](Pictures/Sequence_Diagram.jpg)

### Key features

- Secure login over HTTPS
- New requests are updated in real time
- Ability for a user to see all previous requests made by others
- All requests are stored in a permanent database
- Ability for admin to see and fulfill requests

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. A login page for creating a secure login. Two other pages to differentiate between the two media servers that exist.
- **CSS** - Styled to look nice, fits to different sized screens appropriately
- **JavaScript** - Allows the ability to input new requests, and the ability to switch between the two server pages.
- **Service** - Backend service with endpoints for:
  - login
  - alert about new requests
- **DB/Login** - Store users and requests in database. Register and login users. Credentials securely stored in database. Can't request unless authenticated.
- **WebSocket** - When a request is added, pushes that new request to all users as a notification.
- **React** - Application ported to use the React web framework.

### HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Three HTML pages that start with the Login page and then links to the Charles and Ryan Server pages.
- **Links** - The Login page links to the two other server pages to differentiate between the two servers that media requests will exist for.
- **Text** - There is text to describe who is logged in, where to put login information, and for the search bar to add movies.
- **Images** - A Plex logo image is included towards the top of each page, because both servers are Plex servers.
- **DB/Login** - Username text box and password input box for login. The list of previously requested movies and TV shows are listed as placeholder for the database.
- **WebSocket** - A notification of a newly added movie that will be pushed out to all users have been added as a placeholder in the far right of the screen on the server pages.