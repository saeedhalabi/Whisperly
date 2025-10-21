import { ChangeEvent, useState, FormEvent } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import { signIn } from "../services/api";
import { SignInFormData } from "../types/auth.types";
import SignIn from "../features/auth/SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [capsLock, setCapsLock] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signIn(formData.email, formData.password);

      if (response.status === 200) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("token", response.data.token);

        navigate("/home-page");
      }
    } catch (error: any) {
      setError(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-image flex flex-col items-center justify-center min-h-screen">
      <Title title="Sign in to your account" />
      <form
        className="bg-white p-8 rounded-4xl drop-shadow-lg w-96 space-y-5"
        onSubmit={handleSubmit}
      >
        <InputField
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <div className="relative">
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            onKeyDown={handleCapsLock}
            onKeyUp={handleCapsLock}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-8 text-gray-600 text-lg"
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>

          {capsLock && (
            <div className="flex items-center space-x-1 mt-1 text-sm text-yellow-700 font-medium select-none">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span>Caps Lock is ON</span>
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-700 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          disabled={loading}
          text={
            loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )
          }
        />

        <SignIn />
      </form>
    </main>
  );
};

export default SignInPage;
