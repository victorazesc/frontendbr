'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  SerializedEditorState,
  createEditor,
  EditorState
} from 'lexical'
import {
  $convertFromMarkdownString,
  TRANSFORMERS
} from '@lexical/markdown'

// importa os nodes corretamente
import { nodes } from '@/components/blocks/editor-x/nodes'

// Importa o editor dinamicamente (evita SSR error)
const Editor = dynamic(
  () => import('@/components/blocks/editor-x/editor').then(mod => mod.Editor),
  { ssr: false, loading: () => <p>Carregando editor...</p> }
)

interface EditorDemoProps {
  value?: string // Markdown
  onChange?: (markdown: string) => void
}

export function EditorDemo({ value = '', onChange }: EditorDemoProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>()

  useEffect(() => {
    const editor = createEditor({
      namespace: 'Editor',
      theme: {},
      nodes,
      onError: (err) => console.error(err),
    })

    editor.update(() => {
      try {
        const rootNode = $convertFromMarkdownString(value, TRANSFORMERS)
        const newEditorState = editor.getEditorState()
        // o root node é mutável, mas precisamos forçar sua aplicação no editor
        const root = editor.getRootElement()
        if (rootNode && root) {
          editor.setEditorState(newEditorState)
          setEditorState(newEditorState.toJSON())
        }
      } catch (err) {
        console.error('Erro ao converter markdown para editorState:', err)
      }
    })
  }, [value])

  return (
    <Editor
      editorSerializedState={editorState}
      onMarkdownChange={onChange}
    />
  )
}