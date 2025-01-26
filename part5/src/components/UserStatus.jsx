import authService from "../services/auth";
import localStore, { USER } from "../services/store";

const UserStatus = ({ user, setUser }) => {
  const handleLogout = async () => {
    await authService.logout();
    localStore.remove(USER);
    setUser(null);
  };

  return (
    <div className="flex items-center gap-1">
      <p>{user.name} logged in</p>
      <button
        className="border border-black px-2 active:bg-gray-100"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default UserStatus;
