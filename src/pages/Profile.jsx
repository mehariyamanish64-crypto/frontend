import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    gender: "",
    image: "",
  });

  const [villages, setVillages] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [tempImage, setTempImage] = useState("");
  const [editMode, setEditMode] = useState(false);

  // LOAD USER FROM LOGIN
  useEffect(() => {

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser(savedUser);
      setTempImage(savedUser.image || "");
    }

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUser(prev => ({ ...prev, [name]: value }));

  };

  // PINCODE API
  const handlePincodeBlur = async () => {

    if (user.pincode.length === 6) {

      try {

        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${user.pincode}`
        );

        const postOffices = response.data[0].PostOffice;

        if (postOffices && postOffices.length > 0) {

          const villageList = [...new Set(postOffices.map(po => po.Name))];
          const talukaList = [...new Set(postOffices.map(po => po.Block || po.Taluk))];

          setVillages(villageList);
          setTalukas(talukaList);

          setUser(prev => ({
            ...prev,
            district: postOffices[0].District,
            state: postOffices[0].State
          }));

        }

      } catch (err) {

        console.error(err);
        alert("Invalid Pincode");

      }

    }

  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => setTempImage(reader.result);

      reader.readAsDataURL(file);

    }

  };

  // SAVE PROFILE
  const handleSave = () => {

    if (
      !user.mobile ||
      !user.address ||
      !user.pincode ||
      !user.village ||
      !user.taluka ||
      !user.district ||
      !user.state ||
      !user.gender
    ) {

      alert("⚠️ Please fill all the profile details.");
      return;

    }

    const updatedUser = { ...user, image: tempImage };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);

    setEditMode(false);

    alert("Profile saved successfully");

  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h2>My Profile</h2>

        {tempImage || user.image ? (

          <img
            className="profile-image"
            src={tempImage || user.image}
            alt="Profile"
          />

        ) : (

          <div className="profile-placeholder">
            Upload Image
          </div>

        )}

        {/* NAME & EMAIL (READ ONLY) */}

        <div className="profile-info">

          <input
            type="text"
            value={user.name}
            readOnly
          />

          <input
            type="email"
            value={user.email}
            readOnly
          />

        </div>

        {editMode && (

          <>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={user.mobile}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={user.pincode}
              onChange={handleChange}
              onBlur={handlePincodeBlur}
            />

            {villages.length > 0 && (

              <select
                name="village"
                value={user.village}
                onChange={handleChange}
              >

                <option value="">Select Village</option>

                {villages.map((v,i)=>(
                  <option key={i} value={v}>{v}</option>
                ))}

              </select>

            )}

            {talukas.length > 0 && (

              <select
                name="taluka"
                value={user.taluka}
                onChange={handleChange}
              >

                <option value="">Select Taluka</option>

                {talukas.map((t,i)=>(
                  <option key={i} value={t}>{t}</option>
                ))}

              </select>

            )}

            <input
              type="text"
              name="district"
              value={user.district}
              readOnly
            />

            <input
              type="text"
              name="state"
              value={user.state}
              readOnly
            />

            <div className="radio-group">

              <label><strong>Gender:</strong></label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={user.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={user.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>

            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <button
              className="profile-button"
              onClick={handleSave}
            >
              Save
            </button>

          </>

        )}

        {!editMode && (

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            <button
              className="profile-button"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>

            <button
              className="profile-button logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>

  );

}