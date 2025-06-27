import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../store/authStore'
import { loginSchema, registerSchema } from './utils/validation'
import type { z } from 'zod'

type RegisterFormData = z.infer<typeof registerSchema>
type LoginFormData = z.infer<typeof loginSchema>
type FormData = RegisterFormData | LoginFormData

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false)
  const setToken = useAuthStore((state) => state.setToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const base = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE
      const url = `${base}/api/auth${isRegister ? '/register' : '/login'}`

      const res = await axios.post(url, data)

      if (!isRegister) {
        setToken(res.data.token)
        alert('Inloggade')
      } else {
        alert('Registreringen lyckades! Logga in nu')
        setIsRegister(false)
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Något gick fel')
    }
  }

  return (
    <>
      <h2>{isRegister ? 'Registrera' : 'Logga in'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="text" {...register('email')} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Lösenord</label>
        <input id="password" type="text" {...register('password')} />
        <p>{errors.password?.message}</p>
        {isRegister && (
          <>
            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
            <input
              id="confirmPassword"
              type="text"
              {...register('confirmPassword')}
            />
            <p>
              {'confirmPassword' in errors
                ? errors.confirmPassword?.message
                : ''}
            </p>
          </>
        )}
        <button type="submit">{isRegister ? 'Registrera' : 'Logga in'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? 'Har du redan ett konto? Logga in'
          : 'Har du inget konto? Registrera sig här'}
      </button>
    </>
  )
}

export default LoginRegister
