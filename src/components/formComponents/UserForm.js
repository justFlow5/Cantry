// import React, { useState } from 'react';

// import FormGoal from './FormGoal';
// import FormSpecifics from './FormSpecifics';
// import FormPrice from './FormPrice';
// import FormDeadline from './FormDeadline';

// import styled from 'styled-components';

// const Form = styled.form`
//   font-family: Arial, Helvetica, sans-serif;
//   border: 0.15rem solid #000;
//   width: 50%;
//   margin: 1rem auto;
//   padding: 1rem;
//   input {
//     display: block;
//   }

//   input[type='button'],
//   input[type='submit'] {
//     margin: 1rem auto;
//   }

//   form div {
//     margin: 1rem;
//     padding: 1rem;
//     border: 0.15rem solid #000;
//   }
// `;

// export default () => {
//   // const [step, setStep] = useState(1);
//   // const [plans, setPlans] = useState([]);

//   // const [goal, setGoal] = useState('');
//   // const [specificators, setSpecificators] = useState([]);
//   // const [singleSpec, setSingleSpec] = useState('');
//   // const [prices, setPrices] = useState([]);
//   // const [singlePrice, setSinglePrice] = useState('');

//   // const [deadline, setDeadline] = useState('');

//   // const [isComplete, setIsComplete] = useState(false);

//   // const fieldsFilled = () => {
//   //   if (goal && specificators && prices && deadline) {
//   //     setIsComplete(true);
//   //   } else {
//   //     setIsComplete(false);
//   //   }
//   // };
//   // const addPlan = () => {
//   //   // e.preventDefault();
//   //   setPlans([...plans, { goal, specificators, deadline, prices }]);
//   //   setGoal('');
//   //   setSpecificators('');
//   //   setPrices('');
//   //   setDeadline('');

//   //   fieldsFilled();
//   // };

//   // const addSpec = () => {
//   //   setSpecificators([...specificators, singleSpec]);
//   //   // const specs = [...specificators];
//   //   // specs.push(singleSpec);
//   //   // setSpecificators(specs);
//   //   setSingleSpec('');
//   // };

//   // const addPrice = () => {
//   //   setPrices([...prices, singlePrice]);
//   //   setSinglePrice('');
//   // };

//   // // const removePlan = plan => {
//   // //   setPlans(plans.filter(plan => plan.goal !== goal));
//   // // };

//   // const nextStep = () => {
//   //   setStep(step + 1);
//   // };

//   // const prevStep = () => {
//   //   setStep(step - 1);
//   // };

//   // const handleChange = e => {
//   //   // const plans = [...plans];
//   //   // plans[e.target.name] = e.target.value;
//   //   // setPlans(plans);
//   //   e.target.name = e.target.value;
//   // };

//   // return (
//   // <Form onSubmit={addPlan}>
//   //   <label htmlFor="owner">Owner</label>
//   //   <input type="text" name="owner" id="owner" />
//   //   <label htmlFor="description">Description</label>
//   //   <input type="text" name="description" id="description" />
//   //   <input type="button" value="Add New Cat" />
//   //   <input type="submit" value="Submit" />
//   //   </Form>

//   switch (step) {
//     case 1:
//       return (
//         <>
//           <FormGoal
//             goal={goal}
//             setGoal={setGoal}
//             nextStep={nextStep}
//             // handleChange={handleChange}
//             addPlan={addPlan}
//             // values={values}
//           />
//         </>
//       );
//     case 2:
//       return (
//         <>
//           <div>state: {JSON.stringify(plans)}</div>
//           <div>goal: {goal}</div>
//           <div>singleSpec: {singleSpec}</div>
//           {/* <div>specificators: {specificators}</div> */}
//           <div>specificators: {JSON.stringify(specificators)}</div>

//           <FormSpecifics
//             singleSpec={singleSpec}
//             addSpec={addSpec}
//             setSingleSpec={setSingleSpec}
//             nextStep={nextStep}
//             prevStep={prevStep}
//             // handleChange={handleChange}
//             // values={values}
//           />
//         </>
//       );
//     case 3:
//       return (
//         <>
//           <div>state: {JSON.stringify(plans)}</div>
//           <div>goal: {JSON.stringify(goal)}</div>
//           <div>singleSpec: {JSON.stringify(singleSpec)}</div>
//           <div>specificators: {JSON.stringify(specificators)}</div>
//           <div>singleSpec: {JSON.stringify(singlePrice)}</div>

//           <div>prices: {JSON.stringify(prices)}</div>
//           <FormPrice
//             nextStep={nextStep}
//             prevStep={prevStep}
//             singlePrice={singlePrice}
//             addPrice={addPrice}
//             setSinglePrice={setSinglePrice}
//             //  values={values}
//           />
//         </>
//       );

//     case 4:
//       return (
//         <>
//           <div>prices: {JSON.stringify(plans)}</div>
//           <div>deadline: {JSON.stringify(deadline)}</div>
//           <FormDeadline
//             deadline={deadline}
//             nextStep={nextStep}
//             prevStep={prevStep}
//             setDeadline={setDeadline}
//             addPlan={addPlan}
//             isComplete={isComplete}
//             plan={plans[0]}
//           />
//         </>
//       );
//   }
// };
