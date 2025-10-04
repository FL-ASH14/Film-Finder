// src/components/AuthModal.jsx
import React, { useState } from "react";

// Define the available characters for profiles
const characters = [
  { name: "Neo", avatarUrl: "/images/avatars/neo.jpg" },
  { name: "Frodo", avatarUrl: "/images/avatars/frodo2.jpg" },
  { name: "Mia", avatarUrl: "/images/avatars/Mia.jpg" },
  { name: "Seb", avatarUrl: "/images/avatars/rg.jpg" },
  { name: "Sherlock Holmes", avatarUrl: "/images/avatars/SH.jpg" },
  { name: "Johnny English", avatarUrl: "/images/avatars/english.jpg" },
  // Add more characters here
];

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // State for the multi-step signup process
  const [step, setStep] = useState(1); // 1: Credentials, 2: Profile Selection

  // Form fields
  const [username, setUsername] = useState(""); // This is the "Login Name"
  const [password, setPassword] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset all state when closing the modal
    setUsername("");
    setPassword("");
    setSelectedProfile(null);
    setError("");
    setStep(1);
    setIsSignUp(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- SIGN UP LOGIC ---
    if (isSignUp) {
      if (step === 1) {
        // Move to the next step after entering credentials
        setStep(2);
      } else {
        // Final step: submit the full form
        if (!selectedProfile) {
          setError("Please select a character profile.");
          return;
        }
        try {
          const res = await fetch(`http://localhost:4000/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              username, 
              password,
              profileName: selectedProfile.name,
              profileAvatar: selectedProfile.avatarUrl,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          onAuthSuccess(data.user);
          handleClose();
        } catch (err) {
          setError(err.message);
        }
      }
    // --- SIGN IN LOGIC ---
    } else {
      try {
        const res = await fetch(`http://localhost:4000/api/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        onAuthSuccess(data.user);
        handleClose();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const renderSignUpStep1 = () => (
    <>
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Create Account</h2>
      <input
        type="text"
        placeholder="Login Name (e.g., user123)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-purple-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-purple-500"
        required
      />
      <button type="submit" className="mt-2 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
        Next: Choose Profile
      </button>
    </>
  );

  const renderSignUpStep2 = () => (
     <>
      <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">Choose Your Character</h2>
      <p className="text-center text-gray-600 mb-4">This will be your public name and avatar.</p>
      <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto p-2 bg-gray-100 rounded-lg">
        {characters.map(char => (
          <div key={char.name} onClick={() => setSelectedProfile(char)} className={`cursor-pointer p-2 rounded-lg text-center transition ${selectedProfile?.name === char.name ? 'bg-purple-500 text-white ring-2 ring-purple-700' : 'hover:bg-purple-200'}`}>
            <img src={char.avatarUrl} alt={char.name} className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-white"/>
            <p className="mt-2 font-semibold text-gray-800">{char.name}</p>
          </div>
        ))}
      </div>
      <button type="submit" className="mt-4 w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
        Create Account
      </button>
    </>
  );

  const renderSignIn = () => (
     <>
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Sign In</h2>
      <input
        type="text"
        placeholder="Login Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-purple-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-purple-500"
        required
      />
      <button type="submit" className="mt-2 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
        Sign In
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp ? (step === 1 ? renderSignUpStep1() : renderSignUpStep2()) : renderSignIn()}
        </form>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        <div className="mt-6 text-center text-gray-700">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button onClick={() => { setIsSignUp(!isSignUp); setStep(1); setError(''); }} className="text-purple-600 font-semibold hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <button onClick={handleClose} className="mt-4 w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;