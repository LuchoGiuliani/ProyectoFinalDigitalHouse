// Por ejemplo, en una página o componente de perfil de usuario
import UserProfile from "@/components/UserProfile/UserProfile";
import { useAuth } from "@/context/authContext";


const ProfilePage = () => {

  const  {login}  = useAuth();

  if (!login) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <UserProfile userId={user.id} />
    </div>
  );
};

export default ProfilePage;
