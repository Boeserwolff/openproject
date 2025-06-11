/*
 * -- copyright
 * OpenProject is an open source project management software.
 * Copyright (C) 2023 the OpenProject GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 3.
 *
 * OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
 * Copyright (C) 2006-2013 Jean-Philippe Lang
 * Copyright (C) 2010-2013 the ChiliProject Team
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * See COPYRIGHT and LICENSE files for more details.
 * ++
 */

import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { dummyBlockSpec } from "op-blocknote-extensions";
import { useState } from "react";
import { OpenProjectWorkPackageBlock } from "./OpenProjectWorkPackageBlock";

export default function OpBlockNoteContainer() {
  const [editorContent, setEditorContent] = useState("");

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      openProjectWorkPackage: OpenProjectWorkPackageBlock,
      dummy: dummyBlockSpec,
    },
  });
  const editor = useCreateBlockNote({ schema });
  type EditorType = typeof editor;

  const getCustomSlashMenuItems = (editor: EditorType) => {
    return [
      ...getDefaultReactSlashMenuItems(editor),
      {
        title: "Insert Dummy Block",
        onItemClick: () =>
          insertOrUpdateBlock(editor, {
            type: "dummy",
          }),
        aliases: ["dummy"],
        group: "Other",
        icon: <span>🧩</span>,
        subtext: "Used to insert a Dummy block",
      },
    ];
  };

  return (
    <>
      <input type="hidden" name="journal[notes]" value={editorContent} />
      <BlockNoteView
        editor={editor}
        onChange={async (editor) => {
          const content = await editor.blocksToMarkdownLossy();
          setEditorContent(content);
        }}
      >
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query: string) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)}
        />
      </BlockNoteView>
    </>
  );
}
