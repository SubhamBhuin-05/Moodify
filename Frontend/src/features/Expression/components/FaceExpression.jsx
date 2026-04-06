import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/util";
import "../styles/expression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const expression = detect({ landmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
  }

  return (
    <div className="face-expression">
      <video ref={videoRef} className="face-expression__video" playsInline />
      <h2
        className={`face-expression__status face-expression__status--${expression.toLowerCase()}`}
      >
        {expression}
      </h2>
      <button className="face-expression__btn" onClick={handleClick}>
        Detect expression
      </button>
    </div>
  );
}
