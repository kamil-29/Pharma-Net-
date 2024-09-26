import classNames from "classnames";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
// import { IoMdClose } from 'react-icons/all'
const ImageForm = ({
  onChange = {},
  values = {},
  errors = {},
  touched = {},
  type = "text",
  name = "text",
  placeholder = "text",
  disable = false,
  label = "text",
  isLabel = false,
  isFeildArry = false,
  handleBlur,
  value,
  isHelperText = false,
  multiline = false,
  isPassword = false,
  setFieldValue,
  ...props
}) => {
  const wrapperClassNames = classNames({
    "upload-wrapper ": true,
    [`col-${props.col}`]: props.col,
    [`col-lg-${props.colLg}`]: props.colLg,
    ["error-focus"]: props?.formik?.errors[props?.inputProps?.name],
  });

  const inputRef = useRef();
  const dropRef = useRef();
  const [fileState, setFileState] = useState([]);
  const [baseImage, setBaseImage] = useState(values.vehicle_image_url);
  const [loader, setLoader] = useState(0);

  const isValidFile = (file) => {
    let fileType = file.type.split("/")[0];
    console.log(fileType);
    if (fileType || fileType == "") {
      if (fileType == "image" || fileType == "video") {
        return fileType;
      } else {
        Swal.fire({
          title: "Error",
          text: "Please select valid Image type",
          icon: "error",
          dangerMode: true,
        });
        return false;
      }
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handeleFileUpload = async (files) => {
    if (isValidFile(files[0])) {
      setFileState(files);
      console.log("files", files)
      setBaseImage(await toBase64(files[0]));
      setFieldValue(name, files[0]);
    }
  };

  const onDragOverZone = (e) => {
    dropRef.current.classList.add("active");
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragLeaveZone = (e) => {
    dropRef.current.classList.remove("active");
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = Array.from(e.dataTransfer.files);
    handeleFileUpload(files);
  };

  const handleUpload = async () => {
    setLoader(1);
    if (fileState.length > 0 && baseImage) {
      let addImagesResponse = await addImages([
        {
          web_id,
          name: fileState[0].name,
          base_enc: baseImage,
        },
      ]);
    }
    setLoader(1);
  };

  const removeFiles = () => {
    setFileState([]);
    setBaseImage(null);
  };

  return (
    <div className={wrapperClassNames}>
      <div className="w-100 d-flex justify-content-between align-items-center wx-form-lable-wrapper">
        {props.title && <label className="wx-form-lable">{props.title}</label>}
        {props.titleFeature && props.titleFeature}
      </div>
      <div
        ref={dropRef}
        className="drag-zone "
        onDragOver={onDragOverZone}
        onDragEnd={onDragLeaveZone}
        onDragLeave={onDragLeaveZone}
        onDrop={(e) => {
          onDragLeaveZone(e);
          handleDragDropEvent(e);
        }}
      >
        {baseImage != null && (
          <div className="upload-media-preview">
            <img src={baseImage} alt="" />
          </div>
        )}
        {baseImage != null && (
          <span className="del-image" onClick={removeFiles}>
            {/* <IoMdClose /> */}
            <i className="fa-solid fa-xmark"></i>
          </span>
        )}
        {loader == 1 && (
          <div className="text-center py-3">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {baseImage == null && (
          <>
            <span className="fw-500 fs-6 pb-2">Drag and drop files here</span>

            <span className="fw-500 fs-7">
              {" "}
              or{" "}
              <span
                className="text-blue my-1 px-1 pointer"
                onClick={() => inputRef.current.click()}
              >
                {" "}
                Browse files{" "}
              </span>{" "}
              from device{" "}
            </span>

            <input
              ref={inputRef}
              type="file"
              name={name}
              style={{ display: "none" }}
              accept="image/*,video/*,"
              onChange={(e) => {
                console.log("vehicle_image_url", e.target.files);
                handeleFileUpload(e.target.files);
              }}
            />
          </>
        )}
      </div>
      {fileState.length > 0 && (
        <span className="text-primary mt-1 fs-8">{fileState[0].name}</span>
      )}
    </div>
  );
};

export default ImageForm;
