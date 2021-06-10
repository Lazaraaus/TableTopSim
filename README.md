# TableTopSim
> My overall goal when I started out was to build a Table Top Simulator that connected to a character generator. 
  I intended to use Enable3D, Sockiet.io, MongoDB, Vue, Phaser, Amazon S3 and Phaser-On-Node-JS. My intended audience 
  was role playing game players who needed a virtual space to play and couldn’t afford more expensive services like Roll20.net. 
  
> Unfortunately I wasn't able to successfully complete my project in the time frame but I do have a good baseline to continue to
  build upon. Hopefully within a month or two I have a working prototype up as intended, but for now excercise I had to pivot to 
  something a bit more manageable. Currently the project is a skeleton for a multiplayer card game platform. 
  
> I used Socket.io to connect players game instances together and allow for chat and game scene updates to be passed to all clients
  so every screen renders up to date information. I used Phaser to load sprites, images, build interactivity, and game logic. As it
  stands it's a glorified tech demo, demonstrating phaser + socket.io functionality. It allows users to "Deal Cards" getting the textures
  from an S3 Bucket I set up with card designs I created using pixel art (except for the card backs, those were free assets found online). 
  There is also some holdover functionality from the TableTopSim engine, passing "Make Hero" or "Make Card" into the chat spawns tokens
  on the game canvas as a "stand-in" for game pieces (hero's, dice, enemies, etc). Those were supposed to be the gameObjects I would render 
  in 3D on the fly, I obviously did not get there however. 
  
> There are some very real errors in the current state of the project. Events don't emit properly, I mistakenly set two socket connections
  for each client (1 in the game, 1 in the chat, they should be the same socket for both). There is no actual "game" being played, just 
  dragging and dropping cards, creating tokens, etc. No fleshed out user system, etc. 
  
  > Presentation Link: https://docs.google.com/presentation/d/1geYw3BQSg9_gjNbQ8GjCVX5vdn2kgfHOFj4S0Iaz340/edit?usp=sharing
  
# Install
1.) Clone Git Repo

2.) Navigate to TableTopSim/Server/

3.) Run "npm install"

4.) Run "npm run start"

5.) Navigate to TableTopSim/Client/

6.) Run "npm install"

7.) Run "npm run server"

8.) Navigate to localhost:8080
