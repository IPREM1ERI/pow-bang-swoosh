import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'

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
  //console.log('show is hit')
  Profile.findById(req.params.id)
  .populate('ownBook')
  .then(profile => {
    console.log(profile)
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
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

function addBook(req, res) {
  console.log(req.params)
  Profile.findById(req.params.id)
  .then(profile => {
    profile.ownBook.push(req.params.bookId)
    profile.save()
    .then(() => {
      res.redirect('/books')
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function deleteBook(req, res) {
  console.log('***DeleteBook fucntion***')
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.ownBook.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}



export {
  index,
  show,
  addBook,
  deleteBook
}