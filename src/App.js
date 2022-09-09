import "./css/App.css";
import { useState, useRef } from "react";
import Recaptcha from "react-google-recaptcha";

function App() {
  //the state of terms and conditions
  const [checked, setChecked] = useState(false);
  //states for captcha
  const captchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(false);

  /*
   * control the label goes up
   */
  const addFocus = (e) => {
    e.target.parentElement.classList.add("focus");
  };

  /*
   * control the label goes down
   * (goes down when the input has no value)
   */
  const removeFocus = (e) => {
    if (e.target.value === "") {
      e.target.parentElement.classList.remove("filled");
    } else {
      e.target.parentElement.classList.add("filled");
    }
    e.target.parentElement.classList.remove("focus");
  };

  /*
   * control the form submit
   */
  const submitForm = (e) => {
    e.preventDefault();
    console.dir(e);
    const token = captchaRef.current.getValue();
    console.log(token);
    if (token === "") {
      //captcha not valid
      setCaptchaError(true);
    } else {
      //save data
      setCaptchaError(false);
      const form = e.currentTarget;
      let formData = new FormData(form);
      console.dir(form);
      console.dir(formData);
      /*
      if (typeof Storage !== "undefined") {
        sessionStorage.name = 
       
        document.getElementById("result").innerHTML = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
      } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
      }
*/
      captchaRef.current.reset();
      document.querySelector("#registerForm").reset();
    }
  };
  /*
   * function for set captcha validation state value
   */
  const verifyCaptcha = (response) => {
    if (response) {
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
    }
  };

  return (
    <div className="register-page min-vh-100">
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-header">
            <h1 className="">Registro</h1>
          </div>
          <div className="register-card-body">
            <form className="register-form" id="registerForm" onSubmit={submitForm}>
              <TextInput type="text" text="Nombre" addFocus={addFocus} removeFocus={removeFocus} />

              <TextInput type="text" text="Apellidos" addFocus={addFocus} removeFocus={removeFocus} />

              <div className="register-input-group">
                <label className="label-date">Fecha de nacimiento</label>
                <input type="date" className="input" aria-label="Fecha de nacimiento" onClick={addFocus} onBlur={removeFocus} required />
              </div>

              <TextInput type="email" text="Email" addFocus={addFocus} removeFocus={removeFocus} />

              <div className="register-input-group">
                <input
                  type="checkbox"
                  checked={checked}
                  id="flexCheckDefault"
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  required
                />

                <label htmlFor="flexCheckDefault">
                  Acepto los{" "}
                  <a href="#" className="terms">
                    Términos y Condiciones
                  </a>
                </label>
              </div>

              <div className="register-input-group">
                <Recaptcha sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} onExpired={verifyCaptcha} onChange={verifyCaptcha} theme="light" />
                <span className={`captcha-label ${captchaError ? "op-1" : ""}`}>Por favor, completa la verificación.</span>
              </div>

              <div className="register-input-group">
                <button type="submit" className="register-submit">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Component for create the Input element groups
 * params: text:string type:"text"|"date"|"email" addFocus:function removeFocus:function
 */
const TextInput = ({ text, type, addFocus, removeFocus }) => {
  return (
    <div className="register-input-group">
      <label className="label">{text}</label>
      <input type={type} className="input" aria-label={text} onClick={addFocus} onBlur={removeFocus} required />
    </div>
  );
};

export default App;
