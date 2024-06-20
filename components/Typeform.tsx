'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import img from './Screenshot_2024-06-20_230518-removebg-preview.png';

const CustomForm = () => {
	const [submit, setSubmit] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
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

	// Update form visibility based on conditions
	useEffect(() => {
		if (!firstPage && !submit) {
			setFormVisible(true); // Show form
		} else {
			setFormVisible(false); // Hide form
		}
	}, [firstPage, submit, currentQuestion]);

	const [selectedOption, setSelectedOption] = useState('');

	const handleInputData =
		(input: string) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { value } = e.target;

			setFormData((prevState) => ({
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

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmit(true);

		let formDataEncoded = new URLSearchParams();
		formDataEncoded.append('entry.1374464205', formData['entry.1374464205']);
		formDataEncoded.append('entry.569871843', formData['entry.569871843']);
		formDataEncoded.append('entry.26494061', formData['entry.26494061']);
		formDataEncoded.append('entry.135519665', formData['entry.135519665']);
		// new
		formDataEncoded.append('entry.1727644052', formData['entry.1727644052']);
		formDataEncoded.append('entry.1227823523', formData['entry.1227823523']);
		formDataEncoded.append('entry.937292675', formData['entry.937292675']);
		formDataEncoded.append('entry.776793653', formData['entry.776793653']);
		formDataEncoded.append('entry.1169714985', formData['entry.1169714985']);
		formDataEncoded.append('entry.935255613', formData['entry.935255613']);
		formDataEncoded.append('entry.385599653', formData['entry.385599653']);
		formDataEncoded.append('entry.54283470', formData['entry.54283470']);
		formDataEncoded.append('entry.772817465', formData['entry.772817465']);
		formDataEncoded.append('entry.2001338899', formData['entry.2001338899']);
		formDataEncoded.append('entry.1383095573', formData['entry.1383095573']);
		formDataEncoded.append('entry.1372802332', formData['entry.1372802332']);
		formDataEncoded.append('entry.2056251646', formData['entry.2056251646']);
		formDataEncoded.append('entry.224539324', formData['entry.224539324']);
		formDataEncoded.append('entry.758053870', formData['entry.758053870']);
		formDataEncoded.append('entry.895823797', formData['entry.895823797']);
		formDataEncoded.append('entry.51915641', formData['entry.51915641']);
		formDataEncoded.append('entry.349670037', formData['entry.349670037']);
		formDataEncoded.append('entry.79931368', formData['entry.79931368']);
		formDataEncoded.append('entry.474857398', formData['entry.474857398']);
		formDataEncoded.append('entry.1317914009', formData['entry.1317914009']);

		formDataEncoded.append('entry.458840601', formData['entry.458840601']);
		formDataEncoded.append('entry.244541044', formData['entry.244541044']);
		formDataEncoded.append('entry.224739269', formData['entry.224739269']);
		formDataEncoded.append('entry.637530406', formData['entry.637530406']);

		try {
			const res = await fetch(
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLSffa3uWVXkwmcP_SH19lIz_A0buWGAJ0jzJi_Yo-6zMkQQHlA/formResponse',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: formDataEncoded.toString(),
				}
			);
			if (res.ok) {
				// Handle success
				console.log('Form submitted successfully');
			} else {
				// Handle error
				console.error('Form submission failed');
			}
		} catch (error) {
			console.error('Form submission failed:', error);
		}
	}

	const questions = [
		{
			id: 'entry.1374464205',
			label:
				'Do you have an executive sponsor for the employee volunteering program within leadership ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.569871843',
			label: 'Do you have a employee volunteering policy ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.26494061',
			label:
				'Does your employee volunteering Policy that aligns with your CSR policy ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.135519665',
			label:
				'Do you have matching grant policy / grant giving for employee volunteering program ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		// new
		{
			id: 'entry.1727644052',
			label: 'Do you have any employee payroll deduction program?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.1227823523',
			label: 'Do you have volunteering code of ethics defined?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.937292675',
			label:
				'Does your leadership team invest time in employee volunteering program?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.776793653',
			label:
				'Do you publish volunteering impacts/ hours / metrics in ESG / Sustainability reports?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.1169714985',
			label:
				'Does your employee volunteering and philanthropy / CSR spend work in tandem?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.935255613',
			label: 'Do you have volunteering time off?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.385599653',
			label:
				'Do you associate volunteering under performance review process of the employee?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.54283470',
			label:
				'What is the current % of employee volunteering against overall headcount?',
			options: [
				{ value: 'More than 20%', label: 'More than 20%' },
				{ value: '10-20%', label: '10-20%' },
				{ value: '20-30%', label: '20-30%' },
				{ value: '5% to 10%', label: '5% to 10%' },
				{ value: 'Less than 5%', label: 'Less than 5%' },
			],
		},
		{
			id: 'entry.772817465',
			label:
				'What is the % of participation by Senior Leadership against overall volunteering ?',
			options: [
				{ value: 'More than 20%', label: 'More than 20%' },
				{ value: '10-20%', label: '10-20%' },
				{ value: '20-30%', label: '20-30%' },
				{ value: '5% to 10%', label: '5% to 10%' },
				{ value: 'Less than 5%', label: 'Less than 5%' },
			],
		},
		{
			id: 'entry.2001338899',
			label:
				'What is the % of volunteers return to volunteering more than 2 times ?',
			options: [
				{ value: 'More than 20%', label: 'More than 20%' },
				{ value: '10-20%', label: '10-20%' },
				{ value: '20-30%', label: '20-30%' },
				{ value: '5% to 10%', label: '5% to 10%' },
				{ value: 'Less than 5%', label: 'Less than 5%' },
			],
		},
		{
			id: 'entry.1383095573',
			label:
				'Do you provide orientation to new volunteers at the beginning of every event?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.1372802332',
			label: 'Do you collect feedback from volunteers after every program ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.2056251646',
			label:
				'Do you track the hours invested and provide volunteering certificate ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.224539324',
			label: 'Do you provide transportation for employee volunteering ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.758053870',
			label:
				'Do you provide food and beverages for volunteers during volunteering events ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},

		{
			id: 'entry.895823797',
			label: 'Do you have a volunteer Rewards and Recognition program ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.51915641',
			label:
				'Are volunteers recognized on a regular frequency through Reward and Recognition program?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.349670037',
			label:
				'Do you recognize volunteers in front of their respective leadership ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.79931368',
			label:
				'Do you share the stories of impact through volunteering internally and externally ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.474857398',
			label: 'Do you measure the impact of a program executed by volunteers ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},
		{
			id: 'entry.1317914009',
			label:
				'Do you communicate the feedback / testimony from beneficiaries back to employees ?',
			options: [
				{ value: 'Yes', label: 'Yes' },
				{ value: 'No', label: 'No' },
			],
		},

		{
			id: 'entry.458840601',
			label: 'Name of the person taking the Survey',
			inputType: 'text',
		},
		{
			id: 'entry.244541044',
			label: 'Title / Designation of the person taking this survey',
			inputType: 'text',
		},
		{
			id: 'entry.224739269',
			label: 'Name of the Organization ',
			inputType: 'text',
		},
		{
			id: 'entry.637530406',
			label: 'Email address of the person taking the survey',
			inputType: 'email',
		},
	];

	const currentQuestionData = questions[currentQuestion];

	return (
		<>
			<div className="logo flex">
			
			</div>

			<div className="contactFormWrapper text-white bg-[#771770] bg-cover h-[100vh] w-[100vw] flex flex-col justify-center items-center">
				<div className="formheader"></div>
				<div className="formcontact">
					{firstPage && !submit && (
						<div className="bg-cover h-[100vh] w-[100vw] gap-4 flex flex-col lg:flex-row justify-center items-center">
							<div className="flex flex-col justify-center items-start w-[90vw] md:w-auto">
								<h1>
									Did you know that you could potentially save $100,000 on your
									home loan?
								</h1>
								<button
									className="text-gray-500 my-5 font-bold bg-white rounded-sm flex justify-center items-center p-3 hover:bg-gray-900 hover:text-white"
									onClick={() => {
										setFirstPage(false);
									}}
								>
									Start Saving
								</button>
							</div>
						</div>
					)}

					{submit && !firstPage && (
						<div className="bg-cover h-[100vh] w-[100vw] gap-4 flex flex-col lg:flex-row justify-center items-center">
							<div className="flex flex-col justify-center text-[18px] items-start w-[90vw] mx-auto">
								<h1 className="mx-auto">
									Thank You for your response, Check your mail for more details.
								</h1>
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
