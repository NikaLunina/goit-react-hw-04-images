
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const Searchbar =({onSubmit})=> {
const [value , setValue] = useState('')

  const handleChange = e => {
   setValue(e.currentTarget.value.trim())
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(value.trim() === ''){
      return  Notiflix.Notify.failure("Request cannot be empty. Please enter a value!")
    }
onSubmit(value.trim())
  setValue('');
  };

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.span}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
           autoComplete="off"
            autoFocus
         
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
