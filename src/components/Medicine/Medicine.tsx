import React, { FC } from 'react';
import { MedicineType } from '../../types/Medicine';
import Link from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs'; 

interface Props {
  medicine: MedicineType
}

const Medicine: FC<Props> = (props) => {

  console.log(props.medicine);

  return <div>Medicine</div>;
};

export default Medicine;
