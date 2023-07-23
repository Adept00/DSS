import React, { useState } from 'react';

interface Grade {
  id: number;
  name: string;
  facultyNumber: string;
  subject: string;
  grade: string | number;
  field5: Date | string; // Add field5 as Date or string type
}

interface HistoryItem {
  timestamp: string;
  action: string;
  grade: Grade;
}

const GradeManagementSystem: React.FC = () => {
  const [currentId, setCurrentId] = useState<number>(0);
  const initialStudent: Grade = {
    id: currentId,
    name: 'John Doe',
    facultyNumber: '1 23456',
    subject: 'Math',
    grade: 'A',
    field5: new Date(), // Default value for field5
  };

  const [grades, setGrades] = useState<Grade[]>([initialStudent]);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState<Date | string>(initialStudent.field5); // Initialize field5 with default value
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(initialStudent);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField1(e.target.value);
  };

  const handleFacultyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField2(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField3(e.target.value);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField4(e.target.value);
  };

  const handleField5Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField5(e.target.value);
  };

  const saveButton = () => {
    const newGrade: Grade = {
      id: currentId,
      name: field1,
      facultyNumber: field2,
      subject: field3,
      grade: field4,
      field5: new Date(field5), // Parse the field5 string input to Date object
    };

    setGrades([...grades, newGrade]);
    setCurrentId(currentId + 1);

    const newHistoryItem: HistoryItem = {
      timestamp: getCurrentTimestamp(),
      action: 'Added',
      grade: newGrade,
    };
    setHistory([...history, newHistoryItem]);
    setField1('');
    setField2('');
    setField3('');
    setField4('');
    setField5(new Date()); // Reset field5 to current date
  };

  const deleteButton = (id: number) => {
    const deletedGrade = grades.find((grade) => grade.id === id);
    if (deletedGrade) {
      const updatedGrades = grades.filter((grade) => grade.id !== id);
      setGrades(updatedGrades);

      const newHistoryItem: HistoryItem = {
        timestamp: getCurrentTimestamp(),
        action: 'Deleted',
        grade: deletedGrade,
      };
      setHistory([...history, newHistoryItem]);

      if (selectedGrade && selectedGrade.id === id) {
        setSelectedGrade(null);
      }
    }
  };

  const handleGradeClick = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const clearButton = () => {
    setSelectedGrade(null);
  };

  const getCurrentTimestamp = () => {
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();
    return timestamp;
  };

  return (
    <div>
      <nav>
        <h1>Grade Management System</h1>
      </nav>

      <section className="list-section">
        <div className="container">
          <div className="input-group">
            <label htmlFor="nameInput">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              id="field1" // Added id attribute
              value={field1}
              onChange={handleNameChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="facultyNumberInput">Faculty Number:</label>
            <input
              type="text"
              placeholder="Enter Faculty Number"
              id="field2" // Added id attribute
              value={field2}
              onChange={handleFacultyNumberChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="subjectInput">Subject:</label>
            <input
              type="text"
              placeholder="Enter Subject"
              id="field3" // Added id attribute
              value={field3}
              onChange={handleSubjectChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="gradeInput">Grade:</label>
            <input
              type="number"
              placeholder="Enter Grade"
              id="field4" // Added id attribute
              value={field4}
              onChange={handleGradeChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="dateInput">Date:</label>
            <input
              type="date"
              id="field5" // Added id attribute
              value={field5 instanceof Date ? field5.toISOString().slice(0, 10) : field5}
              onChange={handleField5Change}
            />
          </div>

          <button id="saveButton" onClick={saveButton}>
            Save
          </button>

          <ul className="grade-list" data-testid="grade-list">
            {grades.map((grade) => (
              <li
                key={grade.id}
                className={`grade-item ${selectedGrade?.id === grade.id ? 'selected' : ''}`}
                onClick={() => handleGradeClick(grade)}
              >
                <span className="field1">{grade.name}</span>
                <span className="field2">{grade.facultyNumber}</span>
                <span className="field3">{grade.subject}</span>
                <span className="field4">{grade.grade}</span>
                <span className="field5" data-testid={`field5-${grade.id}`}>
                  {/* Here we set the test ID for field5 */}
                  {grade.field5 instanceof Date ? grade.field5.toISOString().slice(0, 10) : grade.field5}
                </span>
                <button
                  className="deleteButton"
                  onClick={() => deleteButton(grade.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='content-details'>
        <div className="container">
          <h2>Details</h2>
          {selectedGrade ? (
            <div>
              <p>Name: {selectedGrade.name}</p>
              <p>Faculty Number: {selectedGrade.facultyNumber}</p>
              <p>Subject: {selectedGrade.subject}</p>
              <p>Grade: {selectedGrade.grade}</p>
              <p>Date: {selectedGrade.field5 instanceof Date ? selectedGrade.field5.toISOString().slice(0, 10) : selectedGrade.field5}</p>
            </div>
          ) : (
            <p>No grade selected</p>
          )}
          <button id="clearButton" onClick={() => setSelectedGrade(null)}>
            Clear
          </button>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <h2>History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <span className="timestamp">{item.timestamp} - </span>
                <span>{item.action}:</span>
                <span className="grade-details">
                  <span className="field1">{item.grade.name}</span>
                  <span className="field2">{item.grade.facultyNumber}</span>
                  <span className="field3">{item.grade.subject}</span>
                  <span className="field4">{item.grade.grade}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer>
        <p>© 2023 DSS Grade Management System.</p>
      </footer>
    </div>
  );
};

export default GradeManagementSystem;
