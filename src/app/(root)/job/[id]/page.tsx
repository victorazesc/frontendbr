'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import JobFormEdit from '@/components/JobFormEdit'

export default function EditJobPage() {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`)
        const data = await res.json()
        setJob(data)
      } catch (err) {
        console.error('Erro ao carregar vaga', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (!job) return <p>Vaga não encontrada</p>

  return (
    <div className="py-10 px-6">
      <JobFormEdit initialData={job} />
    </div>
  )
}
