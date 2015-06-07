FROM google/nodejs

WORKDIR /app
ADD . /app
RUN npm install
RUN npm test
Run npm run build

EXPOSE 3000

CMD ["npm", "start"]
