import { useState } from 'react'
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'

import { Separator } from '@/components/ui/separator'

import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin'
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list'
import { FormatCodeBlock } from '@/components/editor/plugins/toolbar/block-format/format-code-block'
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list'
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph'
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote'
import { BlockInsertPlugin } from '@/components/editor/plugins/toolbar/block-insert-plugin'
import { InsertCollapsibleContainer } from '@/components/editor/plugins/toolbar/block-insert/insert-collapsible-container'
import { InsertColumnsLayout } from '@/components/editor/plugins/toolbar/block-insert/insert-columns-layout'
import { InsertEmbeds } from '@/components/editor/plugins/toolbar/block-insert/insert-embeds'
import { InsertExcalidraw } from '@/components/editor/plugins/toolbar/block-insert/insert-excalidraw'
import { InsertHorizontalRule } from '@/components/editor/plugins/toolbar/block-insert/insert-horizontal-rule'
import { InsertImage } from '@/components/editor/plugins/toolbar/block-insert/insert-image'
import { InsertInlineImage } from '@/components/editor/plugins/toolbar/block-insert/insert-inline-image'
import { InsertPageBreak } from '@/components/editor/plugins/toolbar/block-insert/insert-page-break'
import { InsertPoll } from '@/components/editor/plugins/toolbar/block-insert/insert-poll'
import { InsertTable } from '@/components/editor/plugins/toolbar/block-insert/insert-table'
import { ClearFormattingToolbarPlugin } from '@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin'
import { CodeLanguageToolbarPlugin } from '@/components/editor/plugins/toolbar/code-language-toolbar-plugin'
import { ElementFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/element-format-toolbar-plugin'
import { FontBackgroundToolbarPlugin } from '@/components/editor/plugins/toolbar/font-background-toolbar-plugin'
import { FontColorToolbarPlugin } from '@/components/editor/plugins/toolbar/font-color-toolbar-plugin'
import { FontFamilyToolbarPlugin } from '@/components/editor/plugins/toolbar/font-family-toolbar-plugin'
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin'
import { FontSizeToolbarPlugin } from '@/components/editor/plugins/toolbar/font-size-toolbar-plugin'
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin'
import { LinkToolbarPlugin } from '@/components/editor/plugins/toolbar/link-toolbar-plugin'
import { SubSuperToolbarPlugin } from '@/components/editor/plugins/toolbar/subsuper-toolbar-plugin'

import { ActionsPlugin } from '@/components/editor/plugins/actions/actions-plugin'
import { CharacterLimitPlugin } from '@/components/editor/plugins/actions/character-limit-plugin'
import { ClearEditorActionPlugin } from '@/components/editor/plugins/actions/clear-editor-plugin'
import { CounterCharacterPlugin } from '@/components/editor/plugins/actions/counter-character-plugin'
import { EditModeTogglePlugin } from '@/components/editor/plugins/actions/edit-mode-toggle-plugin'
import { ImportExportPlugin } from '@/components/editor/plugins/actions/import-export-plugin'
import { MarkdownTogglePlugin } from '@/components/editor/plugins/actions/markdown-toggle-plugin'
import { MaxLengthPlugin } from '@/components/editor/plugins/actions/max-length-plugin'
import { ShareContentPlugin } from '@/components/editor/plugins/actions/share-content-plugin'
import { SpeechToTextPlugin } from '@/components/editor/plugins/actions/speech-to-text-plugin'
import { TreeViewPlugin } from '@/components/editor/plugins/actions/tree-view-plugin'
import { AutoLinkPlugin } from '@/components/editor/plugins/auto-link-plugin'
import { AutocompletePlugin } from '@/components/editor/plugins/autocomplete-plugin'
import { CodeActionMenuPlugin } from '@/components/editor/plugins/code-action-menu-plugin'
import { CodeHighlightPlugin } from '@/components/editor/plugins/code-highlight-plugin'
import { CollapsiblePlugin } from '@/components/editor/plugins/collapsible-plugin'
import { ComponentPickerMenuPlugin } from '@/components/editor/plugins/component-picker-menu-plugin'
import { ContextMenuPlugin } from '@/components/editor/plugins/context-menu-plugin'
import { DragDropPastePlugin } from '@/components/editor/plugins/drag-drop-paste-plugin'
import { DraggableBlockPlugin } from '@/components/editor/plugins/draggable-block-plugin'
import { AutoEmbedPlugin } from '@/components/editor/plugins/embeds/auto-embed-plugin'
import { FigmaPlugin } from '@/components/editor/plugins/embeds/figma-plugin'
import { TwitterPlugin } from '@/components/editor/plugins/embeds/twitter-plugin'
import { YouTubePlugin } from '@/components/editor/plugins/embeds/youtube-plugin'
import { EmojiPickerPlugin } from '@/components/editor/plugins/emoji-picker-plugin'
import { EmojisPlugin } from '@/components/editor/plugins/emojis-plugin'
import { EquationsPlugin } from '@/components/editor/plugins/equations-plugin'
import { ExcalidrawPlugin } from '@/components/editor/plugins/excalidraw-plugin'
import { FloatingLinkEditorPlugin } from '@/components/editor/plugins/floating-link-editor-plugin'
import { FloatingTextFormatToolbarPlugin } from '@/components/editor/plugins/floating-text-format-plugin'
import { ImagesPlugin } from '@/components/editor/plugins/images-plugin'
import { InlineImagePlugin } from '@/components/editor/plugins/inline-image-plugin'
import { KeywordsPlugin } from '@/components/editor/plugins/keywords-plugin'
import { LayoutPlugin } from '@/components/editor/plugins/layout-plugin'
import { LinkPlugin } from '@/components/editor/plugins/link-plugin'
import { ListMaxIndentLevelPlugin } from '@/components/editor/plugins/list-max-indent-level-plugin'
import { MentionsPlugin } from '@/components/editor/plugins/mentions-plugin'
import { PageBreakPlugin } from '@/components/editor/plugins/page-break-plugin'
import { PollPlugin } from '@/components/editor/plugins/poll-plugin'
import { TabFocusPlugin } from '@/components/editor/plugins/tab-focus-plugin'
import { TableActionMenuPlugin } from '@/components/editor/plugins/table-action-menu-plugin'
import { TableCellResizerPlugin } from '@/components/editor/plugins/table-cell-resizer-plugin'
import { TableHoverActionsPlugin } from '@/components/editor/plugins/table-hover-actions-plugin'
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin'
import { TypingPerfPlugin } from '@/components/editor/plugins/typing-pref-plugin'
import { ContentEditable } from '@/components/editor/editor-ui/content-editable'

import { AlignmentPickerPlugin } from '@/components/editor/plugins/picker/alignment-picker-plugin'
import { ParagraphPickerPlugin } from '@/components/editor/plugins/picker/paragraph-picker-plugin'
import { HeadingPickerPlugin } from '@/components/editor/plugins/picker/heading-picker-plugin'
import { DynamicTablePickerPlugin, TablePickerPlugin } from '@/components/editor/plugins/picker/table-picker-plugin'
import { EmbedsPickerPlugin } from '@/components/editor/plugins/picker/embeds-picker-plugin'
import { CheckListPickerPlugin } from '@/components/editor/plugins/picker/check-list-picker-plugin'
import { NumberedListPickerPlugin } from '@/components/editor/plugins/picker/numbered-list-picker-plugin'
import { BulletedListPickerPlugin } from '@/components/editor/plugins/picker/bulleted-list-picker-plugin'
import { QuotePickerPlugin } from '@/components/editor/plugins/picker/quote-picker-plugin'
import { CodePickerPlugin } from '@/components/editor/plugins/picker/code-picker-plugin'
import { DividerPickerPlugin } from '@/components/editor/plugins/picker/divider-picker-plugin'
import { PageBreakPickerPlugin } from '@/components/editor/plugins/picker/page-break-picker-plugin'
import { ImagePickerPlugin } from '@/components/editor/plugins/picker/image-picker-plugin'
import { ExcalidrawPickerPlugin } from '@/components/editor/plugins/picker/excalidraw-picker-plugin'
import { PollPickerPlugin } from '@/components/editor/plugins/picker/poll-picker-plugin'
import { EquationPickerPlugin } from '@/components/editor/plugins/picker/equation-picker-plugin'
import { CollapsiblePickerPlugin } from '@/components/editor/plugins/picker/collapsible-picker-plugin'
import { ColumnsLayoutPickerPlugin } from '@/components/editor/plugins/picker/columns-layout-picker-plugin'

import { EMOJI } from '@/components/editor/transformers/markdown-emoji-transformer'
import { EQUATION } from '@/components/editor/transformers/markdown-equation-transofrmer'
import { HR } from '@/components/editor/transformers/markdown-hr-transformer'
import { IMAGE } from '@/components/editor/transformers/markdown-image-transformer'
import { TABLE } from '@/components/editor/transformers/markdown-table-transformer'
import { TWEET } from '@/components/editor/transformers/markdown-tweet-transformer'

export const placeholder = 'Press / for commands...'
const maxLength = 500

export function Plugins({ }) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="h-8" />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={['h1', 'h2', 'h3']} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatCodeBlock />
              <FormatQuote />
            </BlockFormatDropDown>
            {blockType === 'code' ? (
              <CodeLanguageToolbarPlugin />
            ) : (
              <>
                <FontFamilyToolbarPlugin />
                <FontSizeToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <FontFormatToolbarPlugin format="bold" />
                <FontFormatToolbarPlugin format="italic" />
                <FontFormatToolbarPlugin format="underline" />
                <FontFormatToolbarPlugin format="strikethrough" />
                <Separator orientation="vertical" className="h-8" />
                <SubSuperToolbarPlugin />
                <LinkToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <ClearFormattingToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <FontColorToolbarPlugin />
                <FontBackgroundToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <ElementFormatToolbarPlugin />
                <Separator orientation="vertical" className="h-8" />
                <BlockInsertPlugin>
                  <InsertHorizontalRule />
                  <InsertPageBreak />
                  <InsertImage />
                  <InsertInlineImage />
                  <InsertCollapsibleContainer />
                  <InsertExcalidraw />
                  <InsertTable />
                  <InsertPoll />
                  <InsertColumnsLayout />
                  <InsertEmbeds />
                </BlockInsertPlugin>
              </>
            )}
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={placeholder} className='ContentEditable__root relative block min-h-72 overflow-auto min-h-full px-8 py-4 focus:outline-none h-[830px]' />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        <MentionsPlugin />
        <PageBreakPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <KeywordsPlugin />
        <EmojisPlugin />
        <ImagesPlugin />
        <InlineImagePlugin />
        <ExcalidrawPlugin />
        <TableCellResizerPlugin />
        <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
        <TableActionMenuPlugin
          anchorElem={floatingAnchorElem}
          cellMerge={true}
        />
        <PollPlugin />
        <LayoutPlugin />
        <EquationsPlugin />
        <CollapsiblePlugin />

        <AutoEmbedPlugin />
        <FigmaPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

        <MarkdownShortcutPlugin 
          transformers={[
            TABLE,
            HR,
            IMAGE,
            EMOJI,
            EQUATION,
            TWEET,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]} 
        />
        {/* <TypingPerfPlugin /> */}
        <TabFocusPlugin />
        <AutocompletePlugin />
        <AutoLinkPlugin />
        <LinkPlugin />

        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            TablePickerPlugin(),
            CheckListPickerPlugin(),
            NumberedListPickerPlugin(),
            BulletedListPickerPlugin(),
            QuotePickerPlugin(),
            CodePickerPlugin(),
            DividerPickerPlugin(),
            PageBreakPickerPlugin(),
            ExcalidrawPickerPlugin(),
            PollPickerPlugin(),
            EmbedsPickerPlugin({ embed: 'figma' }),
            EmbedsPickerPlugin({ embed: 'tweet' }),
            EmbedsPickerPlugin({ embed: 'youtube-video' }),
            EquationPickerPlugin(),
            ImagePickerPlugin(),
            CollapsiblePickerPlugin(),
            ColumnsLayoutPickerPlugin(),
            AlignmentPickerPlugin({ alignment: 'left' }),
            AlignmentPickerPlugin({ alignment: 'center' }),
            AlignmentPickerPlugin({ alignment: 'right' }),
            AlignmentPickerPlugin({ alignment: 'justify' }),
          ]}
          dynamicOptionsFn={DynamicTablePickerPlugin}
        />

        <ContextMenuPlugin />
        <DragDropPastePlugin />
        <EmojiPickerPlugin />

        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
        <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />

        <ListMaxIndentLevelPlugin />
      </div>
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between border-t p-1 overflow-auto gap-2">
          <div className='flex justify-start flex-1'>
            <MaxLengthPlugin maxLength={maxLength} />
            <CharacterLimitPlugin maxLength={maxLength} charset="UTF-16" />
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
          </div>
          <div className="flex justify-end flex-1">
            <SpeechToTextPlugin />
            <ShareContentPlugin />
            <ImportExportPlugin />
            <MarkdownTogglePlugin 
              shouldPreserveNewLinesInMarkdown={true}
              transformers={[
                TABLE,
                HR,
                IMAGE,
                EMOJI,
                EQUATION,
                TWEET,
                CHECK_LIST,
                ...ELEMENT_TRANSFORMERS,
                ...MULTILINE_ELEMENT_TRANSFORMERS,
                ...TEXT_FORMAT_TRANSFORMERS,
                ...TEXT_MATCH_TRANSFORMERS,
              ]}  
            />
            <EditModeTogglePlugin />
            <>
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
            </>
            <TreeViewPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  )
}
