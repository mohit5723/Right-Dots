  'use client';
  import React, { useState , FormEvent } from 'react';
  import { useEffect } from 'react';
  import img from './Screenshot_2024-06-20_230518-removebg-preview.png';

  interface Question {
  id: string;
  label: string;
}

interface FormData {
  [key: string]:  string; // formData can have dynamic string keys with any value
}

  const CustomForm = () => {
    const [submit, setSubmit] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const [formData, setFormData] = useState({
      'entry.1374464205': '',
      'entry.569871843': '',
      'entry.26494061': '',
      //
      'entry.135519665': '',
      // new
      'entry.1727644052': '',
      'entry.1227823523': '',
      'entry.937292675': '',
      'entry.776793653': '',
      'entry.1169714985': '',
      'entry.935255613': '',
      'entry.385599653': '',
      'entry.54283470': '',
      'entry.772817465': '',
      'entry.2001338899': '',
      'entry.1383095573': '',
      'entry.1372802332': '',
      'entry.2056251646': '',
      'entry.224539324': '',
      'entry.758053870': '',
      'entry.895823797': '',
      'entry.51915641': '',
      'entry.349670037': '',
      'entry.79931368': '',
      'entry.474857398': '',
      'entry.1317914009': '',

      'entry.458840601': '',
      'entry.244541044': '',
      'entry.224739269': '',
      'entry.637530406': '',
    });
    const [firstPage, setFirstPage] = useState(true);

    const [formVisible, setFormVisible] = useState(false); // Track form visibility
    const [score, setScore] = useState(0);
    const [performanceMessage, setPerformanceMessage] = useState('');
    const [scoreColor, setScoreColor] = useState('');

    // Update form visibility based on conditions
    useEffect(() => {
      if (!firstPage && !submit) {
        setFormVisible(true); // Show form
      } else {
        setFormVisible(false); // Hide form
      }
    }, [firstPage, submit, currentQuestion]);

    const [selectedOption, setSelectedOption] = useState('');
    const handleInputData = (input: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
    
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (input === 'entry.637530406') { // Assuming 'entry.637530406' is the email input's ID
        if (!emailRegex.test(value)) {
          setEmailError('Please enter a valid email address.');
        } else {
          setEmailError('');
        }
      }
    
      setFormData(prevState => ({
        ...prevState,
        [input]: value,
      }));
      setSelectedOption(value);
    };
    

    const handleNext = () => {
      if (formData[currentQuestionData.id as keyof typeof formData] === '') {
        setErrorMessage('Please give an answer before proceeding.');
        return; // Return early if no option is selected
      }

      setFormVisible(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setFormVisible(true);
      setSelectedOption('');
      setErrorMessage('');
    };

    const handlePrevious = () => {
      if (formData[currentQuestionData.id as keyof typeof formData] === '') {
        setErrorMessage('Please give an answer before proceeding.');
        return; // Return early if no option is selected
      }

      setFormVisible(false);
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      setFormVisible(true);
      setSelectedOption('');
      setErrorMessage('');
    };

    const handleDivClick = (optionValue: string) => () => {
      setSelectedOption(optionValue);

      // Programmatically find and click the radio button
      const radioBtn = document.querySelector(
        `input[name="${currentQuestionData.id}"][value="${optionValue}"]`
      ) as HTMLInputElement;
      if (radioBtn) {
        radioBtn.click();
      }
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmit(true);
    
      if (emailError !== '') {
        return;
      }
    
        type FormData = {
          [key: string]: string; 
         
        };
       const labeledData: { [key: string]: any } = {}; 
      questions.forEach((question) => {
        const key = question.id.toString();
        labeledData[question.label] = formData[question.id as keyof FormData] as string;
      });

    
    
      let newScore = 0;

      Object.entries(formData).forEach(([key, answer]) => {
        const lowerCaseAnswer = answer.toLowerCase();
      
        if (lowerCaseAnswer === 'yes') {
          newScore += 10;
        }
      
        // Scoring logic for Question 12 (assuming the ID for Question 12 is 'entry.1234567890')
        if (key === 'entry.54283470') { 
          if (lowerCaseAnswer === 'less than 5%') {
            newScore += 2.5;
          } else if (lowerCaseAnswer === '5% to 10%') {
            newScore += 5;
          } else if (lowerCaseAnswer === '10-20%') {
            newScore += 7.5;
          } else if (lowerCaseAnswer === 'more than 20%') {
            newScore += 10;
          }
        }
      
        // Scoring logic for Questions 13 and 14
        // Replace 'entry.9876543210' and 'entry.1122334455' with the actual IDs for these questions
        if (key === 'entry.2001338899' || key === 'entry.772817465') { 
          if (lowerCaseAnswer === 'less than 5%') {
            newScore += 2.5;
          } else if (lowerCaseAnswer === '5% to 10%') {
            newScore += 5;
          } else if (lowerCaseAnswer === '10-20%') {
            newScore += 7.5;
          } else if (lowerCaseAnswer === 'more than 20%') {
            newScore += 10;
          }
        }
      });
      
      let performanceMessage = '';
      let scoreColor = '';
      
      if (newScore < 100) {
        performanceMessage = "The volunteering initiative at your company appears to be poor, with significant room for improvement. Please contact us for a detailed report highlighting areas of strength and areas needing improvement.";
        scoreColor = '#FF0000'; // Red
      } else if (newScore >= 100 && newScore < 200) {
        performanceMessage = "The volunteering initiative at your company is average, but there is still room for improvement. Please find attached a detailed report outlining strengths and areas requiring attention.";
        scoreColor = '#FFBF00'; // Amber
      } else {
        performanceMessage = "Kudos! Your company is performing well in the volunteering initiative. Feel free to reach out to discuss how we can further enhance your efforts.";
        scoreColor = '#4CAF50'; // Green
      }
      
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(labeledData),
        });
    
        if (response.ok) {
          console.log('Email sent successfully!');
        } else {
          console.error('Error sending email.');
          console.log("Response status:", response);
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }

      setScore(newScore);
      setPerformanceMessage(performanceMessage);
      setScoreColor(scoreColor);
      


      
    }
    

    const questions = [
      {
        id: 'entry.1374464205',
        label:
          '1.Do you have an executive sponsor for the employee volunteering program within leadership ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.569871843',
        label: '2.Do you have a employee volunteering policy ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.26494061',
        label:
          '3.Does your employee volunteering Policy that aligns with your CSR policy ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.135519665',
        label:
          '4.Do you have matching grant policy / grant giving for employee volunteering program ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      // new
      {
        id: 'entry.1727644052',
        label: '5.Do you have any employee payroll deduction program?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.1227823523',
        label: '6.Do you have volunteering code of ethics defined?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.937292675',
        label:
          '7.Does your leadership team invest time in employee volunteering program?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.776793653',
        label:
          '8.Do you publish volunteering impacts/ hours / metrics in ESG / Sustainability reports?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.1169714985',
        label:
          '9.Does your employee volunteering and philanthropy / CSR spend work in tandem?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.935255613',
        label: '10.Do you have volunteering time off?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.385599653',
        label:
          '11.Do you associate volunteering under performance review process of the employee?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.54283470',
        label:
          '12.What is the current % of employee volunteering against overall headcount?',
        options: [
          { value: 'More than 20%', label: 'More than 20%' },
          { value: '10-20%', label: '10-20%' },
          { value: '5% to 10%', label: '5% to 10%' },
          { value: 'Less than 5%', label: 'Less than 5%' },
        ],
      },
      {
        id: 'entry.772817465',
        label:
          '13.What is the % of participation by Senior Leadership against overall volunteering ?',
        options: [
          { value: 'More than 20%', label: 'More than 20%' },
          { value: '10-20%', label: '10-20%' },
          { value: '5% to 10%', label: '5% to 10%' },
          { value: 'Less than 5%', label: 'Less than 5%' },
        ],
      },
      {
        id: 'entry.2001338899',
        label:
          '14.What is the % of volunteers return to volunteering more than 2 times ?',
        options: [
          { value: 'More than 20%', label: 'More than 20%' },
          { value: '10-20%', label: '10-20%' },
          { value: '5% to 10%', label: '5% to 10%' },
          { value: 'Less than 5%', label: 'Less than 5%' },
        ],
      },
      {
        id: 'entry.1383095573',
        label:
          '15.Do you provide orientation to new volunteers at the beginning of every event?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.1372802332',
        label: '16.Do you collect feedback from volunteers after every program ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.2056251646',
        label:
          '17.Do you track the hours invested and provide volunteering certificate ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.224539324',
        label: '18.Do you provide transportation for employee volunteering ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.758053870',
        label:
          '19.Do you provide food and beverages for volunteers during volunteering events ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },

      {
        id: 'entry.895823797',
        label: '20.Do you have a volunteer Rewards and Recognition program ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.51915641',
        label:
          '21.Are volunteers recognized on a regular frequency through Reward and Recognition program?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.349670037',
        label:
          '22.Do you recognize volunteers in front of their respective leadership ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.79931368',
        label:
          '23.Do you share the stories of impact through volunteering internally and externally ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.474857398',
        label: '24.Do you measure the impact of a program executed by volunteers ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },
      {
        id: 'entry.1317914009',
        label:
          '25.Do you communicate the feedback / testimony from beneficiaries back to employees ?',
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ],
      },

      {
        id: 'entry.458840601',
        label: '26.Name of the person taking the Survey',
        inputType: 'text',
      },
      {
        id: 'entry.244541044',
        label: '27.Title / Designation of the person taking this survey',
        inputType: 'text',
      },
      {
        id: 'entry.224739269',
        label: '28.Name of the Organization ',
        inputType: 'text',
      },
      {
        id: 'entry.637530406',
        label: '29.Email address of the person taking the survey',
        inputType: 'email',
      },
    ];

    const currentQuestionData = questions[currentQuestion];

    return (
      <>
        <div className="logo flex">
        
        </div>

        <div className="contactFormWrapper text-white bg-[#771770] bg-cover h-[100vh] w-[100vw] flex flex-col justify-center items-center " style={{padding:"20px"}}>
          <div className="formheader"></div>
          <div className="formcontact">
            {firstPage && !submit && (
              <div className="bg-cover h-[100vh] w-[100vw] gap-4 flex flex-col lg:flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-start w-[90vw] md:w-auto">
                  <h1>
                  Take this survey to discover the strengths and areas for improvement in your company's volunteering initiatives.
                  </h1>
                  <button
                    className="text-gray-500 my-5 font-bold bg-white rounded-sm flex justify-center items-center p-3 hover:bg-gray-900 hover:text-white"
                    onClick={() => {
                      setFirstPage(false);
                    }}
                  >
                    Start 
                  </button>
                </div>
              </div>
            )}

 
{submit && !firstPage && (
  <div className="bg-cover h-[100vh] w-[100vw] gap-4 flex flex-col lg:flex-row justify-center items-center">
    <div className="flex flex-col justify-center text-[18px] items-start w-[90vw] mx-auto">
      <h1 className="mx-auto text-2xl font-bold text-white">
        Thank You for your response! Check your mail for more details.
      </h1>
      <h2 className="mx-auto text-xl text-white mt-4">
        Your Score: <span className="font-bold"  style={{ color: scoreColor }}>{score}</span>
      </h2>
      <div className="mt-4 p-4 rounded-md" style={{ backgroundColor: scoreColor }}>
        <p className="text-center text-lg font-semibold text-white">{performanceMessage}</p>
      </div>
    </div>
  </div>
)}


 

            {!submit && !firstPage && (
              <form
                onSubmit={handleSubmit}
                target="_self"
                className={`form-container transition-transform duration-700 ${
                  formVisible ? '-translate-y-100' : 'translate-y-full'
                }`}
              >
                <fieldset
                  className={`flex flex-col justify-center form-container transition-transform duration-700 ${
                    formVisible ? '-translate-y-100' : 'translate-y-full'
                  }`}
                >
                  <div
                    className={`flex flex-col form-container transition-transform duration-700 ${
                      formVisible ? '-translate-y-100' : 'translate-y-full'
                    }`}
                  >
                    <label className="text-red-500">
                      {errorMessage !== '' && `* ${errorMessage}`}
                    </label>

                    <label className="text-red-500">
  {emailError !== '' && `* ${emailError}`}
</label>


                    <label className="my-2 font-extrabold">
                      {currentQuestion < 25
                        ? `Question ${currentQuestion + 1}`
                        : ''}
                    </label>

                    <label
                      htmlFor={currentQuestionData.id}
                      className="my-2"
                    >
                      {currentQuestionData.label}
                    </label>
                    {currentQuestionData.options ? (
                      currentQuestionData.options.map((option) => (
                        <div
                          key={option.value}
                          className={`border-2 border-white my-2 p-3 cursor-pointer ${
                            selectedOption === option.value
                              ? 'bg-gray-900 text-white'
                              : 'hover:bg-gray-900 hover:text-white hover:scale-105'
                          }`}
                          onClick={handleDivClick(option.value)}
                        >
                          <div className="flex justify-between items-center">
                            <label>{option.label}</label>
                            <input
                              required
                              type="radio"
                              name={currentQuestionData.id}
                              value={option.value}
                              onChange={handleInputData(currentQuestionData.id)}
                              checked={
                                formData[
                                  currentQuestionData.id as keyof typeof formData
                                ] === option.value
                              }
                              autoComplete="off"
                              className="mr-2 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <input
                        required
                        type={currentQuestionData.inputType}
                        name={currentQuestionData.id}
                        onChange={handleInputData(currentQuestionData.id)}
                        value={
                          formData[
                            currentQuestionData.id as keyof typeof formData
                          ]
                        }
                        autoComplete="off"
                        className={`border border-gray-300 rounded-md p-2 mt-2 text-black form-container transition-transform duration-700 ${
                          formVisible ? '-translate-y-100' : 'translate-y-full'
                        }`}
                      />
                    )}
                  </div>
                </fieldset>

                <div className="mt-4">
                  {currentQuestion > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="bg-white text-gray-500 px-4 py-2 rounded-md mr-2 hover:bg-gray-700 hover:text-white"
                    >
                      Previous
                    </button>
                  )}
                  {currentQuestion < questions.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-white text-gray-500 px-4 py-2 rounded-md mr-2 hover:bg-gray-700 hover:text-white"
                    >
                      Next
                    </button>
                  )}
                  {currentQuestion === questions.length - 1 && (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </>
    );
  };

  export default CustomForm;
