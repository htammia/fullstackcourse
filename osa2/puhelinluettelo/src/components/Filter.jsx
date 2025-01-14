const Filter = ({ nameFilter, onChange}) => {
    return (
      <div>
        filter numbers: <input value={nameFilter} 
        onChange={onChange}/>
      </div>
    )
  }
  
export default Filter