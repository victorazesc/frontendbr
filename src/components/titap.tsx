'use client'

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  List,
  ListOrdered,
  ListTodo,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Braces,
} from 'lucide-react'

type MarkdownEditorProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  defaultTab?: 'edit' | 'preview'
}

export default function Tiptap({ value = '', onChange, placeholder, defaultTab = 'edit' }: MarkdownEditorProps) {
  const [text, setText] = useState<string>(value)
  const [tab, setTab] = useState<'edit' | 'preview'>(defaultTab)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // keep local state in sync if parent value changes
  useEffect(() => {
    setText(value ?? '')
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    setText(v)
    onChange?.(v)
  }

  // helpers to format selection
  const updateText = (next: string, selectStart?: number, selectEnd?: number) => {
    setText(next)
    onChange?.(next)
    // restore selection if possible
    requestAnimationFrame(() => {
      if (textareaRef.current && typeof selectStart === 'number' && typeof selectEnd === 'number') {
        textareaRef.current.selectionStart = selectStart
        textareaRef.current.selectionEnd = selectEnd
        textareaRef.current.focus()
      }
    })
  }

  const wrapSelection = (prefix: string, suffix: string = prefix) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const before = text.slice(0, start)
    const selected = text.slice(start, end)
    const after = text.slice(end)
    const next = `${before}${prefix}${selected}${suffix}${after}`
    const selStart = start + prefix.length
    const selEnd = selStart + selected.length
    updateText(next, selStart, selEnd)
  }

  const wrapBlock = (fence = '```') => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const before = text.slice(0, start)
    const selected = text.slice(start, end)
    const after = text.slice(end)
    const block = selected || '\n'
    const next = `${before}${fence}\n${block}\n${fence}${after}`
    const selStart = start + fence.length + 1
    const selEnd = selStart + block.length
    updateText(next, selStart, selEnd)
  }

  const linePrefix = (prefix: string) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    // expand to full lines
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    const lineEnd = (() => {
      const idx = text.indexOf('\n', end)
      return idx === -1 ? text.length : idx
    })()
    const before = text.slice(0, lineStart)
    const selected = text.slice(lineStart, lineEnd)
    const after = text.slice(lineEnd)
    const prefixed = selected
      .split('\n')
      .map(l => (l.length ? `${prefix}${l}` : prefix.trimEnd()))
      .join('\n')
    const next = `${before}${prefixed}${after}`
    const delta = prefix.length * (selected.split('\n').length)
    updateText(next, start + prefix.length, end + delta)
  }

  const insertLink = () => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const before = text.slice(0, start)
    const selected = text.slice(start, end) || 'texto'
    const after = text.slice(end)
    const url = typeof window !== 'undefined' ? window.prompt('URL do link:') : ''
    if (!url) return
    const md = `[${selected}](${url})`
    const next = `${before}${md}${after}`
    const selStart = before.length + 1
    const selEnd = selStart + selected.length
    updateText(next, selStart, selEnd)
  }

  const insertImage = () => {
    const url = typeof window !== 'undefined' ? window.prompt('URL da imagem:') : ''
    if (!url) return
    const alt = typeof window !== 'undefined' ? window.prompt('Texto alternativo (alt):', '') ?? '' : ''
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const before = text.slice(0, start)
    const after = text.slice(end)
    const md = `![${alt}](${url})`
    const next = `${before}${md}${after}`
    const cursor = before.length + md.length
    updateText(next, cursor, cursor)
  }

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as 'edit' | 'preview')} defaultValue={defaultTab}>
      <div className="flex items-center justify-between rounded-md border bg-background p-1">
        <TabsList className="w-fit">
          <TabsTrigger value="edit">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Negrito" onClick={() => wrapSelection('**')} disabled={tab !== 'edit'}>
                <Bold />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Negrito</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Itálico" onClick={() => wrapSelection('*')} disabled={tab !== 'edit'}>
                <Italic />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Itálico</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Código inline" onClick={() => wrapSelection('`')} disabled={tab !== 'edit'}>
                <Code />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Código inline</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Código em bloco" onClick={() => wrapBlock('```')} disabled={tab !== 'edit'}>
                <Braces />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Código em bloco</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Cabeçalho 1" onClick={() => linePrefix('# ')} disabled={tab !== 'edit'}>
                <Heading1 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>H1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Cabeçalho 2" onClick={() => linePrefix('## ')} disabled={tab !== 'edit'}>
                <Heading2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>H2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Cabeçalho 3" onClick={() => linePrefix('### ')} disabled={tab !== 'edit'}>
                <Heading3 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>H3</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Lista" onClick={() => linePrefix('- ')} disabled={tab !== 'edit'}>
                <List />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lista</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Lista ordenada" onClick={() => linePrefix('1. ')} disabled={tab !== 'edit'}>
                <ListOrdered />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lista ordenada</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Lista de tarefas" onClick={() => linePrefix('- [ ] ')} disabled={tab !== 'edit'}>
                <ListTodo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lista de tarefas</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Citar" onClick={() => linePrefix('> ')} disabled={tab !== 'edit'}>
                <Quote />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Citação</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Link" onClick={insertLink} disabled={tab !== 'edit'}>
                <LinkIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Imagem" onClick={insertImage} disabled={tab !== 'edit'}>
                <ImageIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Imagem</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label="Linha horizontal" onClick={() => updateText(`${text}\n\n---\n\n`)} disabled={tab !== 'edit'}>
                <Minus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Regra horizontal</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <TabsContent value="edit" className="mt-2">
        <textarea
          ref={textareaRef}
          className="min-h-64 w-full resize-y rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder ?? 'Escreva a descrição em Markdown...'}
          value={text}
          onChange={handleChange}
        />
      </TabsContent>
      <TabsContent value="preview" className="mt-2">
        <div className="rounded-md border p-3 overflow-auto">
          <div className="prose max-w-none markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {text || 'Pré-visualização do Markdown'}
            </ReactMarkdown>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
