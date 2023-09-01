import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { storage,database } from "../firebaseConfig";

const ProtocolForm = () => {
    const [name, setProtocolName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
  
    async function handleClick() {
      console.log(name, description, image);
      if (!name || !description || !image) {
        alert('Please fill out all required fields.');
        return;
      }
      uploadData({
        name: name,
        description: description,
      }, image);
    }

  
    const storageRef = ref(storage, name);
  
    const uploadData = (data, image) => {
      if (data) {
        const dbInstance = doc(database, "/protocols", data.name);
        setDoc(dbInstance, data).then(() => {
  
          console.log("uploaded form data");
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, image).then((snapshot) => {
            console.log("Uploaded file!");
            alert("Protocol created successfully!")
            // send to home
            window.location.href = "/";
          });
        });  
      }
  
    };
  
    return (
      <form className="w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="protocol-name"
          >
            Protocol Name
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            id="protocol-name"
            type="text"
            placeholder="Enter your Protocol name"
            value={name}
            onChange={(e) => setProtocolName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="protocol-description"
          >
            Description
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            id="description"
            type="text"
            placeholder="Enter the protocol description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            id="image"
            type="file"
            
            onChange={(e) => setImage(e.target.files?.[0])}
          />
        </div>
        <button
        type="button"
          className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    );
  };
  
  export default ProtocolForm;