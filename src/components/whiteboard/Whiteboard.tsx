"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // v6
import WhiteboardApi from './WhiteboardApi';
// import { fabric } from 'fabric'; // v5

type Dimensions = {
    height: number,
    width: number
}

export enum OptionType{
    Rectangle = "0",
    Circle = "1",
    Line = "2",
    Freehand = "3",
    Color = "4",
    Arrow = "5"
};

export const Whiteboard = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({height: window.innerHeight, width: window.innerWidth})
  useEffect(() => {
    const c = WhiteboardApi.getInstance(canvasEl);
    // return () => {
    //   updateCanvasContext(null);
    //   canvas.dispose();
    // }
    return () => {
        WhiteboardApi.dispose();
    }
  }, []);

  return (
    <>
    <div>
    <div></div>
    <canvas width={dimensions.width} height={dimensions.height} className='w-full h-full' ref={canvasEl}/>
    </div>
    </>
  )
};
