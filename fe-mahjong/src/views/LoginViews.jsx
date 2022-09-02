function PageLogin() {
  return (
    <>
      <div className="h-screen bg-[#3d476a] grid place-items-center">
        <div>
          <div className="m-2 p-2 bg-[#060628] rounded-md">
            <label></label>
            <input
              placeholder="email"
              className="px-2
              placeholder:italic 
              placeholder:text-slate-500

              font-mono
              w-72 h-8 rounded-sm bg-[#b7b7ab]"
            ></input>
          </div>
          <div className="m-2 p-2 bg-[#060628] rounded-md">
            <label></label>
            <input
              type="password"
              placeholder="password"
              className="px-2
              placeholder:italic 
              placeholder:text-slate-500
              font-mono
              w-72 h-8 rounded-sm bg-[#b7b7ab]"
            ></input>
          </div>
          <div className="flex justify-around ">
            <button className="w-24 m-2 p-2 bg-[#060628] text-[#b7b7ab] rounded-md font-mono">
              Login
            </button>
            <button className="w-24 m-2 p-2 bg-[#060628] text-[#b7b7ab] rounded-md font-mono">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageLogin;
