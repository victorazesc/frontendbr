'use client'

import {
  LexicalComposer,
  InitialConfigType,
} from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { SerializedEditorState, $getRoot } from 'lexical'
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown'

import { FloatingLinkContext } from '@/components/editor/context/floating-link-context'
import { editorTheme } from '@/components/editor/themes/editor-theme'
import { TooltipProvider } from '@/components/ui/tooltip'

import { nodes } from './nodes'
import { Plugins } from './plugins'

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

const defaultInitialValue: SerializedEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

export function Editor({
  editorSerializedState,
  onMarkdownChange,
}: {
  editorSerializedState?: SerializedEditorState
  onMarkdownChange?: (markdown: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border-input border bg-background shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState ?? defaultInitialValue) }
            : {}),
        }}
      >
        <TooltipProvider>
          {/* <SharedAutocompleteContext> */}
          {/* <FloatingLinkContext> */}
          <Plugins />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              editorState.read(() => {
                const markdown = $convertToMarkdownString(TRANSFORMERS, $getRoot())
                onMarkdownChange?.(markdown)
              })
            }}
          />
          {/* </FloatingLinkContext> */}
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}