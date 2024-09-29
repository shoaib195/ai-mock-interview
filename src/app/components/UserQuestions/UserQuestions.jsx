import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import './radio-styles.css';
import Image from 'next/image';

const UserQuestions = ({ formData, tabIndex, setTabIndex, setCorrectAnsers, setUserAnsers }) => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(Array(10).fill(null));
    const [currentTab, setCurrentTab] = useState(0);

    const isAPICalled = useRef(false); // Add this ref to track API call status

    const prompt = `Position: ${formData?.position}\nYears of Experience: ${formData?.experience}\nSkills: ${formData?.skills.join(", ")}\nBased on this information, please give me 10 interview questions with multiple-choice answers and one correct answer. Make sure I want this complete response in JSON format. For example [{"question": "What is the correct HTML tag for inserting an image?","options": ["option 1","option 2","option 3","option 4"],"correct_answer": "option 1"}]`;

    const handleQuestions = async () => {
        if (!formData || isAPICalled.current) {
            return; // Ensure formData is available and API is not called more than once
        }

        setLoading(true);
        isAPICalled.current = true; // Mark API as called

        try {
            const res = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBDgPnT8WcJN9P0xvOOlkN26Sj9dsIB_1Q`,
                method: 'POST',
                data: {
                    contents: [
                        { parts: [{ text: prompt }] }
                    ]
                }
            });

            console.log(res.data);

            const parsedData = JSON.parse(res.data['candidates'][0]['content']['parts'][0]['text']
                ?.replace('```json\n', '')
                .replace('\n```', ''));

            setQuestions(parsedData);
            setCorrectAnsers(parsedData.map((ans) => ans.correct_answer));

            toast.success("Request successful! Interview questions fetched.");
        } catch (error) {
            console.error(error);
            toast.error("Request failed! There was an issue fetching the questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        // Validate that the current question has been answered
        if (answers[currentTab] === null) {
            toast.error("Please choose at least one option for the current question!");
            return;
        }

        if (currentTab < questions.length - 1) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handleBack = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };

    const handleSubmit = () => {
        if (answers.some(answer => answer === null)) {
            toast.error("Please answer all questions before submitting!");
            return;
        }
        setTabIndex(tabIndex + 1);
        setUserAnsers(answers);
        toast.success("All questions answered. Check console for results.");
    };

    useEffect(() => {
        handleQuestions();
    }, [formData]); // Use formData directly as a dependency

    return (
        <div>
            <ToastContainer />
            {loading && (
                <div className='loading_div'>
                    <Image
                        src="/loader.gif"
                        alt="Remote Image"
                        width={300}
                        height={300}
                    />
                    <h2>Generating Questions </h2>
                </div>
            )}
            {questions.length > 0 ? (
                <div className='userQuestion'>
                    <motion.div
                        key={currentTab}
                        initial={{ opacity: 0, x: 150 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className='question_no'>{currentTab + 1}</h4>
                        <h3 className='ques'>{questions[currentTab].question}</h3>
                        <div className="radio-group">
                            {questions[currentTab].options.map((option, index) => (
                                <label key={index} className="radio-label">
                                    <input
                                        type="radio"
                                        name={`question-${currentTab}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(currentTab, option)}
                                        checked={answers[currentTab] === option}
                                        className="radio-input"
                                    />
                                    <div className="custom-radio" />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    <div style={{ marginTop: "20px" }}>
                        <button className='btn' style={{ marginRight: '15px' }} onClick={handleBack} disabled={currentTab === 0}>
                            Back
                        </button>
                        {currentTab < questions.length - 1 ? (
                            <button className='btn' onClick={handleNext}>Next</button>
                        ) : (
                            <button className='btn' onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </div>
            ) : (
                !loading && <p>No questions available.</p>
            )}
        </div>
    );
};

export default UserQuestions;
