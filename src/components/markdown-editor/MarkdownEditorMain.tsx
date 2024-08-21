// "use client"
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Dynamically import MyComponent with SSR disabled
const MyComponent = dynamic(() => import('./MarkdownEditor'), { 
  ssr: false 
});

const MarkdownEditor = () => (
  <>
  <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  <MyComponent />
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

  </>
)
export default MarkdownEditor;
