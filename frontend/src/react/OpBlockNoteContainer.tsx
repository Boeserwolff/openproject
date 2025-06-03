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
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useState } from "react";
import { OpenProjectWorkPackageBlock } from "./OpenProjectWorkPackageBlock";
import { FaTasks } from "react-icons/fa";

export default function OpBlockNoteContainer() {
  const [editorContent, setEditorContent] = useState("");

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      openProjectWorkPackage: OpenProjectWorkPackageBlock,
    },
  });
  const editor = useCreateBlockNote({
    schema,
  });

  const getCustomSlashMenuItems = (editor: any): DefaultReactSuggestionItem[] => {
    return [
      ...getDefaultReactSlashMenuItems(editor),
      {
          title: "OpenProject Work Package",
          onItemClick: () => {
            insertOrUpdateBlock(editor, {
              // @ts-ignore
              type: "openProjectWorkPackage",
            });
          },
          aliases: ["openproject", "workpackage", "op", "wp"],
          icon: FaTasks,
          subtext: "Add an OpenProject work package block",
        },
    ]
  }

  return (
    <>
      <input type="hidden" name="journal[notes]" value={editorContent} />
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        onChange={async (editor) => {
          const content = await editor.blocksToMarkdownLossy();
          setEditorContent(content);
        }}
      >
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={
            async (query: string) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </>
  );
}
