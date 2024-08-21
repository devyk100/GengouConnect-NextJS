"use client"; // Ensure this is at the top of your file

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // Import the dark theme

// import './style.css'; // Your custom styles

import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const MyComponent = () => {
  const theme = useTheme()
  // console.log()
  const editorRef = useRef<any>(null); // Reference to the editor instance
  const [value, setValue] = useState("something");

  const handleChange = () => {
    
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown(); // Get the content
      setValue(content);
      console.log(content);
    }
  };

  useEffect(() => {
    if(editorRef.current){
      editorRef.current.getInstance().theme = theme.theme;
      // editorRef.current.getInstance().factory.theme = theme.theme
    }
  })

  return (
    <Editor
      initialValue={value}
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      theme="dark"
      ref={editorRef} // Attach the ref to the Editor
      onChange={handleChange} // Handle the change
    />
  );
};

export default MyComponent;
