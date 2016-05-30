const bcrypt = require('bcrypt-nodejs')
const R = require('ramda')
var argv = require('minimist')(process.argv.slice(2));

const hash = password => {
  const salt = bcrypt.genSaltSync(10)
  const h = bcrypt.hashSync(password, salt)
  console.log(h)
}
hash(argv._[0])
