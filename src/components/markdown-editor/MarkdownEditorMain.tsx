"use client"
import { useEffect } from "react";

const GAP_SIZE = 10;

class GapBufferLine{
  private mNextLineBuffer: GapBufferLine|null;
  private mPrevLineBuffer: GapBufferLine|null;
  private mSize: number;
  private mStringEnd: number;
  private mGapStart: number;
  private mGapEnd: number;
  private mMainString: Uint8Array;

  public constructor(initialSize: number){
    this.mNextLineBuffer = null;
    this.mPrevLineBuffer = null;
    this.mSize = 0;
    this.mGapStart = 0;
    this.mGapEnd = GAP_SIZE-1;
    this.mStringEnd = 0;
    this.mMainString = new Uint8Array(initialSize);
  }

  public moveRight(){
    
  }
  public moveLeft(){
    this.mMainString[this.mGapEnd] = this.mMainString[this.mGapStart - 1];
    this.mMainString[this.mGapStart - 1] = '\0'.charCodeAt(0);
    if(this.mStringEnd < this.mGapEnd){
      this.mStringEnd = this.mGapEnd;
    } else {
      this.mStringEnd++;
    }
    this.mGapStart--;
    this.mGapEnd--;
  }
  public moveToPosition(pos: number){

  }
  public getString():string{
    const arr =  Array.from(this.mMainString);
    let res = ""
    for(let i = 0; i <= this.mStringEnd; i++){
      if(i == this.mGapStart){
        i += GAP_SIZE-1;
        continue;
      }
      // if(i > this.mStringEnd){
      //   break;
      // }
      res += String.fromCharCode(arr[i]);
    }
    return res;
  }


  public insert(val: string){
    if(val.length > 1){
      throw Error("More than one character not allowed");
      return ;
    }
    if (this.mGapStart > this.mGapEnd) {
      // Gap is full; need to expand the gap buffer
      throw new Error("Gap buffer is full");
    }
    console.log("Inside")
    this.mMainString[this.mGapStart] = val.charCodeAt(0);
    this.mGapStart++;
    this.mGapEnd++;
    this.mStringEnd++;
  }
}

// class GapBuffer {
//   private gapBufferLines: GapBufferLine[];
//   public constructor(){
//     this.gapBufferLines = [];
//   }
// };


export default function MarkdownEditor(){
  useEffect(() => {
    const h: GapBufferLine = new GapBufferLine(100);
    h.insert('a');
    h.insert('n');
    h.insert('k');
    h.moveLeft();
    h.insert('l');
    console.log(h.getString())
    
  },[])
  return (
    <>
    something here
    </>
  )
}