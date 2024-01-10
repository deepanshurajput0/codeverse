import React from 'react'
import { MDBPagination, MDBPaginationItem, MDBBtn} from "mdb-react-ui-kit"
import './Pagin.css'
const Pagination = ({setCurrentPage, currentPage, numberOfPages, dispatch }) => {
    const renderPagination=()=>{
        if(currentPage === numberOfPages && currentPage===1) return null;
        if(currentPage === 1){
            return(
                <MDBPagination style={{display:'flex', listStyle:"none", alignItems:'center', justifyContent:"center"}}>
                    <MDBPaginationItem>
                        <p> 1 </p>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn className='pag-btn'  rounded onClick={()=>dispatch(setCurrentPage(currentPage+1))} >Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else if(currentPage !== numberOfPages) {
           return(
            <MDBPagination style={{display:'flex', listStyle:"none", alignItems:'center', justifyContent:"center"}} >
            <MDBPaginationItem>
                <MDBBtn className='pag-btn' rounded onClick={()=>dispatch(setCurrentPage(currentPage-1))} >Prev</MDBBtn>
            </MDBPaginationItem>
            <MDBPaginationItem>
                <p>{currentPage}</p>
            </MDBPaginationItem>
            <MDBPaginationItem>
                <MDBBtn className='pag-btn' rounded onClick={()=>dispatch(setCurrentPage(currentPage + 1))} >
                    Next
                </MDBBtn>
            </MDBPaginationItem>
        </MDBPagination>
           )
        }else{
          return(
            <MDBPagination style={{display:'flex', listStyle:"none", alignItems:'center', justifyContent:"center"}} >
            <MDBPaginationItem>
                <p>{currentPage}</p>
            </MDBPaginationItem>
            <MDBPaginationItem>
                <MDBBtn className='pag-btn' rounded onClick={()=>dispatch(setCurrentPage(currentPage-1))} >Prev</MDBBtn>
            </MDBPaginationItem>
        </MDBPagination>
          )
        }
    }
  return (
    <div style={{marginTop:"10px", textAlign:"center"}}>{renderPagination()}</div>
  )
}

export default Pagination



