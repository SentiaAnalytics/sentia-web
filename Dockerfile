FROM google/nodejs

ADD . .
RUN npm install --prod

RUN ls app/

EXPOSE 3000
EXPOSE 80

CMD ["npm", "start"]
