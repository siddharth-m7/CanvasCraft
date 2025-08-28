import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import UserImages from "../Components/UserImages";

function ProfilePage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 mt-20 bg-white">
      {/* Profile Info Card */}
      <div className="bg-white border border-green-500 rounded-2xl shadow-lg p-8 flex items-center gap-8 mb-10">
        <img
          src={user.profilePicture || "https://via.placeholder.com/100"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-green-600 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{user.username}</h2>
          <p className="text-gray-700">{user.email}</p>
          {/* <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 hover:scale-105 transition">
            Edit Profile
          </button> */}
        </div>
      </div>

      {/* Uploaded Images Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-green-500 inline-block pb-1 mb-6">
          Generated Images
        </h3>
        <UserImages />
      </div>
    </div>
  );
}

export default ProfilePage;
