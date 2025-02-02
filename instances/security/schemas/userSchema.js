import z from 'zod';

export const userSchema = z.object({
    username: z.string({
        message: 'El nombre de usuario no es valido, debe ser un string.',
    }).min(5,{
        message: 'El nombre de usuario no es valido, debe tener al menos 5 caracteres.'
    }).max(50, {
        message: 'El nombre de usuario no es valido, debe tener maximo 50 caracteres.'
    }),
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