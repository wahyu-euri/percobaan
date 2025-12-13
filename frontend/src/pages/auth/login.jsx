import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";
import logo from "../../assets/image/banima.png";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/admin/pengguna");
    } catch (err) {
      seterror(err.response?.data?.message);
    }
  };
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-screen login-bg">
      <div className="card flex flex-row justify-content-around items-center pr-10 pb-10 pt-10 bg-white/30 rounded-lg shadow-lg border border-black/40 w-4/6">
        <div className="flex justify-start items-start self-start h-auto">
          <img src={logo} className="w-2/4 h-auto" />
        </div>
        <div className="flex flex-col justify-start items-left w-full p-15">
          <h2 className="text-3xl text-bold text-center text-black font-bold font-bebas-neue tracking-widest">
            MASUK
          </h2>
          <p className="mb-15 text-center text-black tracking-wide">
            Masuk dengan akun anda
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="mb-5 text-black w-full">
              <label className="font-bebas-neue tracking-wider">Email : </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="border border-gray-500 rounded-sm border-danger w-full pl-2"
              />
              {error && <p>{error}</p>}
            </div>
            <div className="mb-5 text-black w-full">
              <label className="font-bebas-neue tracking-wider">
                Password :{" "}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="border border-gray-500 rounded-sm border-danger w-full pl-2 "
              />
              {error && <p>{error}</p>}
            </div>
            <div className="flex flex-row justify-start items-center w-full mb-10 text-black">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="remember"
                  className="flex items-left gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    name="ingat_saya"
                    id="remember"
                    className="cursor-pointer"
                  />
                  Ingat saya
                </label>
              </div>
              <div className="flex flex-col w-full">
                <a href="/forgot-password" className="text-right text-sm">
                  Lupa password?
                </a>
              </div>
            </div>
            <div className="w-full rounded-sm">
              <input
                type="submit"
                value="Masuk"
                className="w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600"
              />
            </div>
          </form>
        </div>
      </div>
      <p className="flex flex-row justify-end w-4/6 text-right text-black text-sm">
        © 2025{" "}
        <span className="text right text-blue-300 ml-1 mr-1">coding.site</span>{" "}
        - Created for BANIMA. All rights reserved.
      </p>
    </div>
  );
}
export default Login;
