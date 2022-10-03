import { Profile } from '../models/profile.js'

function index(req, res) {
  //console.log('profiles is hit')
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: Collector
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index
}