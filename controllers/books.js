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
  console.log(req.body)
  req.body.owner = req.user.profile._id
  console.log(req.body)
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

function editReview(req, res) {
  console.log(req.params.id, '*')
  Book.findById(req.params.id)
  .then(book => {
    const review = book.reviews.id(req.params.reviewId)
    //console.log('$$$', review, '$$$')
    if (!review.owner.equals(req.user.profile._id)) {
      return res.redirect(`/books/${book._id}`)
    }
    res.render('books/edit', {
      book,
      title: 'Edit Review',
      review,
      
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateReview(req, res) {
  // console.log(req.params.id, '***')
  // console.log(req.body,'***')
  Book.findById(req.params.id)
    .then (book => {
      const review = book.reviews.id(req.params.reviewId)
      if (!review.owner.equals(req.user.profile._id)) {
        return res.redirect(`/books/${book._id}`)
      }
      console.log(req.body)
      review.content = req.body.content
      book.save()
      .then(() => {
        res.redirect(`/books/${book._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  index,
  create,
  show,
  createReview,
  editReview, 
  updateReview
}


