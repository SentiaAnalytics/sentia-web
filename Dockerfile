FROM google/nodejs

ADD . .
RUN npm install --prod
RUN npm run build

RUN ls app/

EXPOSE 3000

CMD ["npm", "start"]
