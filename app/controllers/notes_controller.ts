import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const notes = await Note.query()
    // const notes = Note.all()
    // return {
    //   notes: notes,
    // }
    return response.ok({
      data: notes,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.body()
    // const notes = await data.create(request)
    const notes = await Note.create({
      judul: data.judul,
      isi: data.isi,
    })

    return response.ok({
      messaage: 'Berhasil buat notes',
      data: notes,
    })
  }

  /**
   * Show individual record
   */
  async show({ response, params }: HttpContext) {
    // const notes = await Note.find('id', params.id)
    const notes = await Note.findByOrFail('id', params.id)
    return response.ok({
      data: notes,
      params: params,
    })
  }

  /**
   * Edit individual record
   */
  // tidak dijelaskan Ka Chandra 😀
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, params, response }: HttpContext) {
    const data = request.body()
    var notes = await Note.findByOrFail('id', params.id)

    notes.merge(data).save()

    return response.ok({
      data: notes,
      message: `berhasil update notes ke ${params.id}`,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    var notes = await Note.findByOrFail('id', params.id)

    await notes.delete()

    return response.ok({
      message: `berhasil hapus notes ke ${params.id}`,
    })
  }
}
