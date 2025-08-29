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
    <div className="max-w-5xl mx-auto p-6 mt-24 bg-white border border-green-500 rounded-xl">
      {/* Profile Info */}
      <div className="flex items-center gap-6 border-b border-green-300 pb-6 mb-8">
        <img
          src={user.profilePicture || "https://via.placeholder.com/100"}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-green-600"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>

      {/* Uploaded Images Section */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 border-b border-green-500 inline-block pb-1 mb-4">
          Generated Images
        </h3>
        <UserImages />
      </div>
    </div>
  );
}

export default ProfilePage;
