'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function PartnerStudents() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token
      if (!token) {
        setStudents([])
        setLoading(false)
        return
      }
      const res = await fetch('/api/partner/students', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setStudents(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main style={{padding:20}}>
      <h1>Your Students / Applications</h1>
      <div style={{marginTop:12,marginBottom:12}}>
        <button onClick={()=>router.push('/partner/students/new')}>Create Student / Application</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <div>
          {students.length === 0 ? <div>No students yet.</div> : (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left',padding:8}}>Name</th>
                  <th style={{textAlign:'left',padding:8}}>Email</th>
                  <th style={{textAlign:'left',padding:8}}>Status</th>
                  <th style={{textAlign:'left',padding:8}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} style={{borderTop:'1px solid #eee'}}>
                    <td style={{padding:8}}>{s.applicantName}</td>
                    <td style={{padding:8}}>{s.email}</td>
                    <td style={{padding:8}}>{s.status}</td>
                    <td style={{padding:8}}><button onClick={()=>router.push(`/partner/students/${s.id}`)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </main>
  )
}
