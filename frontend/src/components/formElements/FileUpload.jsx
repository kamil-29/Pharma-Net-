import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { primaryColor } from '../../../style/colors'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { toast } from 'react-hot-toast';

registerPlugin(FilePondPluginImagePreview);

const FileUploadCss = {
    height: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'cover',
    textAlign: 'center',
    padding: '20px',
    border: `1px dashed ${primaryColor}`
}

function FileUpload({ handleChange, values, errors, touched, field, handleBlur, setFieldValue }) {
    const [imagePro, setImagePro] = useState(null)
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        reader.onload = () => {
            const dataURL = reader.result
            setImagePro(dataURL)
            setFieldValue(field.name, dataURL)
        }

        reader.readAsDataURL(file)
    }
    const [base64Image, setBase64Image] = useState('');


    const handleFileLoad = async (file) => {
        // if (file instanceof Blob) {
        //     const reader = new FileReader();
        //     reader.onload = (event) => {
        //         console.log(event.target.result);
        //         setFieldValue(field.name, event.target.result);
        //         setBase64Image(event.target.result);
        //     };
        //     reader.readAsDataURL(file);
        // }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'automaar');
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/drp2qfs9b/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        const data = await response.json();
        console.log("data", data)
        if (data) {
            toast.success("image Uploaded !")
            setFieldValue(field.name, data.secure_url);
            console.log("response", data.public_id)
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className='col-4'>
            {/* <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server="/api"
                name="files"
                labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
            /> */}

            {/* <img src={values[field?.name]} alt="" /> */}
            <FilePond
                // allowMultiple={true} 
                file={values[field?.name]}
                defaultImage={values[field?.name]}
                allowImagePreview
                name={field?.name}
                className="mt-2"
                onaddfile={(error, file) => {
                    if (!error) {
                        handleFileLoad(file.file);

                    }
                }}
            />
            {values[field?.name] != 0 ? (
                ""
            ) : touched[field?.name] ||
                errors[field?.name] ? (
                <small className="text-danger px-0 mt-0 ws-err">
                    {errors[field?.name]}
                </small>
            ) : null}
            {/* {base64Image && (
        <div>
          <h2>Base64 Encoded Image:</h2>
          <img src={base64Image} alt="Uploaded" />
        </div>
      )} */}
            {/* <div {...getRootProps()} style={FileUploadCss} className='mt-2'>

                <input {...getInputProps()} />
                {imagePro ? (
                    <div >
                        <img src={imagePro} width={80} height={150} style={{ width: '100% ', maxWidth: '100%' }} alt="dropped image" />
                    </div>
                ) :
                    <div className=' text-center'>
                        Upload & Drop Image Here
                    </div>
                }
            </div> */}
        </div>
    )
}


export default FileUpload