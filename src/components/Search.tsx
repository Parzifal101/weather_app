import { useState } from 'react';
import styles from './style/Search.module.scss'



export function Search({setValue,fetch}:any){
    const [input,setInput] = useState('');
    
    function inpHandler(e:any){
      e.preventDefault();
      setInput(e.target.value)
      setValue(e.target.value)
    }
    function submitSearch(e:any){
        e.preventDefault();
        fetch();
    }
    return(
        <div className={styles.search}>
          <img className={styles.img} src={process.env.PUBLIC_URL + '/img/search.png'} alt="" />
          <input value={input} onChange={inpHandler} className={styles.input} placeholder='Search for places...' type="text" />
          <button onClick={submitSearch}className={styles.button}><img src={process.env.PUBLIC_URL + '/img/location.png'} alt="" /></button>
        </div>
    );
}