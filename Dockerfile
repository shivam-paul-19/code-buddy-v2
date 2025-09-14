# pull the mode image first, version 20.15.1
FROM node:20.15.1

# set the working directory
WORKDIR /home/app

# copy package files to the working directory)
COPY package*.json .

# install dependecies
RUN npm install

# copy rest of the file in the directory
COPY . .

# expose the port
EXPOSE 5173

# run the application in dev mode
CMD ["npm", "run", "dev"]