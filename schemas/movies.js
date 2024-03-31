const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string.',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(
    z.enum(['Action', 'Intriga', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
});

function validateMovie (input) {
  // safeParse : devuelve un objecto resolve para determinar si hubo o no error
  return movieSchema.safeParse(input);
}

function validatePartialMovie (input) {
  // Validaciones parciales, es decir que si el parametro se envia y es incorrecto se valida,
  // pero las validaciones parametros no enviados no se validan "no generan error"
  return movieSchema.partial().safeParse(input);
}

module.exports = {
  validateMovie,
  validatePartialMovie
};
