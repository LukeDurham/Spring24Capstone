// CreateSurvey.js
import React, { useState } from 'react';

const CreateSurvey = () => {
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
        // Handle submission logic here
    };

    return (
        <div>
            <h2>Create Survey</h2>
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
                <button type="submit">Create Survey</button>
            </form>
        </div>
    );
};

export default CreateSurvey;
