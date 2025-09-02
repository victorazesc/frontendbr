// src/app/(company)/my-jobs/page.tsx
'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Job {
  id: string
  title: string
  location: string
  state: string
  createdAt: string
  jobContractType: string | null
  jobSeniority: string | null
  labels: { id: string; name: string; color: string }[]
}

export default function MyJobs() {
  const { data: session, status } = useSession()
  const [jobs, setJobs] = useState<Job[]>([])
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }

    if (status === "authenticated") {
      fetch("/api/my-jobs")
        .then((res) => res.json())
        .then((data) => setJobs(data))
    }
  }, [status])

  if (status === "loading") return <p className="p-4">Carregando...</p>

  return (
    <div className="py-10 px-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Minhas Vagas</h1>

      {jobs.length === 0 ? (
        <p className="text-muted-foreground">Você ainda não cadastrou nenhuma vaga.</p>
      ) : (
        jobs.map((job) => (
          <Card key={job.id} className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-muted-foreground">{job.location} • {job.jobContractType} • {job.jobSeniority}</p>
            <div className="flex flex-wrap gap-2">
              {job.labels.map((label) => (
                <Badge key={label.id}>{label.name}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Criado em: {new Date(job.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => router.push(`/job/${job.id}`)}>
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  const ok = window.confirm('Tem certeza que deseja excluir esta vaga?')
                  if (!ok) return
                  try {
                    const res = await fetch(`/api/jobs/${job.id}`, { method: 'DELETE' })
                    if (!res.ok) {
                      const j = await res.json().catch(() => ({}))
                      alert(j.error || 'Erro ao excluir a vaga')
                      return
                    }
                    setJobs((prev) => prev.filter((j) => j.id !== job.id))
                  } catch (e) {
                    alert('Erro ao excluir a vaga')
                  }
                }}
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
