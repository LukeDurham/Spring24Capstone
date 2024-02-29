// AddQuestions.js
import React, { useState } from 'react';

const AddQuestionToDatabase = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Initial options

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., sending question and options to the server)
        console.log('Question:', question);
        console.log('Options:', options);
        // Reset form after submission
        setQuestion('');
        setOptions(['', '']);
    };

    return (
        <div>
            <h2>Add Question to Database</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question:</label>
                    <input type="text" value={question} onChange={handleQuestionChange} required />
                </div>
                <div>
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    ))}
                    <button type="button" onClick={handleAddOption}>Add Option</button>
                </div>
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestionToDatabase;
