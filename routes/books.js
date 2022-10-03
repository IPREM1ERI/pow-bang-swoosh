import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', booksCtrl.index)
router.get('/:id', booksCtrl.show)
router.post('/', isLoggedIn, booksCtrl.create)
router.post('/:id/reviews', isLoggedIn, booksCtrl.createReview)



export {
  router
}