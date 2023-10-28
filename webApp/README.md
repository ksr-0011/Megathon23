## Installations


# Greddiit using MERN STACK

### BONUS PARTS 

- Chats
- Back button disable
- Nested Comments
- Shortcut Keys
- Graphs for stats

## Instructions to run the code

* Run Express Backend:
```
cd backend/
npm install
npm run server
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```
- The frontend is hosted on port 3000 and backend on port 3001

## To run docker

* In the root directory run 
```
sudo docker-compose up --build
```

## Assumptions

* For Registration:
    * Age>18
    * Contact Number is of 10 digits

* A user can report a post multiple times
* All details cannot be edited
* A user is allowed to report their own post
* It is not necessary yo give a reason for a report
* All substrings of banned words are replaced. 
* If a user is blocked, they are kicked out of the subgreddiit but can request to join again just like any other user.
* If a post is ignored , it will stay there till it expires.(set to 10 days)
* The tokens in localStorage are not changed
