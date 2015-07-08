FROM google/nodejs

ADD . .
RUN npm install --prod

RUN ls app/

EXPOSE 3000

CMD ["npm", "start"]
