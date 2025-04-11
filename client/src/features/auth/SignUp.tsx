import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-4 text-sm">
      Already have an account?{" "}
      <button
        type="button"
        onClick={() => navigate("/sign-in")}
        className="text-indigo-600 hover:underline cursor-pointer"
      >
        Sign in
      </button>
    </div>
  );
};

export default SignUp;
