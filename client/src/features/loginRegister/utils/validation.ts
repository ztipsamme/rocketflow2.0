import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Ogiltig e-postadress'),
  password: z.string().min(6, 'Ogiltig lösenord'),
})

export const registerSchema = z
  .object({
    email: z.string().email('Ogiltig e-postadress'),
    password: z.string().min(6, 'Minst 6 tecken'),
    confirmPassword: z.string().min(6, { message: 'Bekräfta lösenordet' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Lösenorden matchar inte',
    path: ['confirmPassword'],
  })
