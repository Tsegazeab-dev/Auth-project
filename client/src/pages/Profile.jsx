import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [imageFile, setImageFile] = useState(undefined);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingError, setUploadingError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (imageFile) handleUploading(imageFile);
  }, [imageFile]);

  const handleUploading = async (image) => {
   
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

      const uploadFile = uploadBytesResumable(storageRef, image);

      uploadFile.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadingProgress(progress);
        },
        (err) => {
          setUploadingError(true);
        },
        () => {
          setUploadingProgress(101)
          getDownloadURL(uploadFile.snapshot.ref).then((imageUrl) =>
            setFormData({ ...formData, profilePicture: imageUrl })
          );
        }
      );
      setUploadingError(false)
      
  };
  console.log(formData)
  return (
    <div className="flex flex-col max-w-lg mx-auto">
      <h1 className="text-3xl text-center mt-5">My Profile</h1>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        hidden
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <img
        src={currentUser.profilePicture}
        alt="my profile"
        className="h-24 w-24 object-cover self-center mt-3 rounded-full cursor-pointer "
        onClick={() => fileRef.current.click()}
      />
      <p className="self-center mt-3">
        {uploadingError ? (<span className="text-red-700">
          Error uploading image (minimun file size 2MB )
        </span>) : uploadingProgress > 0 && uploadingProgress < 100 ? (<span className="text-slate-700">
          {`Uploading ... ${uploadingProgress}%`}
        </span>) : uploadingProgress === 101 ? (<span className="text-green-700">
          Image uploaded successfully
        </span>): uploadingProgress !== 0 ? "Uploading ..." : ''}
      </p>
      <form className="flex flex-col gap-4 mt-5 p-3">
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-600 p-3 rounded-lg text-white uppercase">
          Update
        </button>

        <div className="flex justify-between m-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
