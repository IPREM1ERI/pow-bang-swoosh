import { Profile } from '../models/profile.js'

function index(req, res) {
  //console.log('profiles is hit')
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'Collector'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  console.log('show is hit')
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profile/show', {
      title: `👾 ${profile.name}'s collection`,
      profile,
      isSelf
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

export {
  index,
  show
}