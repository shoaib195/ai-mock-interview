"use client";

import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import UserFrom from '@/app/components/UserFrom/UserFrom';
import UserQuestions from '@/app/components/UserQuestions/UserQuestions';
import ResultData from '@/app/components/ResultData/ResultData';
import Certificate from "@/app/components/Certificate/Certificate";
import './styles.css'

const Page = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState(null);
  const [correctAnsers, setCorrectAnsers] = useState([]);
  const [userAnsers, setUserAnsers] = useState([]);

  const tabs = [
    { title: "Please fill the details", content: <UserFrom onSubmitForm={handleFormSubmit} /> },
    { title: "", content: <UserQuestions formData={formData} tabIndex={tabIndex} setTabIndex={setTabIndex} setCorrectAnsers={setCorrectAnsers} setUserAnsers={setUserAnsers} /> },
    { title: "", content: <ResultData correctAnsers={correctAnsers} userAnsers={userAnsers} formData={formData} /> },
  ];

  function handleFormSubmit(data: SetStateAction<null>) {
    setFormData(data); // Store form data
    handleNext(); // Go to the next tab
  }

  const handleNext = () => {
    if (tabIndex < tabs.length - 1) {
      setTabIndex(tabIndex + 1);
    }
  };

  const handleBack = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="userForm">
        <h2 className="main_heading">AI Mock Interview</h2>
      <div>
        <motion.div
          key={tabIndex}
          custom={tabIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          <h2>{tabs[tabIndex].title}</h2>
          <p>{tabs[tabIndex].content}</p>
        </motion.div>
      </div>

      {tabIndex > 1 && <><div style={{ marginTop: "20px" }}>
        {/* <button onClick={handleBack} disabled={tabIndex === 0}>
          Back
        </button> */}
        {/* <button className="btn" onClick={handleNext} disabled={tabIndex === tabs.length - 1 || tabIndex === 0}>
          Next
        </button> */}
      </div></>}

    </div>
  );
};

export default Page;
