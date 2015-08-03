FROM google/nodejs

ADD . .
RUN npm install --prod

EXPOSE 3000

CMD ["npm", "start"]
