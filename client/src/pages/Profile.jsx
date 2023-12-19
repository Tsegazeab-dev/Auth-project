import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOut,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [imageFile, setImageFile] = useState(undefined);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadingError, setUploadingError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSucceeded, setUpdateSucceeded] = useState(false);

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
        setUploadingProgress(101);
        getDownloadURL(uploadFile.snapshot.ref).then((imageUrl) =>
          setFormData({ ...formData, profilePicture: imageUrl })
        );
      }
    );
    setUploadingError(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());

      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();

      if (data.success === false) dispatch(updateFailure(data));
      else {
        dispatch(updateSuccess(data));
        setUpdateSucceeded(true);
        setUploadingProgress(0);
      }
    } catch (err) {
      dispatch(updateFailure(err));
    }
  };

  const handleDelete = async (e) => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) dispatch(deleteFailure(data));
      else dispatch(deleteSuccess());
    } catch (err) {
      console.log(err);
      dispatch(deleteFailure(err));
    }
  };

  const handleSignOut = async (e) => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };
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
        src={formData.profilePicture || currentUser.profilePicture}
        alt="my profile"
        className="h-24 w-24 object-cover self-center mt-3 rounded-full cursor-pointer "
        onClick={() => fileRef.current.click()}
      />
      <p className="self-center mt-3">
        {uploadingError ? (
          <span className="text-red-700">
            Error uploading image (minimun file size 2MB )
          </span>
        ) : uploadingProgress > 0 && uploadingProgress < 100 ? (
          <span className="text-slate-700">
            {`Uploading ... ${uploadingProgress}%`}
          </span>
        ) : uploadingProgress === 101 ? (
          <span className="text-green-700">Image uploaded successfully</span>
        ) : uploadingProgress !== 0 ? (
          "Uploading ..."
        ) : (
          ""
        )}
      </p>
      <form className="flex flex-col gap-4 mt-5 p-3" onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-600 p-3 rounded-lg text-white uppercase">
          {loading ? "Updating ..." : "update"}
        </button>

        <div className="flex justify-between mt-3 mx-5">
          <span onClick={handleDelete} className="text-red-700 cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign out
          </span>
        </div>
      </form>

      <div className="border rounded-lg shadow-lg mt-3">
        <p className="text-red-700 mb-5 text-center">
          {error && "something went wrong"}
        </p>
        <p className="text-green-700 mb-5 text-center">
          {updateSucceeded && "User Credentials updated successfully"}
        </p>
      </div>
    </div>
  );
}
