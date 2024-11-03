"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const PomodoroTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [minutesInput, setMinutesInput] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const timerRef = useRef<HTMLDivElement>(null);

  const toggleTimer = () => setIsOpen(!isOpen);

  const startTimer = () => {
    setTimeLeft(minutesInput * 60 + secondsInput);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      const audio = new Audio("/audio.mp3");
      audio.play();
    }
  }, [isRunning, timeLeft]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - (timerRef.current?.offsetWidth || 0) / 2,
        y: e.clientY - (timerRef.current?.offsetHeight || 0) / 2,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={toggleTimer}>
        Set Timer
      </Button>

      {isOpen && (
        <div
          ref={timerRef}
          style={{ top: `${position.y}px`, left: `${position.x}px`, position: "fixed" }}
          className="z-[99999] w-80 p-4 shadow-lg rounded-md dark:bg-neutral-700 bg-white"
        >
          <div
            onMouseDown={handleMouseDown}
            className="flex justify-between  dark:text-white items-center p-2"
          >
            <span>Alarm sounds at end.</span>
            <X onClick={toggleTimer} className="h-4 w-4 text-gray-500 hover:text-gray-300" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block dark:text-gray-300 text-gray-600">Minutes</label>
              <input
                type="number"
                min="0"
                value={minutesInput}
                onChange={(e) => setMinutesInput(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block dark:text-gray-300 text-gray-600">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={secondsInput}
                onChange={(e) => setSecondsInput(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            <h2 className="text-3xl  dark:text-gray-300 font-bold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </h2>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={startTimer} variant="ghost" size="sm">
              Start
            </Button>
            <Button onClick={resetTimer} variant="ghost" size="sm">
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
