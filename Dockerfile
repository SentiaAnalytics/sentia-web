FROM node:4
ADD . .
RUN npm install --prod

EXPOSE 3000

CMD ["npm", "start"]
