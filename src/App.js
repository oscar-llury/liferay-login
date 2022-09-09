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
    const token = captchaRef.current.getValue();
    if (token === "") {
      //captcha not valid
      setCaptchaError(true);
    } else {
      //save data
      setCaptchaError(false);

      if (typeof Storage !== "undefined") {
        //if localstorage is avaiable, save date
        let formData = new FormData(e.currentTarget);

        sessionStorage.name = formData.get("name");
        sessionStorage.surname = formData.get("surname");
        sessionStorage.birthday = formData.get("birthday");
        sessionStorage.email = formData.get("email");
        sessionStorage.termsconditions = formData.get("termsconditions");

        let today = new Date();
        let date = String(today.getDate()).padStart(2, "0") + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + today.getFullYear();
        let time = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0") + ":" + String(today.getHours()).padStart(2, "0");
        let stringDate = date + " " + time;
        sessionStorage.date = stringDate;
        sessionStorage.time = Math.floor(new Date().getTime() / 1000);

        captchaRef.current.reset();
        document.querySelector("#registerForm").reset();
      } else {
        //local storage not avaiable
        alert("Tu navegador no admite almacenamiento de sesión.");
      }
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
              <TextInput type="text" text="Nombre" id="name" addFocus={addFocus} removeFocus={removeFocus} />

              <TextInput type="text" text="Apellidos" id="surname" addFocus={addFocus} removeFocus={removeFocus} />

              <div className="register-input-group">
                <label className="label-date" htmlFor="birthday">
                  Fecha de nacimiento
                </label>
                <input type="date" className="input" name="birthday" id="birthday" aria-label="Fecha de nacimiento" onClick={addFocus} onBlur={removeFocus} required />
              </div>

              <TextInput type="email" text="Email" id="email" addFocus={addFocus} removeFocus={removeFocus} />

              <div className="register-input-group">
                <input
                  type="checkbox"
                  checked={checked}
                  id="termsconditions"
                  name="termsconditions"
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  required
                />

                <label htmlFor="termsconditions">
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
const TextInput = ({ text, id, type, addFocus, removeFocus }) => {
  return (
    <div className="register-input-group">
      <label className="label" htmlFor={id}>
        {text}
      </label>
      <input type={type} className="input" name={id} id={id} aria-label={text} onFocus={addFocus} onBlur={removeFocus} required />
    </div>
  );
};

export default App;
