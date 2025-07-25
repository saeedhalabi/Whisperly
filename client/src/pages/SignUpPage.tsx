import { ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";
import { signUp } from "../services/api";
import { SignUpFormData } from "../types/auth.types";
import SignUp from "../features/auth/SignUp";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await signUp(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      if (response.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/sign-in");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong");
      } else {
        setError("Network error, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-image flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <Title title="Create An Account" />
      <div className="bg-white p-8 rounded-4xl drop-shadow-lg w-96 space-y-5">
        <InputField
          type="text"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        {/* Password Field with FontAwesome Eye Toggle */}
        <div className="relative">
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-8 text-gray-600 text-lg"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        <div className="relative">
          <InputField
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(prev => !prev)}
            className="absolute right-3 top-8 text-gray-600 text-lg"
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        {error && (
          <div className="text-red-700 text-sm text-center">{error}</div>
        )}

        <Button text={loading ? "Signing Up..." : "Sign Up"} />
        <SignUp />
      </div>
    </form>
  );
};

export default SignUpPage;
