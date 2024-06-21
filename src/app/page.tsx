"use client";

import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isButtonAbsolute, setIsButtonAbsolute] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [width, height] = useWindowSize();
  const [yesPressed, setYesPressed] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [stage, setStage] = useState<"initial" | "final">("initial");

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

      setButtonPosition({ top: initialTop, left: initialLeft });
    }
  }, []);

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-5 bg-gradient-to-b transition duration-1000 ${
        yesPressed
          ? "bg-gradient-to-r from-pink-500 to-rose-500"
          : "from-violet-600 to-indigo-600"
      }`}
    >
      <div>{yesPressed && <Confetti height={height} width={width} />}</div>
      <div className="flex flex-col justify-between items-center p-10 bg-[#00000010] backdrop-blur-3xl border border-[#FFFFFF10] h-[90vh] w-[90vw]">
        <div></div>
        {stage === "initial" ? (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center text-white font-bold mb-10 text-xl">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1500)
                    .changeDelay(40)
                    .typeString(
                      "Eu gosto de pensar na vida como um livro, e em Deus como o autor. Cada capítulo são partes da nossa história que nos levam a cumprir um propósito meticulosamente planejado pelo autor."
                    )
                    .pauseFor(1000)
                    .typeString(
                      "<br/><br/>Desde que nos encontramos pela primeira vez, sinto que um novo capítulo começou a ser escrito e que nele muitas boas histórias serão contadas, não vejo a hora de descobri-las com você!"
                    )
                    .pauseFor(1000)
                    .changeDelay(100)
                    .typeString("❤️")
                    .pauseFor(1500)
                    .typeString(
                      "<br/><br/>E é por isso que eu queria te perguntar algo..."
                    )
                    .pauseFor(2000)
                    .callFunction(() => {
                      setShowNextButton(true);
                    })
                    .start();
                }}
              />
            </div>
            <div
              className={`transition duration-1000 ${
                showNextButton ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                className=""
                onClick={() => {
                  setStage("final");
                }}
              >
                <div className="flex justify-center items-center">
                  Continuar <FaChevronRight className="ml-4" />
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="text-5xl text-white text-center font-bold mb-10">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1000)
                  .typeString("E ai?")
                  .pauseFor(1500)
                  .deleteAll()
                  .pauseFor(1000)
                  .deleteAll()
                  .changeDelay(150)
                  .typeString("Quer namorar comigo?")
                  .pauseFor(1000)
                  .callFunction(() => {
                    setButtonsVisible(true);
                  })
                  .start();
              }}
            />
          </h1>
        )}

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
