import { Formik } from 'formik';
import { useState } from 'react';
import {
  useGetPositionsQuery,
  useGetTokenQuery,
  useSignUpUserMutation,
} from 'redux/users/usersApi';
import { userValidationSchema } from 'helpers/userValidationSchema';
import '../styles/components/form/form.css';
import success from '../icons/success-image.svg';
import ClipLoader from 'react-spinners/ClipLoader';

export const SignUpForm = ({ page, setPage }) => {
  const [nameFilled, setNameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [phoneFilled, setPhoneFilled] = useState(false);
  const [radioBtnChecked, setRadioBtnChecked] = useState(false);
  const [fileName, setFileName] = useState('');
  const { data, isSuccess: positionsFetched } = useGetPositionsQuery();
  const { isSuccess: tokenFetched } = useGetTokenQuery();
  const [
    signUp,
    { isLoading: userIsPosting, isSuccess: userPosted, isError, error },
  ] = useSignUpUserMutation();

  const buttonIsActive =
    nameFilled && emailFilled && phoneFilled && radioBtnChecked && fileName
      ? true
      : false;

  const handleChange = e => {
    if (e.target.name === 'name') setNameFilled(true);
    if (e.target.name === 'email') setEmailFilled(true);
    if (e.target.name === 'phone') setPhoneFilled(true);
    if (e.target.name === 'position_id') setRadioBtnChecked(true);
  };

  const handleSubmit = (values, { resetForm }) => {
    const userData = new FormData();
    userData.append('name', values.name);
    userData.append('email', values.email);
    userData.append('phone', values.phone);
    userData.append('photo', values.photo);
    userData.append('position_id', values.position_id);

    if (tokenFetched) signUp(userData);

    resetForm();
    document.getElementById(values.position_id).checked = false; //formik doesn't reset radio buttons properly
    setNameFilled(false);
    setEmailFilled(false);
    setPhoneFilled(false);
    setFileName('');
    setPage(1);
  };

  return (
    <section className="formSection">
      <div className="container">
        <h1 className="formTitle" id="signUp">
          Working with POST request
        </h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            position_id: null,
            photo: null,
          }}
          validationSchema={userValidationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {formik => (
            <form
              onSubmit={formik.handleSubmit}
              onChange={handleChange}
              className="form"
            >
              <div>
                <div className="formInputPositioning">
                  {nameFilled && <label className="formLabel">Your name</label>}
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={
                      formik.touched.name && formik.errors.name
                        ? 'formTextTypeInput formInputError'
                        : 'formTextTypeInput'
                    }
                    placeholder={nameFilled ? '' : 'Your name'}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="formHelperText formTextError">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="formInputPositioning">
                  {emailFilled && <label className="formLabel">Email</label>}
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? 'formTextTypeInput formInputError'
                        : 'formTextTypeInput'
                    }
                    placeholder={emailFilled ? '' : 'Email'}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="formHelperText formTextError">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="formInputPositioning">
                  {phoneFilled && <label className="formLabel">Phone</label>}
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? 'formTextTypeInput formInputError'
                        : 'formTextTypeInput'
                    }
                    placeholder={phoneFilled ? '' : 'Phone'}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('phone')}
                  />
                  <p className="formHelperText">+380XXXXXXXXX</p>

                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="formHelperText formTextError">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="formRadioGroupText">Select your position</p>

              <div className="formRadioGroup">
                {positionsFetched &&
                  data.positions.map(position => (
                    <label className="formRadioGroupLabel" key={position.id}>
                      <input
                        id={position.id}
                        type="radio"
                        name="position_id"
                        value={position.id}
                        className="formRadioGroupInput"
                        onChange={formik.handleChange}
                      />
                      {position.name}
                    </label>
                  ))}
              </div>

              <input
                id="photo"
                name="photo"
                type="file"
                className="formFileInput"
                placeholder="Upload your photo"
                onChange={e => {
                  formik.setFieldValue('photo', e.currentTarget.files[0]);
                  setFileName(e.currentTarget.files[0].name);
                }}
              />
              <label htmlFor="photo" className="formFileInputLabel">
                <span
                  className={
                    formik.touched.photo && formik.errors.photo
                      ? 'formFileInputUpload formInputError'
                      : 'formFileInputUpload'
                  }
                >
                  Upload
                </span>
                <span
                  className={
                    formik.touched.photo && formik.errors.photo
                      ? 'formFileInputPlaceholder uploadPlaceholderError'
                      : 'formFileInputPlaceholder'
                  }
                >
                  {fileName
                    ? fileName.slice(0, 20) + '...'
                    : 'Upload your photo'}
                </span>
              </label>
              {formik.touched.photo && formik.errors.photo ? (
                <p className="formHelperText formTextError">
                  {formik.errors.photo}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={buttonIsActive ? false : true}
                className={
                  buttonIsActive ? 'signUpButton' : 'signUpButton disabled'
                }
              >
                Sign up
              </button>
            </form>
          )}
        </Formik>

        {userIsPosting && (
          <div className="formNotificationWrapper">
            <ClipLoader color="#00bdd3" size="48px" />
          </div>
        )}

        {userPosted && page === 1 && (
          <div className="formNotificationWrapper">
            <h1 className="formSuccessTitle">User successfully registered</h1>
            <svg className="formSuccessPic" width="328" height="290">
              <use href={success + '#success-image'} />
            </svg>
          </div>
        )}

        {isError && (
          <div className="formNotificationWrapper">
            <p className="formTextError">{error.data.message}</p>
          </div>
        )}
      </div>
    </section>
  );
};
