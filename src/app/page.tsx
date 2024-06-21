"use client";

import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

export default function Home() {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isButtonAbsolute, setIsButtonAbsolute] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [width, height] = useWindowSize();
  const [yesPressed, setYesPressed] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  function getRandomPosition() {
    const maxWidth = width - 200; // Subtracting the button width
    const maxHeight = height - 200; // Subtracting the button height
    const randomTop = Math.floor(Math.random() * maxHeight);
    const randomLeft = Math.floor(Math.random() * maxWidth);
    return { top: randomTop, left: randomLeft };
  }

  function handleButtonNoClick() {
    if (!isButtonAbsolute) setIsButtonAbsolute(true);
    setButtonPosition(getRandomPosition());
  }

  function handleButtonYesClick() {
    setYesPressed(true);
  }

  useEffect(() => {
    if (buttonRef.current) {
      const initialTop = buttonRef.current.offsetTop;
      const initialLeft = buttonRef.current.offsetLeft;

      console.log(`Initial position: Top ${initialTop}, Left ${initialLeft}`);
      setButtonPosition({ top: initialTop, left: initialLeft });
    }
  }, []);

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center md:p-24 p-5 bg-gradient-to-b transition duration-1000 ${
        yesPressed
          ? "bg-gradient-to-r from-pink-500 to-rose-500"
          : "from-violet-600 to-indigo-600"
      }`}
    >
      <div className="flex flex-col justify-between items-center p-10 bg-[#00000010] rounded-md backdrop-blur-3xl border h-[90vh] w-[90vw]">
        <div>{yesPressed && <Confetti height={height} width={width} />}</div>
        <h1 className="text-5xl text-white text-center font-bold mb-10">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString("Oi!")
                .pauseFor(2000)
                .deleteAll()
                .typeString("Tudo bem?")
                .pauseFor(2500)
                .deleteAll()
                .changeDelay(50)
                .typeString("Quer namorar comigo?")
                .pauseFor(1000)
                .callFunction(() => {
                  setButtonsVisible(true);
                })
                .start();
            }}
          />
        </h1>
        <div
          className={`w-full flex justify-end transition duration-1000 ${
            buttonsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            buttonRef={buttonRef}
            variant="danger"
            className={`transition duration-500 ${
              isButtonAbsolute ? "absolute" : ""
            }`}
            onClick={() => {
              handleButtonNoClick();
            }}
            style={{
              top: buttonPosition.top,
              left: buttonPosition.left,
              transition: "top 0.5s, left 0.5s", // Add transition properties
            }}
          >
            Não
          </Button>

          <Button
            className="ml-7"
            onClick={() => {
              handleButtonYesClick();
            }}
          >
            Sim
          </Button>
        </div>
      </div>
    </main>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "danger";
  style?: React.CSSProperties;
  buttonRef?: React.RefObject<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant,
  style,
  buttonRef,
}) => {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={style}
      className={`py-2 px-6 rounded-full active:opacity-50 font-bold ${
        variant === "danger" ? "bg-red-600" : "bg-sky-400"
      } text-white ${className}`}
    >
      {children}
    </button>
  );
};
