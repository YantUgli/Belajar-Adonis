import Note from '#models/note'
import { createNotesValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { errors } from '@vinejs/vine'

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
    try {
      // belum di validasi
      const data = request.body()
      // sudah di validasi
      const validator = vine.compile(createNotesValidator)
      const validateData = await validator.validate(data)
      // const notes = await data.create(request)
      const notes = await Note.create({
        judul: validateData.judul,
        isi: validateData.isi,
      })

      return response.ok({
        messaage: 'Berhasil buat notes',
        data: notes,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest({
          message: error.messages,
        })
      }
      return response.badRequest("Something wen't wrong")
    }
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
    try {
      const data = request.body()
      // Validasi
      const validator = vine.compile(createNotesValidator)
      const validateData = await validator.validate(data)
      var notes = await Note.findByOrFail('id', params.id)
  
      notes.merge(validateData).save()
  
      return response.ok({
        data: notes,
        message: `berhasil update notes ke ${params.id}`,
      })
      
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest({ messages: error.messages })
      }

      return response.badRequest({ messages: "Something wen't wrong" })
    }
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
