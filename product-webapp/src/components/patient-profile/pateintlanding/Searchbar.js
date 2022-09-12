import React,{useState} from 'react';
import { FcSearch } from "@react-icons/all-files/fc/FcSearch";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { Link } from 'react-router-dom';


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.specialization.toLowerCase().includes(searchWord.toLowerCase());
    });

    const locationFilter = data.filter((value) => {
      return value.address.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setFilteredLocation([])
    } else {
      setFilteredData(newFilter);
      setFilteredLocation(locationFilter)
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setFilteredLocation([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          className="form-controls"
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <FcSearch />
          ) : (
            <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
         <div className="dataResult">
            <h4>Specialist:</h4>
         {filteredData.slice(0, 15).map((value, key) => {
           return (
             <a className="dataItem" href={value.link} target="_blank">
                <p className='fs-6'>Name:Dr.{value.firstName},  Specialist:{value.specialization}, Location:{value.address}</p>
             </a>
           );
         })}
       </div>
        
      )}

{filteredLocation.length != 0 && (
        <div className="dataResult">
          <h4>Location:</h4>
          {filteredLocation.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
              <p className='fs-6'>Name:Dr.{value.firstName},  Specialist:{value.specialization}, Location:{value.address}</p>
              </a>
            );
          })}
        </div>
      )}

      



      
    </div>
  );
}

export default SearchBar;