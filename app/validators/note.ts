import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createNotesValidator = vine.object({
  judul: vine.string(),
  isi: vine.string(),
})

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'field {{ field }} harus di isi',
  'string': 'nilai dari {{ field }} harus string',
  'email': 'The value is not a valid email address',

  // Error message for the username field
  'username.required': 'Please choose a username for your account',
})
