import "./App.css";
import { useState, useEffect } from "react";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const saveValue = JSON.parse(localStorage.getItem("saved-values")) ?? {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    return saveValue;
  });

  const updateFeedback = (option) => {
    setFeedback({
      ...feedback,
      [option]: feedback[option] + 1,
    });
  };

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
     
      <Description />
      <Options onFeedback={updateFeedback} onReset={resetFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback 
          good={feedback.good} 
          neutral={feedback.neutral} 
          bad={feedback.bad} 
          total={totalFeedback} 
          positivePercentage={positiveFeedback} 
        />
      ) : (
        <Notification />
      )}
  
      
    </>
  );
}

export default App;