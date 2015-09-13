FROM google/nodejs

ADD . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
