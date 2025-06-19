
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <input type="text" placeholder="username" className="border border-gray-300 rounded-md p-2" />
        <input type="password" placeholder="password" className="border border-gray-300 rounded-md p-2" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <a href="#" className="text-blue-500">Forgot password?</a>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
      </div>
    </div>
  )
}

export default LoginPage