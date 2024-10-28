"use client";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/dashboard/sales-form";
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full bg-background p-10 rounded-none shadow-none">
        <h2 className="text-spaceCadet text-3xl mb-5 font-bold">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-spaceCadet text-lg mb-2"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-3 text-sm text-spaceCadet bg-white outline-none border-none focus:border-transparent focus:ring-0 mb-5"
          />
          <label
            className="block text-spaceCadet text-lg mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 text-sm text-spaceCadet bg-white outline-none border-none focus:border-transparent focus:ring-0 mb-5"
          />
          <button
            className="bg-backgroundBlue text-white p-3 w-full text-lg hover:bg-blue-600"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
