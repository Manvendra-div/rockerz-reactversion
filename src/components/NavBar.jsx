const NavBar = () => {
  return (
    <div
      id="navBar"
      className="flex sticky top-0 z-10 justify-center backdrop-blur-sm bg-black/30 flex-col lg:flex-row"
    >
      <nav className="self-center w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-around items-center text-white">
          <div className="flex">
            <i className="fa-sharp fa-solid fa-music text-3xl py-3"></i>
            <h1 className="uppercase pl-5 py-4 text-lg font-sans font-bold">
              Rockerz WEB
            </h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
