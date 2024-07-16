import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { auth, googleProvider, facebookProvider } from '../../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import Footer from '../login/Footer';

interface RegisterProps {
  onRegister: (role: string, username: string) => void;
}

const validationSchema = yup.object({
  username: yup.string().required('Tên đăng nhập là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: 'User',
        date: new Date().toISOString(),
        isActive: true,
        cart: [],
      };

      try {
        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          onRegister('User', values.username);
          navigate('/');
        } else {
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Login Success:', user);
      onRegister('User', user.displayName || user.email || 'Google User');
      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Facebook Login Success:', user);
      onRegister('User', user.displayName || user.email || 'Facebook User');
      navigate('/');
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-red-600">Shopee</div>
        <div className="text-sm text-red-600">Bạn cần giúp đỡ?</div>
      </header>
      <div className="relative flex-1 flex bg-gray-100" style={{ minHeight: '90vh' }}>
        <div className="relative w-2/3">
          <img
            src="https://down-vn.img.susercontent.com/file/sg-11134004-7rd47-lwqocuzahgi2c3"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>
        <div className="relative z-10 w-1/3 bg-white p-8 rounded-lg shadow-lg flex items-center justify-center border border-red-500 m-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký</h2>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Tên đăng nhập"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Xác nhận mật khẩu"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Đăng ký
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <a href="#" className="hover:text-red-500">Quên mật khẩu</a>
              <a href="#" className="hover:text-red-500">Đăng nhập với SMS</a>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400">HOẶC</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleFacebookLogin}
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300 mr-2"
              >
                Facebook
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-2"
              >
                Google
              </button>
            </div>
            <div className="text-center mt-6 text-sm text-gray-600">
              Bạn đã có tài khoản? <a href="login" className="text-red-500 hover:underline">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
