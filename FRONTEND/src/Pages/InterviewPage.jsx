import React, { useState } from 'react'


export const InterviewPage = () => {

    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null);
  return (
    <div>
        {step ===  1 && (<Step1Setup  onstart = {(data) =>{ setInterviewData(data); setStep(2); }} />)}
        {step ===  2 && (<Step2Interview  interviewData = {interviewData} onfinish = {(report) => { setInterviewData(report); setStep(3); }} />)}
        {step ===  3 && (<Step3Report   report = {interviewData} />)}
    </div>
  )
}
