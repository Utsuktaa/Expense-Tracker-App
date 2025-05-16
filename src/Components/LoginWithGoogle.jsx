import { useGoogleLogin } from "@react-oauth/google";

const LoginWithGoogle = () => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        console.log(authResult.code);
        const response = await fetch(
          `http://localhost:5000/api/auth/google?code=${authResult.code}`,
          { method: "GET" }
        );
        console.log("here");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full border rounded-lg p-2 hover:bg-gray-200 mb-4"
    >
      <img src="/image/google.png" alt="Google Logo" className="w-5 h-5 mr-3" />
      Login with Google
    </button>
  );
};

export default LoginWithGoogle;
