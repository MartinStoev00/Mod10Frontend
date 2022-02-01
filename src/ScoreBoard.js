import { getScore } from "./utils";
import { useEffect } from "react";
import { useState } from "react";

const ScoreBoard = () => {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getScore();
      const ans = res.res.sort((a, b) => {
        return a.score - b.score;
      });
      setScores(ans);
    })();
  }, []);

  return (
    <div className="board">
      <h3>Best Scores: </h3>
      {scores.map(({ score, user_id }) => (
        <div key={user_id}>
          <span>{user_id}</span>
          <span>{score}s</span>
        </div>
      ))}
    </div>
  );
};
export default ScoreBoard;
