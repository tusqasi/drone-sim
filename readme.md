# Drone simulator

Wanna fly a drone!! Don't have a bag a cash laying around your house? I got you. 

Introducing sore-mirror. A drone simulator playground. 


### Check out the hosted version of the sore-mirror


https://editor.p5js.org/tusqasi/full/IdEZbIjVG

## Folder structure

sore-mirror/   
The drone simulation runs in the p5JS project here. 

controller/  
The thing which will ouput thrust for the drone based on position info given by the sore-mirror

server/  
It will take messages from controller and sore-mirror and pass it on. It runs on websockets so latency is 🤌.

##  Running the project

You will need elixir and node installed. Highly recommend [asdf-vm]() for managing multiple sdks
