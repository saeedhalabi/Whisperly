import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-4 text-sm">
      Don't have an account?{" "}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="text-indigo-600 hover:underline cursor-pointer"
      >
        Register
      </button>
    </div>
  );
};

export default SignIn;
