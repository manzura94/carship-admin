import React, { useState,useEffect } from "react"
import { $mediaApi } from "../utils/https"
import { AES } from "crypto-js"
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons"
import { message, Modal, Upload } from "antd"


const ImageUpload = ({ form, name = "image", fileList, setFileList}) => {
    const [loading, setLoading] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")


    const handleEncrypted = () =>
        AES.encrypt(
            JSON.stringify({
                client: "carship",
                secret: "gCosGwTqCNCpIoGnS28V7TfD2V0obDbPaJSY6LvmN7Lg0XPl5Rt6ne9vdbwL+Q",
                time: Date.now(),
            }),
            "G2DPdL0RN2ldSRuKpnWSRlfZrzBBEtc0qhZ+xQaRjjdTZdV89bausl1KR6l1SkqY"
        ).toString()

    const handleCancel = () => setPreviewOpen(false)

    const onRemove = async (file) => {
        const { url, status } = file
        if (status === "error") {
            setFileList([])
        }

        const loc = new URL(url)
        const deleteKey = loc.pathname.slice(1)

        const encrypted = handleEncrypted()

        const headers = {
            "x-auth-key": encrypted,
        }

        try {
            const res = await $mediaApi.post(
                "/api/v1/aws/delete",
                {
                    key: deleteKey,
                },
                {
                    headers,
                }
            )
            const data = res.data
            if (!!data) {
                setFileList([])
                form.setFieldsValue({[name]:""})
            }
        } catch (error) {
            // setFileList([
            //     {
            //         uid: "22",
            //         name: "image.png",
            //         status: "error",
            //     },
            // ])
        } finally {
            setLoading(false)
        }
    }

    const handlePreview = async (file) => {
        console.log(file)

        setPreviewImage(file.url)
        setPreviewOpen(true)
        setPreviewTitle(file.url.substring(file.url.lastIndexOf("/") + 1))
    }

    const handleChange = async ({ file }) => {
        console.log(file)
        setLoading(true)
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png"

        if (!isJpgOrPng) {
            setLoading(false)

            setFileList([
                {
                    uid: "22",
                    name: "image.png",
                    status: "error",
                },
            ])

            return message.error("You can only upload JPG/PNG file!")
        } else {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("project", "carship")

            const encrypted = handleEncrypted()

            const headers = {
                "x-auth-key": encrypted,
            }

            try {
                const res = await $mediaApi.post("/api/v1/aws", formData, {
                    headers,
                })
                const data = res.data
                form.setFieldsValue({[name]: data.url})

                setFileList([
                    {
                        uid: data.id,
                        status: "done",
                        url: data.url,
                    }
                ])

                console.log(data)
            } catch (error) {
                setFileList([
                    {
                        uid: "22",
                        name: "image.png",
                        status: "error",
                    }
                ])
            } finally {
                setLoading(false)
            }
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    )

    const res =  form.getFieldsValue(true) 
    useEffect(() => {
        if (!!res[name] && res.id) {
            setFileList([
                {
                    uid: res.id,
                    status: "done",
                    url: res[name],
                },
            ])
        }
    }, [res])

    return (
        <>
            <Upload

                listType='picture-card'
                fileList={fileList}
                customRequest={(file) => handleChange(file)}
                onPreview={handlePreview}
                onRemove={onRemove}
            >
                {fileList.length === 1 ? null : uploadButton}
            </Upload>
            <Modal 
               className="imageModal"
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img 
                    alt='example'
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    )
}

export default ImageUpload
