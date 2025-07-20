import { Link } from 'react-router';
import errorImage from '../assets/Error.jpg'; // Make sure to place your image in src/assets/

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
      <img src={errorImage} alt="Error" className="w-120 max-w-full mb-8" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        We couldn't find the medical camp or the page you're looking for.
      </p>
      <Link to="/" className="btn bg-cyan-300">Go Home</Link>
    </div>
  );
};

export default Error;
