import { useState } from 'react'
import { Step1Setup } from '../Components/Step1Setup'
import { Step2Interview } from '../Components/Step2Interview'
import { Step3Report } from '../Components/Step3Report'

export const InterviewPage = () => {

    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null);
  return (
    <div>
        {step ===  1 && (<Step1Setup  onstart = {(data) =>{ setInterviewData(data); setStep(2); }} />)}
        {step ===  2 && (<Step2Interview  interviewData = {interviewData} onfinish = {(report) => { setInterviewData(report); setStep(3); }} />)}
        {step === 3 && (<Step3Report report={interviewData} />)}
    </div>
  )
}
