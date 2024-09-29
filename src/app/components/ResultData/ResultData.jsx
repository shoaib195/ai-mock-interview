import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import Certificate from '@/app/components/Certificate/Certificate';

const ResultData = ({ correctAnsers, userAnsers, formData }) => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);

  console.log('tab 3 correct ans..', correctAnsers);
  console.log('tab 3 user ans..', userAnsers);
  console.log('tab 3 fformData..', formData);

  // Updated calculateScore function to work with arrays
  function calculateScore(userAnswers, correctAnswers) {
    const totalQuestions = correctAnswers.length;
    let correctCount = 0;
    let wrongAnswers = [];

    for (let i = 0; i < totalQuestions; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        correctCount++;
      } else {
        wrongAnswers.push({
          question: `Question ${i + 1}`, // Example: Question 1, Question 2, etc.
          userAnswer: userAnswers[i],
          correctAnswer: correctAnswers[i]
        });
      }
    }

    const scorePercentage = (correctCount / totalQuestions) * 100;

    return {
      score: scorePercentage,
      correctCount,
      totalQuestions,
      wrongAnswers
    };
  }

  useEffect(() => {
    // Simulate loading with a timeout
    setTimeout(() => {
      setLoading(false);
      const calculatedScore = calculateScore(userAnsers, correctAnsers);
      setScore(calculatedScore);
    }, 5000); // 5 seconds timeout for loading
  }, [userAnsers, correctAnsers]);

  // Log the updated score after state changes
  useEffect(() => {
    if (score) {
      console.log('Score details:', score);
    }
  }, [score]);

  console.log(score)

//   const dummyScore = 92

  return (
    <div>
      {loading ? 'Loading.....' : (
        <>
      
        <div className='result_data'>
            <div className="img">
                {score?.score <= 40 ? (
                    <Image
                    src="/fail.gif"
                    alt="Remote Image"
                    width={300}
                    height={300}
                />
                ) : (score?.score >= 40 && score?.score <= 90) ? (
                    <Image
                    src="/pass.gif"
                    alt="Remote Image"
                    width={300}
                    height={300}
                />
                ) : score?.score >= 90 ? (
                    <div>
                    <Image
                    src="/ex2.gif"
                    alt="Remote Image"
                    width={300}
                    height={300}
                    className='ex2'
                    />
                    <Image
                        src="/ex1.gif"
                        alt="Remote Image"
                        width={300}
                        height={300}
                    />
                    </div>
                ) : ''}
                
                
                <h4 className={`${score?.score <= 40 ? 'failed' : score?.score >= 40 ? 'passed' : score?.score >= 90 ? 'excellent' : ''}`}>{score?.score <= 40 ? 'Failed' : score?.score >= 40 ? 'Passed' : score?.score >= 90 ? 'Excellent' : ''}</h4>
                {/* <h4 className={`${dummyScore <= 40 ? 'failed' : (dummyScore >= 40 && dummyScore <= 90) ? 'passed' : dummyScore >= 90 ? 'excellent' : ''}`}>{dummyScore <= 40 ? 'Failed' : (dummyScore >= 40 && dummyScore <= 90) ? 'Passed' : dummyScore >= 90 ? 'Excellent' : ''}</h4> */}
            </div>
        </div>
        

        <div className='ans_res'>
            <p className='position'>{formData && formData?.position}</p>
            <p className='score'>Score: {score?.score}%</p>
            <p className='score_ans'>Correct Answers: {score?.correctCount}/{score?.totalQuestions}</p>
        </div>
         

          {score?.wrongAnswers.length > 0 && (
            <div>
                <h3 className="mb-4 text-lg font-semibold">Result Details:</h3>
                <Accordion type="single" collapsible className="w-full">
                {score.wrongAnswers.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-2">You answered: <strong>{item.userAnswer}</strong></p>
                        <p>Correct answer: <strong>{item.correctAnswer}</strong></p>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
            )}
        </>
      )}

      <div className='btn_div'>
        <button className="btn" >Back to the Homepage</button>
      </div>
      <Certificate formData={formData} score={score} correctAnswers={correctAnsers} />
      
    </div>
  );
}

export default ResultData;
