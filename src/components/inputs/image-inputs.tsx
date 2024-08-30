"use client"

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { backendUrl } from "@/db/get-post-delete-requests";
import { useBackendToken } from "@/state/store";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";

export enum InputType {
    AudioInput,
    ImageInput
}

function Loader() {
    return (<>
        <div className="flex items-center justify-center">

            <div role="status" className="">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    </>)
}

export default function ImageInputs({ inputType, onUpdate, id, initialPreview }: {
    inputType: InputType;
    onUpdate: (val: string) => void;
    id: string;
    initialPreview: string
}) {
    
    const [isPending, setIsPending] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string>(initialPreview)
    const [uploadProgress, setUploadProgress] = useState(0);
    const { token } = useBackendToken();
    useEffect(() => {

    }, [initialPreview])
    return (
        <>

                <span className="flex w-full">

                    {
                        uploadProgress != 0 && uploadProgress != 100 ?
                            <span className="flex flex-col w-full">
                                <span>Uploading...</span>
                                <Progress value={uploadProgress} />
                            </span> : ""
                    }
                    {
                        isPending ? <Loader /> : ''
                    }
                    {
                        previewUrl != "" ? (inputType == InputType.AudioInput ? <>
                            <audio controls autoPlay className="w-full">
                                <source src={previewUrl} type="audio/mpeg" className="w-full">
                                </source>
                            </audio></> : <><Image alt="preview" src={previewUrl} height={1000} width={1000} onLoad={() => {
                                if (previewUrl == "") return
                                console.log("Loading completed")
                            }} /></>) : null
                    }
                </span>
                <Input type="file" id={id} accept={inputType == InputType.AudioInput ? ".mp3 .ogg .wav" : ".jpeg .jpg .png .svg .bmp"} onChange={async (event) => {
                    try {
                        setIsPending(true)
                        setUploadProgress(0)
                        const file = event.target.files![0]
                        const resp = await axios.post(`${backendUrl}/presign/put-image`, {
                            contentType: file.type,
                            size: file.size
                        }, {
                            headers: {
                                Authorization: token
                            }
                        })
                        const presignUrlPut = resp.data.url
                        await axios.put(presignUrlPut, file, {
                            headers: {
                                'Content-Type': file.type,

                            },
                            onUploadProgress: (progressEvent) => {
                                setUploadProgress(progressEvent.progress! * 100)
                            },

                        })
                        console.log(resp.data.fileName)
                        const urlPayload = await axios.post(`${backendUrl}/presign/get-image`, {
                            fileName: resp.data.fileName
                        }, {
                            headers: {
                                Authorization: token
                            }
                        })
                        console.log(urlPayload.data)
                        setPreviewUrl(urlPayload.data.fileUrl)
                        setIsPending(false)
                        console.log("called", resp.data.fileName)
                        onUpdate(resp.data.fileName)
                    } catch (error) {
                        console.log(error)
                        setIsPending(false)
                        toast("Some error")
                    }
                }} className="cursor-pointer py-2 h-fit border-lime-300 border-[0.1px]"></Input>
        </>
    )
}