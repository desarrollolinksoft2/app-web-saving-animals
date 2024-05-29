
import { readUserSession } from '@/data/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const {data} = await readUserSession()
  if(data.session){
    redirect('/web?menu=1')
  }else{
    redirect('/auth/login')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>new App</h2>
    </main>
  )
}
