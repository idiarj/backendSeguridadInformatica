import z from 'zod';

export const userSchema = z.object({
    user: z.string().min(5).max(50),
    email: z.string({
        message: 'El email no es valido.',
    }).email({
        message: 'El email no es valido.',
    }),
    password: z.string({
        message: 'La contraseña no es valida. Debe ser un string.',
    }).min(8,{
        message: 'La contraseña no es valida. Debe tener al menos 8 caracteres.'
    }).max(50,{
        message: 'La contraseña no es valida. Debe tener maximo 50 caracteres.'
    }),
})