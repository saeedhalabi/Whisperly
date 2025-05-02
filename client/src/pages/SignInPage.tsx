import { ChangeEvent, useState, FormEvent } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import { signIn } from "../services/api";
import { SignInFormData } from "../types/auth.types";
import SignIn from "../features/auth/SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
  
        // Navigate immediately after storing token
        navigate("/home-page");
      }
    } catch (error: any) {
      setError(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <main className="bg-image flex flex-col items-center justify-center">
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
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-8 text-gray-600 text-lg"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        {error && (
          <div className="text-red-700 text-sm text-center">{error}</div>
        )}

        <Button text={loading ? "Signing In..." : "Sign In"} />
        <SignIn />
      </form>
    </main>
  );
};

export default SignInPage;
