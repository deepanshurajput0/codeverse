import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCode } from '../redux/codeSlice';
import CodeCard from './CodeCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/codeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { codes, loading, error, currentPage, numberOfPages } = useSelector((state) => state.code);

  useEffect(() => {
    dispatch(getCode(currentPage));
  }, [dispatch,currentPage]);

  // Retrieve code data, loading state, and error from Redux store
 
  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      {codes.length === 0 && <h1 style={{ textAlign: "center" }}> No Results Found</h1>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center" }}>
        {Array.isArray(codes) &&
          codes.map((item, index) => {
            return <CodeCard key={item._id} {...item} />;
          })}
      </div>
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={numberOfPages} dispatch={dispatch} />
    </div>
  );
};

export default Home;
