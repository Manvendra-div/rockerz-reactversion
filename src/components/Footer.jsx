const Footer = () => {
    return (
      <footer className="border-t bg-[#18191D] w-full bg-opacity-75">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <span className="ml-3 text-xl">Rockerz WEB</span>
          </a>
          <p className="text-sm text-gray-300 sm:ml-6 sm:mt-0 mt-4">
            © 2023 Rockerz WEB — Manvendra Singh
          </p>
          <span className="flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://twitter.com/Manvend03124391"
              className="ml-3 text-gray-400 hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/manvendra-singh-0688b41ba/"
              className="ml-3 text-gray-400 hover:text-white"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/Manvendra-div"
              className="ml-3 text-gray-400 hover:text-white"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              className="ml-3 text-gray-400 hover:text-white"
              title="leave feedback"
            >
              <i className="fa-regular fa-message"></i>
            </a>
          </span>
        </div>
      </footer>
    );
  }
  
  export default Footer