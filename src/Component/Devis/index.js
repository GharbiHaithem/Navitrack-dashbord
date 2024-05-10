import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { devis as fndevis } from '../../features/devisSlice';
import CustomizedTables from '../CustomizedTables';

const Devis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fndevis(id));
  }, [id, dispatch]);

  const { devis } = useSelector((state) => state?.devis);

  return (
    <div className='d-flex flex-column align-items-center mt-[100px] w-[80%] mx-auto'>
      <nav aria-label="breadcrumb" className="mx-auto d-block">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">DEVIS</a></li>
          <li className="breadcrumb-item active" aria-current="page">{devis?.nomComplet}</li>
        </ol>
      </nav>
      <CustomizedTables className={'py-5 my-5 text-sm'} data={devis} />
    </div>
  );
};

export default Devis;
