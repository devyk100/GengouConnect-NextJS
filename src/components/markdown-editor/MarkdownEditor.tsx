"use client"
import './styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, Node, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from '../ui/button'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group ">
      <div className="flex flex-row overflow-x-scroll">
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          
          className={editor.isActive('bold') ? 'bg-secondary' : ''}
        >
          Bold
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'bg-secondary' : ''}
        >
          Italic
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'bg-secondary' : ''}
        >
          Strike
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'bg-secondary' : ''}
        >
          Code
        </Button>
        <Button
        variant={"ghost"} onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </Button>
        <Button
        variant={"ghost"} onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'bg-secondary' : ''}
        >
          Paragraph
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary' : ''}
        >
          H1
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary' : ''}
        >
          H2
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary' : ''}
        >
          H3
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'bg-secondary' : ''}
        >
          H4
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'bg-secondary' : ''}
        >
          H5
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'bg-secondary' : ''}
        >
          H6
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
        >
          Bullet list
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
        >
          Ordered list
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-secondary' : ''}
        >
          Code block
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-secondary' : ''}
        >
          Blockquote
        </Button>
        <Button
        variant={"ghost"} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </Button>
        <Button
        variant={"ghost"} onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </Button>
        <Button
        variant={"ghost"}
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-secondary' : ''}
        >
          Purple
        </Button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      HTMLAttributes: {
        class: "list-disc"
      }
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      HTMLAttributes: {
        class: "list-decimal"
      }
    },
    bold: {
      HTMLAttributes: {
        // class: "something text-red-500"
      }
    },
    italic: {
      HTMLAttributes: {

      }
    },
    blockquote: {
      HTMLAttributes: {

      }
    },
    code: {
      HTMLAttributes: {

      }
    },
    codeBlock: {
      HTMLAttributes: {

      }
    },
    heading: {
      levels: [1,2,3,4,5,6],
      HTMLAttributes: {
        class: "font-extrabold"
      }
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "border-b-2 border-black block w-full  ",
      }
    }

  
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default () => {
  return (
  <>
  <span className=' block border-b-2 mt-10'></span>
  <div className=' '>

    <EditorProvider slotBefore={<MenuBar />}   extensions={extensions} content={content} onUpdate={(props) => {
      console.log(props)
    }}></EditorProvider>
    </div>
    </>
  )
}
