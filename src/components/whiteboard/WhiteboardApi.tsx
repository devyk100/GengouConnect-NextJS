"use client"
import * as fabric from 'fabric'; // v6
import { RefObject } from 'react';
import { OptionType } from './Whiteboard';

export default class WhiteboardApi {
    private canvasEl: RefObject<HTMLCanvasElement>;
    private canvas: fabric.Canvas;
    private activeToolbarOption: OptionType;
    private isDown: boolean = false;
    private origX: number;
    private origY: number;
    public static instance: WhiteboardApi;
    private static isDisposed : boolean = false;;
    private rectangles: fabric.Rect[];
    private circles: fabric.Ellipse[];
    private lines: fabric.Line[];
    public constructor(canvasEl:RefObject<HTMLCanvasElement>){
        this.origX = 0;
        this.origY = 0;
        this.rectangles = []
        this.circles = [];
        this.lines = []
        this.canvasEl = canvasEl;
        this.isDown = false;
        this.canvas = new fabric.Canvas(this.canvasEl.current!);
        this.activeToolbarOption = OptionType.Arrow;
        const c = this;
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas); 
        this.canvas.selectionColor = "rgb(0, 255, 0, 0.2)";
        this.canvas.selectionBorderColor = "white"
        this.canvas.selectionLineWidth = 2
        this.canvas.isDrawingMode = false
        this.canvas.selectionDashArray = [5,5]
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas)
        this.canvas.freeDrawingBrush.strokeDashArray = [3,3]
        this.canvas.freeDrawingBrush.color = "lime";
        this.canvas.on("mouse:down", function(o) {
            if(c.canvas.getActiveObject()) return;
            c.isDown = true;
            let pointer = c.canvas.getViewportPoint(o.e);
            c.origX = pointer.x;
            c.origY = pointer.y;
            pointer = c.canvas.getViewportPoint(o.e)
            switch(c.activeToolbarOption){
                case OptionType.Rectangle: {
                    console.log("Tried drawing a rectangle")
                    let rect = new fabric.Rect({
                        left: c.origX,
                        top: c.origY,
                        originX: 'left',
                        originY: 'top',
                        width: pointer.x-c.origX,
                        height: pointer.y-c.origY,
                        angle: 0,
                        fill: 'rgba(255,0,0,0.5)',
                        transparentCorners: false,
                        rx: 0,
                        ry: 0
                    })
                    c.canvas.add(rect)
                    c.rectangles.push(rect);
                    break;
                }
                case OptionType.Circle: {
                    console.log("Tried drawing a circle");
                    let circle = new fabric.Ellipse({
                        left: c.origX,
                        top: c.origY,
                        originX: 'left',
                        originY: 'top',
                        width: pointer.x-c.origX,
                        height: pointer.y-c.origY,
                        fill: "red",
                        transparentCorners: false,
                        
                    })
                    c.canvas.add(circle)
                    c.circles.push(circle)
                    break;
                }
                case OptionType.Line: {
                    let line = new fabric.Line([c.origX, c.origY, pointer.x, pointer.y], {
                        stroke: 'green'
                    });
                    c.canvas.add(line)
                    c.lines.push(line)
                    break;
                }
            }
        })


        this.canvas.on("mouse:move", function(o) {
            if(!c.isDown) return;
            console.log("Inside of move mouse")
            let pointer = c.canvas.getViewportPoint(o.e);
            let obj;
            switch(c.activeToolbarOption){
                case OptionType.Rectangle: {
                    obj  = c.rectangles[c.rectangles.length - 1]
                    obj!.set({ width: Math.abs(c.origX - pointer.x) });
                    obj!.set({ height: Math.abs(c.origY - pointer.y) });
                    if(c.origX > pointer.x){
                        obj?.set({left: Math.abs(pointer.x)})
                    }
                    if(c.origY > pointer.y){
                        obj?.set({top: Math.abs(pointer.y)})
                    }
                    break;
                }
                case OptionType.Circle: {
                    obj = c.circles[c.circles.length - 1]
                    obj!.set({ width: Math.abs(c.origX - pointer.x) });
                    obj!.set({ height: Math.abs(c.origY - pointer.y) });
                    obj!.set({ x2: Math.abs(c.origX - pointer.x) });
                    obj!.set({ y2: Math.abs(c.origY - pointer.y) });
                    // obj.set({radius:Math.min(Math.abs(c.origY - pointer.y), Math.abs(c.origX - pointer.x))/2,  })
                    obj.set({rx: Math.abs(c.origX - pointer.x)/2})
                    obj.set({ry: Math.abs(c.origY - pointer.y)/2})
                    if(c.origX > pointer.x){
                        obj?.set({left: Math.abs(pointer.x)})
                    }
                    if(c.origY > pointer.y){
                        obj?.set({top: Math.abs(pointer.y)})
                    }
                    break;
                }
                case OptionType.Line: {
                    obj = c.lines[c.lines.length - 1]
                    obj!.set({
                        x1: c.origX,
                        y1: c.origY,
                        x2: pointer.x,
                        y2: pointer.y
                    })
                    obj.setCoords()
                    break;
                }
            }


            c.canvas.renderAll();
        })

        this.canvas.on('mouse:up', function(o){
            c.isDown = false;
          });
    }

    public static getInstance(canvasEl:RefObject<HTMLCanvasElement>){
        if(!this.instance || this.isDisposed) this.instance = new WhiteboardApi(canvasEl);
        this.isDisposed = false;
        return this.instance
    }

    public setToolbarOption(option: OptionType){
        this.activeToolbarOption = option
    }

    public static dispose(){
        this.isDisposed = true;
        this.instance.canvas.dispose()
    }
}