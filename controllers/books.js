import { Book } from '../models/book.js'

function index(req, res) {
  Book.find({})
  .then(books => {
    res.render('books/index', {
      books,
      title: "Series"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.onGoing = !!req.body.onGoing
  Book.create(req.body)
  .then(book => {
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function show(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    res.render('books/show', {
      book,
      title: "book show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function createReview(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.reviews.push(req.body)
    book.save()
    res.redirect(`/books/${book._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    res.render('books/edit', {
      book,
      title: 'Edit Review'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  console.log(req.prarams.id, '***')
  console.log(req.body,'***')
  Book.findByIdAndUpdate(req.prarams.id, req.body, {new: true})
  .then(book => {
    res.redirect(`/books/${book._id}`)
  })
}

export {
  index,
  create,
  show,
  createReview,
  edit, 
  update
}


