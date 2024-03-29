import { Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import LocalStorage from "utils/LocalStorage";
import { useState } from "react";
import { IAdminData } from "src/models/api/AdminProfileResponse";
import ImageUploader from "src/components/common/Uploader/ImageUploader";

const Profile = () => {
  const [isLoading, setisLoading] = useState();
  const [personalData, setPersonalData] = useState<IAdminData | null>(null);

  const [imgUrl, setImgUrl] = useState<string>("");

  // Uploader States
  const [openUpload, setOpenUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingCrop, setLoadingCrop] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const adminData = LocalStorage.getFromLocalStorage("admin");
    setPersonalData(adminData);
  }, [personalData?._id]);

  useEffect(() => {
    if (uploadComplete) {
      const timeout = setTimeout(() => {
        setUploadComplete(false);
        setCropper(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [uploadComplete]);

  return (
    <Stack>
      <Typography>Profile Page</Typography>
      <Typography
        className="cursor-pointer"
        onClick={() => setOpenUpload(true)}
      >
        Upload Image
      </Typography>
      <ImageUploader
        openUpload={openUpload}
        setOpenUpload={setOpenUpload}
        file={file}
        setFile={setFile}
        cropper={cropper}
        setCropper={setCropper}
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        loadingCrop={loadingCrop}
        setLoadingCrop={setLoadingCrop}
        setUploadComplete={setUploadComplete}
        fileInputRef={fileInputRef}
        setImgUrl={setImgUrl}
      />
      <img src={imgUrl} width={200} alt={imgUrl} />
    </Stack>
  );
};

export default Profile;
