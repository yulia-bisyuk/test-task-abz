import { Formik } from 'formik';
import { userValidationSchema } from 'helpers/userValidationSchema';
import { useState } from 'react';
import '../styles/components/form/form.css';

export const SignUpForm = () => {
  const [nameFilled, setNameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [phoneFilled, setPhoneFilled] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
    console.log(value);
    if (e.target.name === 'name') setNameFilled(true);

    if (e.target.name === 'email' && e.target.value) setEmailFilled(true);
    if (e.target.name === 'phone' && e.target.value) setPhoneFilled(true);
  };

  return (
    <section className="form">
      <div className="container">
        <h1 className="formTitle">Working with POST request</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            // position_id: null,
            // photo: null,
          }}
          validationSchema={userValidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('values', values);
            resetForm();
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
              <div>
                <div className="formInputPositioning">
                  {nameFilled && <label className="formLabel">Your name</label>}
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="formTextTypeInput"
                    placeholder="Your name"
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="formHelperText">{formik.errors.name}</p>
                  ) : null}
                </div>

                <div className="formInputPositioning">
                  {emailFilled && <label className="formLabel">Email</label>}
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="formTextTypeInput"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="formHelperText">{formik.errors.email}</p>
                  ) : null}
                </div>

                <div className="formInputPositioning">
                  {phoneFilled && <label className="formLabel">Phone</label>}
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    className="formTextTypeInput"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('phone')}
                  />
                  <p className="formHelperText">+38 (XXX) XXX - XX - XX</p>

                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="formHelperText">{formik.errors.phone}</p>
                  ) : null}
                </div>
              </div>

              <button type="submit" className="signUpButton">
                Sign up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};
