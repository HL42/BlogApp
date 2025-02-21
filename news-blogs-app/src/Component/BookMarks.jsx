import React from 'react'
import './Modal.css'
import demoImg from '../assets/images/demo.jpg'
import './BookMarks.css'

const BookMarks = () => {
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button">
                <i className="fa-solid fa-xmark">

                </i>
            </span>
            <h2 className="bookmarks-heading">
                Book Mark
            </h2>
            <div className="bookmarks-list">
                <div className="bookmark-item">
                    <img src={demoImg} alt="Demo Iamge" />
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quia!</h3>
                    <span className="delete-button">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookMarks