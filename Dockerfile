FROM node:5.0
ADD . .
RUN npm install --prod

EXPOSE 3000

CMD ["npm", "start"]
