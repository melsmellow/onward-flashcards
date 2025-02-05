"ise client";
import { Flashcard } from "@/types/global";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
interface CardProps {
  data: Flashcard;
  number: number;
  setCard: Dispatch<SetStateAction<Flashcard[]>>;
  cards: Flashcard[];
}

const Card: FC<CardProps> = ({ data, number, setCard, cards }) => {
  console.log(data);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-190, 0, 190], [0.6, 1, 0.6]);
  const rotate = useTransform(x, [-190, 190], [-18, 18]);
  const { answer, question } = data;
  const [flipped, setFlipped] = useState(false);

  const handleDragend = () => {
    if (Math.abs(x.get()) > 30) {
      console.log("im here");
      const newArr = [...cards];
      const firstElement = newArr.shift();
      newArr.push(firstElement!);
      setCard(newArr);
    }
  };

  return (
    <motion.div
      className="relative w-[80%] h-[60%] transition-transform duration-500 mx-auto mt-5 hover:cursor-grab active:cursor-grabbing"
      animate={{ rotateY: flipped ? 180 : 0 }}
      style={{
        transformStyle: "preserve-3d",
        gridColumn: 1,
        gridRow: 1,
        x,
        opacity,
        rotate,
      }}
      onDragEnd={handleDragend}
      onClick={() => setFlipped(!flipped)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      {/* Front Side */}
      <div
        className="absolute w-full h-full bg-gray-800 text-white rounded-xl shadow-lg p-6"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* <p className="text-lg font-bold block text-center fixed right-5 top-5">
          {number}
        </p> */}
        <p className="text-lg font-bold block">Answer:</p>
        <p className="text-md">{answer}</p>
      </div>

      {/* Back Side */}
      <div
        className="absolute w-full h-full bg-gray-700 text-white rounded-xl shadow-lg p-6"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* <p className="text-lg font-bold block text-center fixed right-5 top-5">
          {number}
        </p> */}
        <p className="text-lg font-bold block">Question:</p>
        <p className="text-md">{question}</p>
      </div>
    </motion.div>
  );
};

export default Card;
