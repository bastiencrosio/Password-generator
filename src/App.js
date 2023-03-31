import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [outputPassword, setOutputPassword] = useState(null);
  const [formValues, setFormValues] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    length: 15
  });
  const [lastCheckbox, setLastCheckbox] = useState(null)
  const passwordRef = useRef(null)

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormValues((prevFormValues) =>
      type === 'checkbox'
        ? { ...prevFormValues, [name]: checked }
        : { ...prevFormValues, [name]: Number(value) }
    );
  };

  const generatePassword = (formValues) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-={}[]|;:<>,.?/~';
  
    let characters = '';
  
    if (formValues.lowercase) {
      characters += lowercase;
    }
  
    if (formValues.uppercase) {
      characters += uppercase;
    }
  
    if (formValues.numbers) {
      characters += numbers;
    }
  
    if (formValues.symbols) {
      characters += symbols;
    }
  
    let password = '';
  
    for (let i = 0; i < formValues.length; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }
  
    return password;
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generatePassword(formValues);
    setOutputPassword(password);
  };  

  useEffect(() => {
    const lastCheckboxFinder = () => {
      let count = 0;
      Object.keys(formValues).forEach((key) => {
        if (formValues[key] === true) {
          count++;
        }
      });
      Object.keys(formValues).forEach((key) => formValues[key] === true);
      if (count === 1) {
        const selectedCheckbox = Object.keys(formValues).find((key) => formValues[key] === true);
        setLastCheckbox(selectedCheckbox);
      }else setLastCheckbox('')
    }
    lastCheckboxFinder();
  }, [formValues])

  return (
    <>
      <div id='generator'>
        <h1>The custom password generator</h1>
        <h3>Choose your parameters:</h3>
        <form onSubmit={handleSubmit}>
          <div className='checkboxes-wrapper'>
            <label>
              <input
                type="checkbox"
                checked={formValues.lowercase}
                onChange={(e) => handleChange(e)}
                name="lowercase"
                disabled={lastCheckbox === 'lowercase'}
              />
              lowercase{' '}
            </label>

            <label>
              <input
                type="checkbox"
                checked={formValues.uppercase}
                onChange={(e) => handleChange(e)}
                name="uppercase"
                disabled={lastCheckbox === 'uppercase'}
              />
              uppercase
            </label>

            <label>
              <input
                type="checkbox"
                checked={formValues.numbers}
                onChange={(e) => handleChange(e)}
                name="numbers"
                disabled={lastCheckbox === 'numbers'}
              />
              numbers
            </label>

            <label>
              <input
                type="checkbox"
                checked={formValues.symbols}
                onChange={(e) => handleChange(e)}
                name="symbols"
                disabled={lastCheckbox === 'symbols'}
              />
              symbols
            </label>
          </div>
          <label className='length-selector'>
              Password length: {formValues.length}
              <input
                type="range"
                name="length"
                value={formValues.length}
                min='5'
                max='30'
                onChange={(e) => handleChange(e)}
              />
            </label>
          <button type="submit">Generate a Password</button>
          <div id='password-area'>
            <input id='password-display'
              type="text"
              placeholder='Password' 
              value={outputPassword ? outputPassword : ''} 
              onChange={(e) => {setOutputPassword(e.target.value)}}
              />
            <button id='copy-button' onClick={(e) => {
              e.preventDefault();
                if (outputPassword) {
                  passwordRef.current = outputPassword;
                  navigator.clipboard.writeText(passwordRef.current.value);
                  console.log('succesfully copied');
                }else console.log('Password is ', outputPassword);
              }}>copy</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
