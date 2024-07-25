import React, { useState } from 'react';
import './SideNav.css';


function SideNav({ setCategory }) {
  const [activeItem, setActiveItem] = useState('all'); 

  const handleClick = (category) => {
    setCategory(category); 
    setActiveItem(category); 
  };

  return (
    <div className="sidenav">
      <ul>
      <li
          style={{ backgroundColor: activeItem === 'all' ? '#CCCCCC' : 'transparent' }}
          onClick={() => handleClick('all')}
        >
          All
        </li>
        <li
          style={{ backgroundColor: activeItem === 'shoes' ? '#CCCCCC' : 'transparent' }}
          onClick={() => handleClick('shoes')}
        >
          Shoes
        </li>
        <li
          style={{ backgroundColor: activeItem === 'bags' ? '#CCCCCC' : 'transparent' }}
          onClick={() => handleClick('bags')}
        >
          Bags
        </li>
        <li
          style={{ backgroundColor: activeItem === 'clothes' ? '#CCCCCC' : 'transparent' }}
          onClick={() => handleClick('clothes')}
        >
          Clothes
        </li>
        <li
          style={{ backgroundColor: activeItem === 'accessories' ? '#CCCCCC' : 'transparent' }}
          onClick={() => handleClick('accessories')}
        >
          Accessories
        </li>
       
      </ul>
    </div>
  );
}

export default SideNav;

