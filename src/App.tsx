import React, { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en')
  interface User {
    email: string;
    password: string;
  }
  const changeLanguage = (event: any) => {
    const lang = event.target.dataset.lang;
    setLang(lang);
    i18n.changeLanguage(lang)
  }
  const user: User = {
    email: '',
    password: '',
  };
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required().min(8).max(128),
    // firstName: yup.string().required(),
    // lastName: yup.string().required(),
    // username: yup.string().required(),
    // city: yup.string().required(),
    // state: yup.string().required(),
    // zip: yup.string().required(),
    // terms: yup.bool().required(),
  });
  return (
    <div className="d-flex justify-content-left align-items-center flex-column">

      <h1 className="pb-5">{t('Welcome to React')}!</h1>
      <ul className="langSelection">
        <li className={lang === 'en' ? "active" : ""} data-lang="en" onClick={changeLanguage}>En</li>
        <li className={lang === 'al' ? "active" : ""} data-lang="al" onClick={changeLanguage}>Al</li>
      </ul>

      <Formik
        initialValues={{ ...user }}
        validationSchema={schema}
        // values will hold all the form fields values
        validate={({ email, password }) => {
          const errors: any = {};
          if (!email) {
            errors.email = 'Email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!password) {
            errors.password = 'Password is required'
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            errors.password = 'The password does not meet the minimun requirements'
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting, ...rest }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >

        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, ...otherGoodies }) => (

          <form onSubmit={handleSubmit} className='col-md-6'>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t('email-label')}</Form.Label>
              <Form.Control type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>


            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t('password-label')}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                aria-describedby="passwordHelpBlock"
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Text id="passwordHelpBlock" className="text-muted">
                {t('password-requirements')}
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.password && touched.password && errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              {t('submit')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );

}

export default App;
