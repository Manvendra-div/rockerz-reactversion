import { FaGithub, FaLinkedin, FaMessage, FaTwitter } from "react-icons/fa6";

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
            © 2023 Rockerz WEB — <a href="https://manvendrasingh.net.in" className="hover:text-white animate-pulse" target="_blank" rel="noreferrer">Manvendra Singh</a>
          </p>
          <span className="flex justify-center mt-3 md:mt-0 transition duration-200">
            <a
              href="https://twitter.com/Manvend03124391"
              className="ml-3 text-gray-400 hover:text-white"
              target="_blank"
            >
              <FaTwitter/>
            </a>
            <a
              href="https://www.linkedin.com/in/manvendra-singh-0688b41ba/"
              className="ml-3 text-gray-400 hover:text-white"
              target="_blank"
            >
             <FaLinkedin/>
            </a>
            <a
              href="https://github.com/Manvendra-div"
              className="ml-3 text-gray-400 hover:text-white"
              target="_blank"
            >
              <FaGithub/>
            </a>
            <a
            href="mailto:ms1577239@gmail.com"
              className="ml-3 text-gray-400 hover:text-white"
              title="leave feedback"
              target="_blank"
            >
              <FaMessage/>
            </a>
          </span>
        </div>
      </footer>
    );
  }
  
  export default Footer