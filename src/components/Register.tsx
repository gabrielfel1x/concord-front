import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { ChromePicker, ColorResult } from 'react-color';
import { getRandomColor } from '../hooks/getRandomColor';
import { colors } from '../utils';

export function Register() {
  const userColor = getRandomColor;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');
  const [color, setColor] = useState<string>(userColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await register(name, email, password, password_confirmation, color);
      navigate('/chat');
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E10] px-4">
      <div className="max-w-xl w-full space-y-8 md:bg-[#18181B] bg-transparent p-4 md:p-24 rounded-sm shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-zinc-100">Join us today!</h2>
          <p className="text-sm text-zinc-400">Create an account to get started</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70]"
                placeholder="Full Name"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Full Name
              </label>
            </div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70]"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Email address
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70]"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={password_confirmation}
                onChange={(e) => setpassword_confirmation(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 bg-zinc-700 border-none rounded-sm text-zinc-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#34AB70]"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-3 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300"
              >
                Confirm Password
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <span className="text-white text-sm">{name.charAt(0).toUpperCase()}</span>
              </div>
              <label className="text-sm text-zinc-400 transition-all peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300">
                Choose your favorite color
              </label>
              {showColorPicker && (
                <div className="absolute z-10 mt-2 p-4 bg-[#18181B] rounded-sm shadow-lg">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {colors.map((stdColor) => (
                      <div
                        key={stdColor}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: stdColor }}
                        onClick={() => setColor(stdColor)}
                      />
                    ))}
                  </div>
                  <ChromePicker
                    color={color}
                    onChange={handleColorChange}
                  />
                  <button
                    type="button"
                    onClick={handleCloseColorPicker}
                    className="mt-4 w-full py-2 px-4 text-sm font-medium text-white bg-[#34AB70] hover:bg-[#34AB70]/80 rounded-sm"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-sm text-sm font-medium text-white bg-[#34AB70] hover:bg-[#34AB70]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34AB70]"
            >
              Sign up
            </button>
            <Link
              to="/login"
              className="mt-4 block text-center text-sm text-[#34AB70] hover:text-[#34AB70]/80"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
