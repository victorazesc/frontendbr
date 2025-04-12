import { FrameIcon } from "lucide-react";

import { INSERT_EXCALIDRAW_COMMAND } from "@/components/editor/plugins/excalidraw-plugin";
import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option";

export function ExcalidrawPickerPlugin() {
  return new ComponentPickerOption('Excalidraw', {
    icon: <FrameIcon className="size-4" />,
    keywords: ['excalidraw', 'diagram', 'drawing'],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined),
  })
}