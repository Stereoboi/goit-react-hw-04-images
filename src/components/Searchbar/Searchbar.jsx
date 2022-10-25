import PropTypes from 'prop-types';
import { useState } from "react";
import { FcSearch } from 'react-icons/fc';
import { Formik, ErrorMessage,} from "formik";
import { FormWrapper, SearchForm, SearchButton,ButtonLabel,Input } from "./Searchbar.styled";
import * as yup from 'yup'

export const Searchbar = ({onSubmit}) => {
  const [inputParam, ] = useState('');
  

  const schema = yup.object().shape({
    inputParam: yup.string().required().trim()
  })

  const handleSubmit = (values, {resetForm}) => {
    console.log(values);
    onSubmit(values.inputParam)
    resetForm();
  }

    return (
      <Formik
          initialValues={{inputParam}}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
        <FormWrapper>
         <SearchForm >
            <SearchButton type="submit" > <FcSearch />
              <ButtonLabel >Search</ButtonLabel>
            </SearchButton>
            <Input
              type="text"
              name="inputParam"
              placeholder="Search images and photos"
            />
            <ErrorMessage name="inputParam" />
          </SearchForm> 
        </FormWrapper>
        </Formik>
    )
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}
