import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Regform.css';

function Regform() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      dob: '',
      gender: '',
      password: '',
      confirmPassword: '',
      address: '',
      country: '',
      termsAccepted: false,
      profilePicture: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(3, 'Full Name must be at least 3 characters long').required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      phoneNumber: Yup.string().min(10,'Phone number must be exactly 10 digits').required('Required'),
      dob: Yup.date().required('DOB is Required').test('is-18', 'You must be at least 18 years old', (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && month >= 0 && today.getDate() >= birthDate.getDate());
      }),
      gender: Yup.string().required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter").required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      address: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert('Registration successful!');
    },
  });

  return (
    <div className="form-container">
      <form className="registration-form" onSubmit={formik.handleSubmit}>
        <h2>Registration Form</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? <div className="error">{formik.errors.fullName}</div> : null}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="error">{formik.errors.phoneNumber}</div> : null}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob ? <div className="error">{formik.errors.dob}</div> : null}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <input type="radio" id="male" name="gender" value="Male" onChange={formik.handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" onChange={formik.handleChange} />
            <label htmlFor="female">Female</label>
            <input type="radio" id="other" name="gender" value="Other" onChange={formik.handleChange} />
            <label htmlFor="other">Other</label>
          </div>
          {formik.touched.gender && formik.errors.gender ? <div className="error">{formik.errors.gender}</div> : null}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="error">{formik.errors.confirmPassword}</div> : null}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? <div className="error">{formik.errors.address}</div> : null}
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">Select your country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            {/* Add more countries as needed */}
          </select>
          {formik.touched.country && formik.errors.country ? <div className="error">{formik.errors.country}</div> : null}
        </div>

        <div className="form-group">
          <label>Profile Picture (Optional)</label>
          <input
            type="file"
            name="profilePicture"
            onChange={(event) => formik.setFieldValue("profilePicture", event.currentTarget.files[0])}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.termsAccepted}
          />
          <label htmlFor="terms">I accept the terms and conditions</label>
          {formik.touched.termsAccepted && formik.errors.termsAccepted ? <div className="error">{formik.errors.termsAccepted}</div> : null}
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Regform;
