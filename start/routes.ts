/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import NotesController from '#controllers/notes_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/about', () => {
  return 'This is the about page.'
})

router.get('/posts/:id', ({ params }) => {
  return `This is post with id ${params.id}`
})

router.get('/posts/:id/comments/:commentId', ({ params }) => {
  console.log(params.id)
  console.log(params.commentId)
  return `this post id ${params.id}, ini comment id nya ${params.commentId}`
})

// router.get('/notes', [NotesController, 'index'])
// router.post('/notes', [NotesController, 'store'])
// router.delete('/notes', [NotesController, 'destroy'])
// router.put('/notes', [NotesController, 'update'])

router.resource('/notes', NotesController)
