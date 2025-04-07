'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPege() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() 

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/tasks',
    })
  }

  return (  
    <div>
      <h1>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='メールアドレス'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='パスワード'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
      </h1>
    </div>
  )
}
