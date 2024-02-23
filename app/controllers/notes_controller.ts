import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) {
    return 'Semua Notes'
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return `ini adalah notes ke ${params.id}`
  }
  

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}