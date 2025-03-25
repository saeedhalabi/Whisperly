import { ChangeEvent, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="bg-image flex flex-col items-center">
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
        <InputField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <InputField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <Button text="Sign Up" />
      </div>
    </form>
  );
};

export default SignUpPage;
