import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
const [data ,setData] = useState([]);
  function fetchData (){
    fetch (" http://localhost:3000/questions")
    .then (resp => resp.json())
    .then(setData)
  }
  console.log(data);
  useEffect(fetchData, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const update = data.filter((q) => q.id !== id);
        setData(update);
      });
  }

  function handleAnswer(id, correctIndex) {
    fetch(`http://localhost:3000/questions/a${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = data.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setData(updatedQuestions);
      });
    }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {data.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDelete={handleDelete}
      onAnswer={handleAnswer}
    />
  ))}
      </ul>
    </section>
  );
}

export default QuestionList;
