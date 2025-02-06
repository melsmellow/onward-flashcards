"ise client";
import { Flashcard } from "@/types/global";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
interface CardProps {
  data: Flashcard;
  number: number;
  setCard: Dispatch<SetStateAction<Flashcard[]>>;
  cards: Flashcard[];
}

const Card: FC<CardProps> = ({ data, number, setCard, cards }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-190, 0, 190], [0.6, 1, 0.6]);
  const rotate = useTransform(x, [-80, 80], [-18, 18]);
  const boxShadow = useTransform(
    x,
    [-190, 0, 190],
    [
      "10px 10px 40px rgba(0, 0, 0, 0.8)", // Left swipe - Darker shadow
      "0px 0px 20px rgba(0, 0, 0, 0.6)", // Neutral - Moderate shadow
      "10px 10px 40px rgba(0, 0, 0, 0.8)", // Right swipe - Darker shadow
    ]
  );

  const { answer, question } = data;
  const [flipped, setFlipped] = useState(false);

  const handleDragend = () => {
    if (Math.abs(x.get()) > 30) {
      const newArr = [...cards];
      const firstElement = newArr.shift();
      newArr.push(firstElement!);
      setCard(newArr);
    }
  };

  return (
    <motion.div
      className="relative w-[80%] h-[60%] transition-transform duration-500 mx-auto mt-5 hover:cursor-grab active:cursor-grabbing"
      style={{
        gridColumn: 1,
        gridRow: 1,
        x,
        opacity,
        rotate,
        boxShadow,
      }}
      onDragEnd={handleDragend}
      onClick={() => setFlipped(!flipped)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      {flipped ? (
        // Back Side (Answer)
        <div className="absolute w-full h-full bg-gray-800 text-white rounded-xl shadow-lg p-6 ">
          <p className="text-lg font-bold block">Answer {number}:</p>
          <p className="text-md">{answer}</p>
        </div>
      ) : (
        // Front Side (Question)
        <div className="absolute w-full h-full bg-gray-700 text-white rounded-xl shadow-lg p-6 ">
          <p className="text-lg font-bold block">Question {number}:</p>
          <p className="text-md">{question}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Card;
