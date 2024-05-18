import { Transition } from "@headlessui/react";
import HomePage from "./HomePage";
import Player from "./components/Player";
import { useSelector } from "react-redux";

function App() {
  const appearPlayer = useSelector((state) => state.player.value);
  return (
    <>
      <HomePage />
      <Transition
        show={appearPlayer}
        className="sticky bottom-0 z-20 w-full"
        enter="transition-all ease-in-out duration-500 delay-[200ms]"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Player />
      </Transition>
    </>
  );
}

export default App;
