import { getScore } from "./utils";
import { useEffect } from "react";
import { useState } from "react";

const ScoreBoard = ({ finished }) => {
  // state of the scores:
  const [scores, setScores] = useState(null);
  // useEffect which fires when the finished variable has changed
  // it sends GET request and sets the state to the result received
  // also sorts the scores ascendingly
  useEffect(() => {
    (async () => {
      const res = await getScore();
      const ans = res.res.sort((a, b) => {
        return a.score - b.score;
      });
      setScores(ans);
    })();
  }, [finished]);

  return (
    <div className="board">
      <h3>Best Scores: </h3>
      {scores != null &&
        // maps all the scores to html components
        scores.map(({ score, user_id }) => (
          <div key={user_id}>
            <span>{user_id}</span>
            <span>{score}s</span>
          </div>
        ))}
      {scores == null && <div>Loading...</div>}
    </div>
  );
};
export default ScoreBoard;
