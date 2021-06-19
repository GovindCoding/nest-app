
# Dockerfile

# base image
# FROM node:13-alpine

# # create & set working directory
# RUN mkdir -p /home/app
# WORKDIR /home/app

# # copy source files
# COPY ./app /home/app

# # install dependencies
# RUN npm install

# # start app
# RUN npm run build
# EXPOSE 3000
# CMD npm run start


# error: build error: error building at STEP "COPY ./app /home/app": error adding sources 
# [/tmp/build/inputs/app]: error checking on source /tmp/build/inputs/app under "/tmp/build/inputs": 
# copier: stat: "/app": no such file or directory

FROM node:12.13-alpine As development

WORKDIR /home/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /home/app/dist ./dist

CMD ["node", "dist/main"]