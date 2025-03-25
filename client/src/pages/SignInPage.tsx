import { ChangeEvent, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="bg-image flex flex-col items-center">
      <Title title="Sign in to your account" />
      <form className="bg-white p-8 rounded-4xl drop-shadow-lg w-96 space-y-5">
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
        <Button text="Sign In" />
      </form>
    </main>
  );
};

export default SignInPage;
