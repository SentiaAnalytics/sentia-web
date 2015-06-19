FROM google/nodejs

ADD . .
RUN npm install
Run npm run build

EXPOSE 3000

CMD ["npm", "start"]
