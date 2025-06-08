import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditableProfile =  () => {
    
  const navigate = useNavigate()

  
  const dummyUser = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [updateName, setUpdateName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('')
  const [modalOpen, setModalOpen] = useState(false)


  const getUser = async () => {
      try{
        const response = await axios.get('/api/user/getUser', {
            withCredentials : true,
        })
        if(!response.data.user){
          navigate('/Signup')
          return
        }
        const fullName = response.data.user.fullName;
        const email = response.data.user.email;
        const profilePicture = response.data.user.profilePicture
        
        
       setEmail(email)
       setName(fullName)
       setUpdateName(fullName)
       setUpdateEmail(email)
       setPicture(profilePicture)
        
      }catch(error){
        console.log("get User Failed",error.message );
        navigate('/Signup')

        
      }
     
  }

  useEffect(() => {
    getUser()
  },[])


  const logOut = async () => {
    try{
       await axios.post('/api/user/logout',{} , {
        withCredentials : true,
      })
      navigate('/login')
    }catch(error){
      console.error("Logout failed:", error.message);
    }
    
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {};
    if(updateName.trim() !== "")updateData.fullName = updateName;
    if(updateEmail.trim() !== "")updateData.email = updateEmail;

    if(Object.keys(updateData).length == 0){
      alert("Please fill at least one field to update");
      return;
    }
    try{
        await axios.put('/api/user/edit',updateData ,{
        withCredentials : true,
      },
    )
   window.location.reload()
    }catch(error){
      console.log("Update fullName and Email Failed",error.message);
    }
    
  }

  const handleModal = () => {
    setModalOpen(true)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="w-full max-w-md bg-transparent border border-gray-100 shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-300">Edit Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={picture || dummyUser.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div className="mt-2 flex gap-3">
            <button className="text-sm text-blue-600 hover:underline"
            onClick={handleModal}
            >Edit Image</button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
          {isEditingName ? (
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ) : (
            <div className="flex justify-between items-center border border-gray-300 px-4 py-2 rounded-lg">
              <span>{name}</span>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          {isEditingEmail ? (
            <input
              type="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ) : (
            <div className="flex justify-between items-center border bprder-gray-300 px-4 py-2 rounded-lg">
              <span>{email}</span>
              <button
                onClick={() => setIsEditingEmail(true)}
                className="text-blue-500 text-sm hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleUpdate}
        >
          Save Changes
        </button>
           <button
           onClick={logOut}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log Out
        </button>
      </div>



{/* edit image */}
     {modalOpen && (
  <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-96 space-y-4 relative">
      <h2 className="text-xl font-semibold text-center mb-4">Update Profile Image</h2>

      <input
        type="file"
        accept="image/*"
        className="w-full text-gray-300 bg-gray-700 p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
      >
        Update Image
      </button>

      <button
        onClick={() => setModalOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
      >
        &times;
      </button>
    </div>
  </div>
)}

  
</div>




  );
};

export default EditableProfile;
