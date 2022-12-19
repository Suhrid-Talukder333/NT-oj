import React from "react";
import brand from "../assets/nt-logo.png"

export default function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  
  const handleInputChange = (e, label) => { 
    e.preventDefault();
    switch (label) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "passwordConfirmation":
        setPasswordConfirmation(e.target.value);
        break; 
      default:
        break;       
    }
  }

  const handleRegister = () => {
    if(password !== passwordConfirmation) {
      alert("Passwords do not match");
      return
    }
    const user = { userName: name, password, userEmail: email };
    fetch("http://localhost:8080/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      alert(res)
    });
  }

  return (
      <div>
          <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
              <div>
              <img
                className="mx-auto h-12 w-auto"
                src={brand}
                alt="Your Company"
              />
              </div>
              <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                  <form>
                      <div>
                          <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Name
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="text"
                                  name="name"
                                  value={name}
                                  onChange={(e) => handleInputChange(e, "name")}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                      </div>
                      <div className="mt-4">
                          <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Email
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="email"
                                  name="email"
                                  value={email}
                                  onChange={(e) => handleInputChange(e, "email")}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                      </div>
                      <div className="mt-4">
                          <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Password
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="password"
                                  name="password"
                                  value={password}
                                  onChange={(e) => handleInputChange(e, "password")}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                      </div>
                      <div className="mt-4">
                          <label
                              htmlFor="password_confirmation"
                              className="block text-sm font-medium text-gray-700 undefined"
                          >
                              Confirm Password
                          </label>
                          <div className="flex flex-col items-start">
                              <input
                                  type="password"
                                  name="password_confirmation"
                                  value={passwordConfirmation}
                                  onChange={(e) => handleInputChange(e, "passwordConfirmation")}
                                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                          </div>
                      </div>
                      <div className="flex items-center mt-4">
                          <span onClick={handleRegister} className="w-full px-4 py-2 tracking-wide text-white text-center cursor-pointer transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                              Register
                          </span>
                      </div>
                  </form>
                  <div className="mt-4 text-grey-600">
                      Already have an account?{" "}
                      <span>
                          <a className="text-purple-600 hover:underline" href="/login">
                              Log in
                          </a>
                      </span>
                  </div>
              </div>
          </div>
      </div>
  );
}